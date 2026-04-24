import { NavLink, Outlet } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Car, Wallet, MessageSquare, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NotificationBell } from "@/components/NotificationBell";

const links = [
  { to: "/driver", icon: Car, label: "Trip", end: true },
  { to: "/driver/earnings", icon: Wallet, label: "Earnings" },
  { to: "/driver/feedback", icon: MessageSquare, label: "Feedback" },
];

export const DriverLayout = () => {
  const { signOut, user } = useAuth();
  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      <aside className="hidden md:flex w-60 flex-col border-r border-border bg-card/30 p-5">
        <div className="flex items-center gap-2 mb-8">
          <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
            <Car className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <div className="font-bold tracking-tight text-sm">EmpNavPro</div>
            <div className="text-[10px] text-muted-foreground">DRIVER</div>
          </div>
        </div>
        <nav className="space-y-1 flex-1">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                }`
              }>
              <l.icon className="h-4 w-4" />{l.label}
            </NavLink>
          ))}
        </nav>
        <div className="pt-4 border-t border-border">
          <div className="text-xs text-muted-foreground mb-2 truncate">{user?.email}</div>
          <Button variant="ghost" size="sm" onClick={signOut} className="w-full justify-start"><LogOut className="h-4 w-4 mr-2" />Sign out</Button>
        </div>
      </aside>
      <header className="md:hidden flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center"><Car className="h-4 w-4 text-primary-foreground" /></div>
          <div><div className="font-bold text-sm">EmpNavPro</div><div className="text-[10px] text-muted-foreground">DRIVER</div></div>
        </div>
        <div className="flex items-center gap-1">
          <NotificationBell />
          <Button variant="ghost" size="icon" onClick={signOut}><LogOut className="h-4 w-4" /></Button>
        </div>
      </header>
      <main className="flex-1 overflow-auto pb-20 md:pb-0"><Outlet /></main>
      <nav className="md:hidden fixed bottom-0 left-0 right-0 glass border-t border-white/[0.06] grid grid-cols-3 z-40">
        {links.map((l) => (
          <NavLink key={l.to} to={l.to} end={l.end}
            className={({ isActive }) => `flex flex-col items-center gap-1 py-3 text-xs ${isActive ? "text-primary" : "text-muted-foreground"}`}>
            <l.icon className="h-5 w-5" /><span>{l.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};
