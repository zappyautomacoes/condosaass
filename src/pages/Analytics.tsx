import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Calendar,
  AlertCircle,
  Target,
  Activity,
  Clock,
  CheckCircle2
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const Analytics = () => {
  const kpiData = [
    {
      title: "Taxa de Inadimplência",
      value: "12.5%",
      change: "-3.2%",
      trend: "down" as const,
      icon: TrendingDown,
      color: "success",
      target: "< 10%"
    },
    {
      title: "Tempo Médio de Atendimento",
      value: "2.3min",
      change: "-18%",
      trend: "down" as const,
      icon: Clock,
      color: "success",
      target: "< 3min"
    },
    {
      title: "Taxa de Automação",
      value: "87%",
      change: "+12%",
      trend: "up" as const,
      icon: Activity,
      color: "primary",
      target: "> 80%"
    },
    {
      title: "Satisfação dos Moradores",
      value: "4.2/5",
      change: "+0.3",
      trend: "up" as const,
      icon: CheckCircle2,
      color: "success",
      target: "> 4.0"
    }
  ];

  const monthlyData = [
    { month: 'Jan', atendimentos: 120, automacao: 104, satisfacao: 3.8, inadimplencia: 15.2 },
    { month: 'Fev', atendimentos: 135, automacao: 118, satisfacao: 3.9, inadimplencia: 14.8 },
    { month: 'Mar', atendimentos: 150, automacao: 135, satisfacao: 4.0, inadimplencia: 13.5 },
    { month: 'Abr', atendimentos: 145, automacao: 132, satisfacao: 4.1, inadimplencia: 12.9 },
    { month: 'Mai', atendimentos: 160, automacao: 148, satisfacao: 4.2, inadimplencia: 12.5 },
    { month: 'Jun', atendimentos: 155, automacao: 142, satisfacao: 4.2, inadimplencia: 12.1 }
  ];

  const serviceDistribution = [
    { name: 'Manutenção', value: 35, color: '#3B82F6' },
    { name: 'Financeiro', value: 25, color: '#10B981' },
    { name: 'Reservas', value: 20, color: '#F59E0B' },
    { name: 'Reclamações', value: 15, color: '#EF4444' },
    { name: 'Outros', value: 5, color: '#8B5CF6' }
  ];

  return (
    <div className="min-h-screen bg-gradient-bg p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Analytics & KPIs</h1>
            <p className="text-muted-foreground mt-1">
              Indicadores de performance e métricas estratégicas
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="bg-gradient-primary text-primary-foreground border-0">
              Atualizado em tempo real
            </Badge>
          </div>
        </div>

        {/* KPIs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiData.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <Card key={kpi.title} className="bg-gradient-card border-0 shadow-soft">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {kpi.title}
                  </CardTitle>
                  <Icon className={`h-4 w-4 ${
                    kpi.color === 'success' ? 'text-success' : 
                    kpi.color === 'primary' ? 'text-primary' : 'text-muted-foreground'
                  }`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-foreground">{kpi.value}</div>
                  <div className="flex items-center justify-between mt-2">
                    <p className={`text-xs flex items-center gap-1 ${
                      kpi.trend === 'up' ? 'text-success' : 'text-destructive'
                    }`}>
                      {kpi.trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                      {kpi.change}
                    </p>
                    <Badge variant="outline" className="text-xs">
                      Meta: {kpi.target}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Charts Section */}
        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="financeiro">Financeiro</TabsTrigger>
            <TabsTrigger value="operacional">Operacional</TabsTrigger>
            <TabsTrigger value="satisfacao">Satisfação</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gradient-card border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" />
                    Evolução de Atendimentos
                  </CardTitle>
                  <CardDescription>
                    Comparativo mensal de atendimentos totais vs automatizados
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="atendimentos" stroke="#3B82F6" strokeWidth={2} name="Total" />
                      <Line type="monotone" dataKey="automacao" stroke="#10B981" strokeWidth={2} name="Automação" />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    Distribuição de Serviços
                  </CardTitle>
                  <CardDescription>
                    Tipos de atendimento mais solicitados
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={serviceDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {serviceDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="financeiro" className="space-y-6">
            <Card className="bg-gradient-card border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-primary" />
                  Evolução da Inadimplência
                </CardTitle>
                <CardDescription>
                  Monitoramento mensal da taxa de inadimplência
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value}%`, 'Inadimplência']} />
                    <Line 
                      type="monotone" 
                      dataKey="inadimplencia" 
                      stroke="#EF4444" 
                      strokeWidth={3} 
                      name="Taxa de Inadimplência (%)" 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="operacional" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="bg-gradient-card border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="text-lg">Manutenções</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Preventivas</span>
                    <span className="font-semibold text-success">85%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Corretivas</span>
                    <span className="font-semibold text-warning">15%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Em Andamento</span>
                    <span className="font-semibold text-primary">12</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="text-lg">Reservas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Taxa de Ocupação</span>
                    <span className="font-semibold text-success">72%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Cancelamentos</span>
                    <span className="font-semibold text-warning">5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Pendentes</span>
                    <span className="font-semibold text-primary">8</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-card border-0 shadow-soft">
                <CardHeader>
                  <CardTitle className="text-lg">Funcionários</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Performance Média</span>
                    <span className="font-semibold text-success">4.1/5</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Presença</span>
                    <span className="font-semibold text-success">96%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Treinamentos</span>
                    <span className="font-semibold text-primary">3 pendentes</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="satisfacao" className="space-y-6">
            <Card className="bg-gradient-card border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Índice de Satisfação dos Moradores
                </CardTitle>
                <CardDescription>
                  Evolução mensal baseada em pesquisas e feedback
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={350}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[3, 5]} />
                    <Tooltip formatter={(value) => [`${value}/5`, 'Satisfação']} />
                    <Line 
                      type="monotone" 
                      dataKey="satisfacao" 
                      stroke="#10B981" 
                      strokeWidth={3} 
                      name="Satisfação (1-5)" 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Analytics;