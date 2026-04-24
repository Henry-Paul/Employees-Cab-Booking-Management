import { NavLink, Outlet, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Crown, LayoutDashboard, Building2, CreditCard, Package, BarChart3, LogOut, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/super-admin", icon: LayoutDashboard, label: "Overview", end: true },
  { to: "/super-admin/companies", icon: Building2, label: "Companies" },
  { to: "/super-admin/subscriptions", icon: CreditCard, label: "Subscriptions" },
  { to: "/super-admin/plans", icon: Package, label: "Plans" },
  { to: "/super-admin/revenue", icon: BarChart3, label: "Revenue" },
];

export const SuperAdminLayout = () => {
  const { signOut, user, role, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  if (!user) return <Navigate to="/auth" replace />;
  if (role !== "super_admin") return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-background flex">
      <aside className="hidden md:flex w-64 flex-col border-r border-border bg-card/30 p-5 sticky top-0 h-screen">
        <div className="flex items-center gap-2 mb-8">
          <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
            <Crown className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <div className="font-bold tracking-tight text-sm">EmpNavPro</div>
            <div className="text-[10px] text-primary uppercase font-semibold">Super Admin</div>
          </div>
        </div>
        <nav className="space-y-1 flex-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`
              }
            >
              <l.icon className="h-4 w-4" />
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="pt-4 border-t border-border">
          <div className="text-xs text-muted-foreground mb-2 truncate">{user?.email}</div>
          <Button variant="ghost" size="sm" onClick={signOut} className="w-full justify-start">
            <LogOut className="h-4 w-4 mr-2" />Sign out
          </Button>
        </div>
      </aside>
      <main className="flex-1 overflow-auto pb-20 md:pb-0">
        <Outlet />
      </main>
    </div>
  );
};
