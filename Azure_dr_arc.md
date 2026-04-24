# Azure Disaster Recovery Architecture

> Status: **Architecture-only deliverable.** No code deployed. Hand this document to your infra team to build the failover environment.

## 1. Goals

- Maintain a fully functional **read-write standby** of EmpNavPro on Microsoft Azure.
- Achieve **RTO ≤ 30 min** and **RPO ≤ 5 min** for tenant data.
- Allow DNS-level cutover from Lovable Cloud (Supabase) to Azure when Lovable is unavailable.
- Operate within a **single subscription**, three regions (primary, secondary, archive).

## 2. Component Mapping (Lovable → Azure)

| Lovable Cloud component | Azure equivalent | Notes |
|---|---|---|
| React app on Lovable CDN | **Azure Static Web Apps** + **Azure Front Door** | Front Door handles global routing & failover. |
| Supabase Postgres | **Azure Database for PostgreSQL — Flexible Server** with **read replicas** in secondary region | Use logical replication (`wal2json`) from Supabase to Azure for warm standby. |
| Supabase Auth (GoTrue) | **Azure AD B2C** (or self-hosted GoTrue on **Container Apps**) | Mirror users via daily export + delta sync. |
| Supabase Storage | **Azure Blob Storage** (RA-GRS) | Geo-redundant, read-access from secondary region. |
| Supabase Realtime | **Azure SignalR Service** | Replace `supabase.channel(...)` with SignalR client when failover. |
| Supabase Edge Functions (Deno) | **Azure Functions** (Node 20 / Deno custom handler) | Re-package each function. Same env-var contract. |
| Notifications (in-app + future push) | **Azure Notification Hubs** | FCM/APNs targeting. |
| Background jobs (e.g. driver auto-assign) | **Azure Service Bus** + **Functions** | Queue trip-creation, retry on failure. |
| Observability | **Application Insights** + **Log Analytics** | Mirror current audit_log table. |

## 3. Data Replication Strategy

### Postgres
1. Enable logical decoding on Supabase (`wal_level=logical`).
2. Provision Azure PostgreSQL Flexible Server in **West Europe** (primary DR).
3. Use **Azure Data Migration Service** for initial bulk copy.
4. Configure a **logical replication slot** + subscriber in Azure for continuous catch-up.
5. **Lag monitoring:** alert when `pg_replication_slots.confirmed_flush_lsn` lag > 5 min.

### Storage
- Each tenant's bucket replicated nightly via **AzCopy** + change feed.
- For real-time: Supabase Storage Webhook → Azure Function → Blob upload.

### Auth
- Daily export of `auth.users` & `auth.identities` to a **Key Vault**-encrypted blob.
- Hourly delta script syncs new users into B2C.

## 4. Failover Procedure

1. **Detect outage**
   - Front Door health probe `/healthz` fails 3× in 30 s.
   - PagerDuty incident triggered.
2. **Promote Azure DB**
   - `pg_promote()` on Azure replica.
   - Update connection string in Key Vault.
3. **Cut over DNS**
   - Front Door priority flip: send 100% traffic to Azure backend pool.
   - Estimated TTL propagation: < 60 s with Azure DNS.
4. **Switch Realtime**
   - Frontend reads `VITE_REALTIME_PROVIDER=signalr` and reconnects.
5. **Notify tenants**
   - Status page + in-app banner.

Total expected cutover: **20–30 min** with practiced runbook.

## 5. Cost Estimate (rough, USD/month)

| Service | Tier | Monthly |
|---|---|---|
| PostgreSQL Flexible Server | GP_Standard_D4ds_v5, 256 GB, HA | $620 |
| Static Web Apps Standard | — | $9 |
| Front Door Standard | + 1 TB egress | $40 |
| Blob Storage RA-GRS | 500 GB, 10M reads | $35 |
| Functions Premium EP1 | always-on | $160 |
| SignalR Standard (S1) | 1 unit, 1k concurrent | $50 |
| Service Bus Standard | — | $10 |
| Notification Hubs Basic | 1M pushes | $10 |
| Application Insights | 5 GB/day | $25 |
| Azure AD B2C | < 50k MAU | $0 |
| **Total** | — | **~$960 / month** |

Add 20% for bandwidth, snapshots, and staging environment.

## 6. Migration Phases (estimated effort)

1. **Provision infra** (Bicep templates) — 1 week
2. **Postgres replication setup** — 3 days
3. **Auth mirror** — 2 days
4. **Edge function re-package** — 1 week
5. **Frontend abstraction layer** (Realtime + Auth client switch) — 3 days
6. **Failover drill** — 1 day, repeat monthly

**Total: ~3–4 weeks of one senior infra engineer.**

## 7. Operational Practices

- Quarterly **failover drill**.
- Weekly **replication lag report**.
- Daily **backup verification**: restore to ephemeral Azure container, run smoke tests.
- Maintain a **runbook** in this repo: `docs/runbooks/azure-failover.md`.

## 8. What this DR plan does NOT cover

- Multi-master writes (cost & complexity prohibitive at current scale).
- Cross-cloud Stripe webhook reconciliation — both Lovable and Azure point to the same Stripe account; webhooks must be idempotent.
- Mobile push delivery during cutover — first 1–2 minutes may queue.

---

**Owner:** Infrastructure team
**Last reviewed:** 2026-04-24
**Next review:** Quarterly
