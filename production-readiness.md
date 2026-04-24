---
name: Production readiness fixes
description: Audit log, notifications, realtime, OTP view, auto-assign driver function
type: feature
---
- audit_log table with triggers on trips, rosters, vehicles, user_roles, profiles, invoices, driver_payments
- notifications table with realtime + NotificationBell component on all 3 layouts
- trips_safe view hides OTP from employees
- Realtime enabled on trips, driver_locations, trip_locations, rosters, notifications
- auto_assign_driver(p_trip_id) RPC for round-robin assignment
- notify_trip_assignment trigger auto-creates notifications on trip assign/status change
- AdminAuditLog page at /admin/audit-log
