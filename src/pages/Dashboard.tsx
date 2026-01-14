import { Card } from "@/components/ui/card";
import { 
  Building2, 
  Users, 
  CreditCard, 
  Calendar,
  MessageSquare,
  Clock,
  Activity,
  Zap,
  TrendingUp,
  ArrowUpRight,
  Sparkles
} from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { ChartCard } from "@/components/dashboard/ChartCard";
import { RecentActivity } from "@/components/dashboard/RecentActivity";
import { QuickActions } from "@/components/dashboard/QuickActions";

const Dashboard = () => {
  const stats = [
    {
      title: "Atendimentos Automatizados",
      value: "87%",
      change: "+12%",
      trend: "up" as const,
      icon: MessageSquare,
      color: "primary" as const
    },
    {
      title: "Tempo Médio Resposta",
      value: "2.3min",
      change: "-18%",
      trend: "down" as const,
      icon: Clock,
      color: "success" as const
    },
    {
      title: "Reservas Confirmadas",
      value: "156",
      change: "+8%",
      trend: "up" as const,
      icon: Calendar,
      color: "accent" as const
    },
    {
      title: "Boletos Pagos",
      value: "R$ 847.2k",
      change: "+5%",
      trend: "up" as const,
      icon: CreditCard,
      color: "primary" as const
    }
  ];

  const chartData = [
    { name: 'Jan', atendimentos: 400, automacao: 340 },
    { name: 'Fev', atendimentos: 300, automacao: 280 },
    { name: 'Mar', atendimentos: 500, automacao: 450 },
    { name: 'Abr', atendimentos: 450, automacao: 400 },
    { name: 'Mai', atendimentos: 600, automacao: 540 },
    { name: 'Jun', atendimentos: 550, automacao: 500 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 p-4 md:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6 lg:space-y-8">
        {/* Hero Header */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-primary to-primary-foreground/10 p-6 md:p-8 shadow-lg">
          <div className="absolute inset-0 opacity-50" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          
          <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-primary-foreground/80">
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">Dashboard Inteligente</span>
              </div>
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground">
                Bem-vindo de volta!
              </h1>
              <p className="text-primary-foreground/70 max-w-md">
                Gerencie seus condomínios com inteligência artificial e automação
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <Card className="px-5 py-3 bg-white/10 backdrop-blur-sm border-white/20 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-primary-foreground/70">Condomínio Ativo</p>
                    <p className="font-semibold text-primary-foreground">Residencial Aurora</p>
                  </div>
                </div>
              </Card>
              
              <Card className="px-5 py-3 bg-accent/90 backdrop-blur-sm border-accent/20 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-accent-foreground/70">Status</p>
                    <p className="font-semibold text-accent-foreground flex items-center gap-1">
                      Online
                      <span className="w-2 h-2 rounded-full bg-white animate-pulse"></span>
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat) => (
            <StatsCard key={stat.title} {...stat} />
          ))}
        </div>

        {/* Charts and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          <ChartCard 
            title="Atendimentos vs Automação"
            data={chartData}
          />
          <RecentActivity />
        </div>

        {/* Quick Actions */}
        <QuickActions />
      </div>
    </div>
  );
};

export default Dashboard;
