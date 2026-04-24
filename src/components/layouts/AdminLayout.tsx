import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { CalendarDays } from "lucide-react";
import { Car, LayoutDashboard, Users, Truck, MapPin, Calendar, LifeBuoy, LogOut, BarChart3, FileText, Wallet, Building2, Clock, Factory, Navigation, Shield, Radio, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NotificationBell } from "@/components/NotificationBell";

const links = [
  { to: "/admin", icon: LayoutDashboard, label: "Overview", end: true },
  { to: "/admin/live-track", icon: Radio, label: "Live Track" },
  { to: "/admin/breakdowns", icon: AlertTriangle, label: "Breakdowns" },
  { to: "/admin/analytics", icon: BarChart3, label: "Analytics" },
  { to: "/admin/fleet", icon: MapPin, label: "Fleet" },
  { to: "/admin/trips", icon: Calendar, label: "Bookings" },
  { to: "/admin/companies", icon: Factory, label: "Companies" },
  { to: "/admin/employees", icon: Users, label: "Employees" },
  { to: "/admin/drivers", icon: Car, label: "Drivers" },
  { to: "/admin/vehicles", icon: Truck, label: "Vehicles" },
  { to: "/admin/rosters", icon: CalendarDays, label: "Rosters" },
  { to: "/admin/shifts", icon: Clock, label: "Shifts" },
  { to: "/admin/locations", icon: Navigation, label: "Locations" },
  { to: "/admin/invoices", icon: FileText, label: "Invoices" },
  { to: "/admin/driver-payments", icon: Wallet, label: "Driver Pay" },
  { to: "/admin/vendor-payments", icon: Building2, label: "Vendors" },
  { to: "/admin/tickets", icon: LifeBuoy, label: "Tickets" },
  { to: "/admin/audit-log", icon: Shield, label: "Audit Log" },
];

export const AdminLayout = () => {
  const { signOut, user } = useAuth();
  return (
    <div className="min-h-screen bg-background flex">
      <aside className="hidden md:flex w-64 flex-col border-r border-border bg-card/30 p-5 sticky top-0 h-screen">
        <div className="flex items-center gap-2 mb-8">
          <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center"><Car className="h-4 w-4 text-primary-foreground" /></div>
          <div><div className="font-bold tracking-tight text-sm">EmpNavPro</div><div className="text-[10px] text-muted-foreground">ADMIN</div></div>
        </div>
        <nav className="space-y-1 flex-1 overflow-y-auto">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end}
              className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
              }`}>
              <l.icon className="h-4 w-4" />{l.label}
            </NavLink>
          ))}
        </nav>
        <div className="pt-4 border-t border-border">
          <div className="text-xs text-muted-foreground mb-2 truncate">{user?.email}</div>
          <Button variant="ghost" size="sm" onClick={signOut} className="w-full justify-start"><LogOut className="h-4 w-4 mr-2" />Sign out</Button>
        </div>
      </aside>
      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center"><Car className="h-4 w-4 text-primary-foreground" /></div>
            <div><div className="font-bold text-sm">EmpNavPro</div><div className="text-[10px] text-muted-foreground">ADMIN</div></div>
          </div>
          <div className="flex items-center gap-1">
            <NotificationBell />
            <Button variant="ghost" size="icon" onClick={signOut}><LogOut className="h-4 w-4" /></Button>
          </div>
        </header>
        <main className="flex-1 overflow-auto pb-20 md:pb-0"><Outlet /></main>
        <nav className="md:hidden fixed bottom-0 left-0 right-0 glass border-t border-white/[0.06] overflow-x-auto z-40">
          <div className="flex min-w-max">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end}
                className={({ isActive }) => `flex flex-col items-center gap-1 py-2 px-3 text-[10px] whitespace-nowrap ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                <l.icon className="h-4 w-4" /><span>{l.label}</span>
              </NavLink>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
};
