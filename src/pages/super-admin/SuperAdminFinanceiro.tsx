import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DollarSign, AlertTriangle, Clock, Search, Send, Ban, CheckCircle2 } from "lucide-react";
import { pagamentosMock } from "@/data/superAdminMock";
import { useToast } from "@/hooks/use-toast";

const SuperAdminFinanceiro = () => {
  const [search, setSearch] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const { toast } = useToast();

  const pagamentos = pagamentosMock.filter(p => {
    const matchSearch = p.clienteNome.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filtroStatus === "todos" || p.status === filtroStatus;
    return matchSearch && matchStatus;
  });

  const receitaMes = pagamentosMock.filter(p => p.dataVencimento.startsWith("2025-03") && p.status === "pago").reduce((a, b) => a + b.valor, 0);
  const inadimplentes = pagamentosMock.filter(p => p.status === "atrasado");
  const pendentes = pagamentosMock.filter(p => p.status === "pendente");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Financeiro</h1>
        <p className="text-slate-400">Controle financeiro da plataforma</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Receita do Mês", value: `R$ ${receitaMes.toLocaleString("pt-BR")}`, icon: DollarSign, color: "from-emerald-500 to-green-600" },
          { label: "Inadimplentes", value: inadimplentes.length, icon: AlertTriangle, color: "from-red-500 to-red-700" },
          { label: "Pendentes", value: pendentes.length, icon: Clock, color: "from-amber-500 to-orange-600" },
        ].map(s => (
          <Card key={s.label} className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${s.color} flex items-center justify-center`}>
                <s.icon className="w-5 h-5 text-white" />
              </div>
              <div><p className="text-xl font-bold text-white">{s.value}</p><p className="text-xs text-slate-400">{s.label}</p></div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-slate-800/50 border-slate-700/50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <CardTitle className="text-white text-sm">Assinaturas e Pagamentos</CardTitle>
            <div className="flex items-center gap-3">
              <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                <SelectTrigger className="w-36 bg-slate-700/50 border-slate-600 text-white"><SelectValue /></SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="pago">Pagos</SelectItem>
                  <SelectItem value="pendente">Pendentes</SelectItem>
                  <SelectItem value="atrasado">Atrasados</SelectItem>
                </SelectContent>
              </Select>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input placeholder="Buscar cliente..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500" />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700/50 hover:bg-transparent">
                <TableHead className="text-slate-400">Cliente</TableHead>
                <TableHead className="text-slate-400">Tipo</TableHead>
                <TableHead className="text-slate-400">Plano</TableHead>
                <TableHead className="text-slate-400">Valor</TableHead>
                <TableHead className="text-slate-400">Vencimento</TableHead>
                <TableHead className="text-slate-400">Status</TableHead>
                <TableHead className="text-slate-400 text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pagamentos.map(p => (
                <TableRow key={p.id} className="border-slate-700/50 hover:bg-slate-700/30">
                  <TableCell className="text-white font-medium">{p.clienteNome}</TableCell>
                  <TableCell><Badge className={p.clienteTipo === "administradora" ? "bg-violet-500/20 text-violet-400" : "bg-blue-500/20 text-blue-400"}>{p.clienteTipo === "administradora" ? "Adm" : "Síndico"}</Badge></TableCell>
                  <TableCell className="text-slate-300">{p.planoNome}</TableCell>
                  <TableCell className="text-white font-medium">R$ {p.valor.toLocaleString("pt-BR")}</TableCell>
                  <TableCell className="text-slate-300">{new Date(p.dataVencimento).toLocaleDateString("pt-BR")}</TableCell>
                  <TableCell>
                    <Badge className={p.status === "pago" ? "bg-emerald-500/20 text-emerald-400" : p.status === "pendente" ? "bg-amber-500/20 text-amber-400" : "bg-red-500/20 text-red-400"}>
                      {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      {p.status !== "pago" && (
                        <Button variant="ghost" size="icon" onClick={() => toast({ title: "Pagamento registrado!" })} className="text-emerald-400 hover:text-emerald-300 hover:bg-slate-700">
                          <CheckCircle2 className="w-4 h-4" />
                        </Button>
                      )}
                      {p.status === "atrasado" && (
                        <>
                          <Button variant="ghost" size="icon" onClick={() => toast({ title: "Lembrete enviado!" })} className="text-blue-400 hover:text-blue-300 hover:bg-slate-700">
                            <Send className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => toast({ title: "Acesso suspenso!" })} className="text-red-400 hover:text-red-300 hover:bg-slate-700">
                            <Ban className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SuperAdminFinanceiro;
