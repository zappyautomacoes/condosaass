import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, Home, UserCheck, DollarSign, AlertTriangle, TrendingUp, ArrowUpRight } from "lucide-react";
import { administradorasMock, sindicosMock, pagamentosMock, atividadesRecentesMock } from "@/data/superAdminMock";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const receitaMensal = [
  { mes: "Out/24", valor: 2795 },
  { mes: "Nov/24", valor: 2795 },
  { mes: "Dez/24", valor: 3194 },
  { mes: "Jan/25", valor: 3194 },
  { mes: "Fev/25", valor: 3593 },
  { mes: "Mar/25", valor: 3593 },
];

const crescimentoClientes = [
  { mes: "Out/24", clientes: 8 },
  { mes: "Nov/24", clientes: 9 },
  { mes: "Dez/24", clientes: 10 },
  { mes: "Jan/25", clientes: 11 },
  { mes: "Fev/25", clientes: 12 },
  { mes: "Mar/25", clientes: 13 },
];

const distribuicao = [
  { name: "Administradoras", value: administradorasMock.length, color: "#8b5cf6" },
  { name: "Síndicos Independentes", value: sindicosMock.filter(s => s.tipo === "independente").length, color: "#22c55e" },
];

const totalCondominios = administradorasMock.reduce((a, b) => a + b.condominiosGerenciados, 0) + sindicosMock.filter(s => s.tipo === "independente").flatMap(s => s.condominios).length;
const receitaMes = pagamentosMock.filter(p => p.dataVencimento.startsWith("2025-03")).reduce((a, b) => a + b.valor, 0);
const inadimplentes = pagamentosMock.filter(p => p.status === "atrasado").length;

const stats = [
  { label: "Administradoras Ativas", value: administradorasMock.filter(a => a.status === "ativo").length, icon: Building2, color: "from-violet-500 to-purple-600" },
  { label: "Síndicos Total", value: sindicosMock.length, icon: Users, color: "from-blue-500 to-cyan-600" },
  { label: "Condomínios", value: totalCondominios, icon: Home, color: "from-emerald-500 to-green-600" },
  { label: "Receita Mensal", value: `R$ ${receitaMes.toLocaleString("pt-BR")}`, icon: DollarSign, color: "from-amber-500 to-orange-600" },
  { label: "Moradores (est.)", value: "2.450+", icon: UserCheck, color: "from-pink-500 to-rose-600" },
  { label: "Inadimplentes", value: inadimplentes, icon: AlertTriangle, color: "from-red-500 to-red-700" },
];

const tipoIcons: Record<string, string> = { cadastro: "🆕", upgrade: "⬆️", pagamento: "💰", inadimplencia: "⚠️", suspensao: "🚫" };

const SuperAdminDashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-slate-400">Visão geral da plataforma Administre</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="bg-slate-800/50 border-slate-700/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-500" />
                </div>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-slate-400">{stat.label}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-slate-800/50 border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-white text-sm flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-violet-400" /> Receita Mensal (R$)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={receitaMensal}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="mes" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: "8px", color: "#fff" }} />
                <Bar dataKey="valor" fill="url(#barGradient)" radius={[4, 4, 0, 0]} />
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#6d28d9" />
                  </linearGradient>
                </defs>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-white text-sm">Distribuição de Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={distribuicao} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {distribuicao.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: "8px", color: "#fff" }} />
                <Legend wrapperStyle={{ color: "#94a3b8", fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Growth + Recent */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-white text-sm">Crescimento de Clientes</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={crescimentoClientes}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="mes" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} />
                <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: "8px", color: "#fff" }} />
                <Line type="monotone" dataKey="clientes" stroke="#8b5cf6" strokeWidth={2} dot={{ fill: "#8b5cf6" }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-white text-sm">Atividades Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-[200px] overflow-y-auto pr-1">
              {atividadesRecentesMock.slice(0, 6).map((at) => (
                <div key={at.id} className="flex items-start gap-3 p-2 rounded-lg bg-slate-700/30">
                  <span className="text-lg">{tipoIcons[at.tipo]}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-200 leading-tight">{at.descricao}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{new Date(at.data).toLocaleDateString("pt-BR")}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
