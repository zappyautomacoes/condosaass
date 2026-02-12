import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  LayoutDashboard,
  CreditCard,
  Calendar,
  Wrench,
  Users,
  MessageSquare,
  Settings,
  Building2,
  BarChart3,
  Bot,
  FileText,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

import { 
  Shield,
  ClipboardList,
  UserCheck,
  AlertTriangle,
  TrendingUp,
  FileCheck,
  Timer,
  Eye,
  DollarSign,
  MapPin,
  Phone,
  CheckCircle2,
  AlertCircle,
  Activity,
  Camera,
  Bell,
  Key,
  Truck,
  HardHat,
  PlusCircle,
  BookOpen,
  Clock,
  Target,
  Gauge,
  Package,
  Award
} from "lucide-react";

const menuSections = [
  {
    title: "GESTÃO GERAL",
    items: [
      {
        title: "Dashboard",
        icon: LayoutDashboard,
        href: "/",
        color: "primary"
      },
      {
        title: "Analytics",
        icon: BarChart3,
        href: "/analytics",
        color: "primary"
      }
    ]
  },
  {
    title: "GESTÃO DO SÍNDICO",
    items: [
      {
        title: "Tarefas Diárias",
        icon: ClipboardList,
        href: "/tarefas-diarias",
        color: "warning"
      },
      {
        title: "Manutenções",
        icon: Wrench,
        href: "/manutencoes",
        color: "warning"
      },
      {
        title: "Agenda Síndico",
        icon: Timer,
        href: "/agenda-sindico",
        color: "accent"
      },
      {
        title: "Funcionários",
        icon: UserCheck,
        href: "/funcionarios",
        color: "primary"
      },
      {
        title: "Equipamentos",
        icon: Activity,
        href: "/equipamentos",
        color: "warning"
      },
      {
        title: "Segurança",
        icon: Shield,
        href: "/seguranca",
        color: "destructive"
      }
    ]
  },
  {
    title: "GESTÃO FINANCEIRA",
    items: [
      {
        title: "Financeiro",
        icon: CreditCard,
        href: "/financeiro",
        color: "primary"
      },
      {
        title: "Cobrança",
        icon: DollarSign,
        href: "/cobranca",
        color: "success"
      },
      {
        title: "Inadimplência",
        icon: AlertTriangle,
        href: "/inadimplencia",
        color: "destructive"
      },
      {
        title: "Integração Bancária",
        icon: Building2,
        href: "/integracao-bancaria",
        color: "primary"
      }
    ]
  },
  {
    title: "GESTÃO OPERACIONAL",
    items: [
      {
        title: "Moradores",
        icon: Users,
        href: "/moradores",
        color: "primary"
      },
      {
        title: "Reservas",
        icon: Calendar,
        href: "/reservas",
        color: "accent"
      },
      {
        title: "Assembleias",
        icon: FileText,
        href: "/assembleias",
        color: "accent"
      },
      {
        title: "Contratos",
        icon: FileCheck,
        href: "/contratos",
        color: "warning"
      },
      {
        title: "Fornecedores",
        icon: Truck,
        href: "/fornecedores",
        color: "primary"
      },
      {
        title: "Documentos",
        icon: BookOpen,
        href: "/documentos",
        color: "accent"
      },
      {
        title: "Patrimônio",
        icon: Package,
        href: "/patrimonio",
        color: "primary"
      },
      {
        title: "Certificações",
        icon: Award,
        href: "/certificacoes",
        color: "success"
      }
    ]
  },
  {
    title: "COMUNICAÇÃO",
    items: [
      {
        title: "Atendimento", 
        icon: MessageSquare,
        href: "/atendimento",
        color: "success"
      },
      {
        title: "WhatsApp",
        icon: Phone,
        href: "/whatsapp",
        color: "success"
      },
      {
        title: "Comunicados",
        icon: Bell,
        href: "/comunicados",
        color: "accent"
      },
      {
        title: "Chat IA",
        icon: Bot,
        href: "/chat",
        color: "success"
      }
    ]
  },
  {
    title: "AUTOMAÇÃO",
    items: [
      {
        title: "Automação",
        icon: Zap,
        href: "/automacao", 
        color: "warning"
      },
      {
        title: "Alertas",
        icon: AlertCircle,
        href: "/alertas",
        color: "destructive"
      },
      {
        title: "Relatórios",
        icon: TrendingUp,
        href: "/relatorios",
        color: "primary"
      },
      {
        title: "Configurações",
        icon: Settings,
        href: "/configuracoes",
        color: "accent"
      }
    ]
  }
];

export const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 h-screen bg-gradient-card border-r border-border/50 shadow-soft flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
            <Building2 className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-bold text-lg text-foreground">SaasCondo</h2>
            <p className="text-xs text-muted-foreground">Gestão Inteligente</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 p-4 space-y-4 overflow-y-auto">
        {menuSections.map((section) => (
          <div key={section.title} className="space-y-2">
            <h3 className="text-xs font-semibold text-muted-foreground px-3 uppercase tracking-wider">
              {section.title}
            </h3>
            <div className="space-y-1">
              {section.items.map((item) => {
                const isActive = location.pathname === item.href;
                const Icon = item.icon;
                
                return (
                  <Button
                    key={item.href}
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    asChild
                    className={cn(
                      "w-full justify-start gap-3 h-10 transition-smooth text-sm",
                      isActive 
                        ? "bg-gradient-primary text-primary-foreground shadow-glow" 
                        : "hover:bg-muted/50 hover:shadow-soft"
                    )}
                  >
                    <Link to={item.href}>
                      <Icon className="w-4 h-4" />
                      {item.title}
                    </Link>
                  </Button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User Info */}
      <div className="p-4 border-t border-border/50">
        <Card className="p-3 bg-gradient-accent text-accent-foreground shadow-accent-glow">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-accent-foreground/20 rounded-full flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">Admin Master</p>
              <p className="text-xs opacity-80 truncate">Condomínios Aurora</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};