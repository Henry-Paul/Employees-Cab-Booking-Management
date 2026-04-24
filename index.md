# Project Memory

## Core
Dark slate + emerald design system (HSL tokens in src/index.css). Use semantic Tailwind classes only.
Lovable Cloud (Supabase) backend with RLS. Roles in `user_roles` table — never on profiles.
Maps: Leaflet + OpenStreetMap. No map API keys.
Auth: email/password + Google OAuth (managed). Never expose Supabase to user — call it "Lovable Cloud" or "the backend".
Brand: EmpNavPro (not MoveInSync).

## Memories
- [Routing & Geocoding stack](mem://features/routing-stack.md) — Nominatim for addresses, OSRM for routes/ETA, helpers in src/lib/geo.ts
- [Production readiness](mem://features/production-readiness.md) — Audit log, notifications, realtime, OTP security, auto-assign implemented
