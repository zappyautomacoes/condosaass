import { Card } from "@/components/ui/card";
import { 
  Building2, 
  Users, 
  CreditCard, 
  Calendar,
  Settings,
  Wrench,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle
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
    <div className="min-h-screen bg-gradient-bg p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Dashboard Geral
            </h1>
            <p className="text-muted-foreground mt-1">
              Visão geral de todos os condomínios gerenciados
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Card className="px-4 py-2 bg-gradient-card border-0 shadow-soft">
              <p className="text-sm text-muted-foreground">Condomínio Ativo</p>
              <p className="font-semibold text-primary">Residencial Aurora</p>
            </Card>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <StatsCard key={stat.title} {...stat} />
          ))}
        </div>

        {/* Charts and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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