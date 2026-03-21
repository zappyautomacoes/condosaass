import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LayoutDashboard, Building2, Users, CreditCard, Settings, Crown, Package
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

const menuItems = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/super-admin/dashboard" },
  { title: "Administradoras", icon: Building2, href: "/super-admin/administradoras" },
  { title: "Síndicos", icon: Users, href: "/super-admin/sindicos" },
  { title: "Planos", icon: Package, href: "/super-admin/planos" },
  { title: "Financeiro", icon: CreditCard, href: "/super-admin/financeiro" },
  { title: "Configurações", icon: Settings, href: "/super-admin/configuracoes" },
];

export const SuperAdminSidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 h-screen bg-slate-900 flex flex-col border-r border-slate-700/50">
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-violet-500/25">
            <Crown className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="font-bold text-lg text-white">Administre</h2>
            <Badge className="bg-violet-500/20 text-violet-300 border-violet-500/30 text-[10px] px-1.5 py-0">
              SUPER ADMIN
            </Badge>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.href || 
            (item.href !== "/super-admin/dashboard" && location.pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Button
              key={item.href}
              variant="ghost"
              size="sm"
              asChild
              className={cn(
                "w-full justify-start gap-3 h-11 text-sm transition-all",
                isActive
                  ? "bg-gradient-to-r from-violet-600 to-purple-600 text-white shadow-lg shadow-violet-500/25 hover:from-violet-600 hover:to-purple-600 hover:text-white"
                  : "text-slate-400 hover:text-white hover:bg-slate-800"
              )}
            >
              <Link to={item.href}>
                <Icon className="w-4 h-4" />
                {item.title}
              </Link>
            </Button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-700/50">
        <div className="p-3 rounded-lg bg-slate-800/50 border border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full flex items-center justify-center">
              <Crown className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">Master Admin</p>
              <p className="text-xs text-slate-400 truncate">Plataforma Administre</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
