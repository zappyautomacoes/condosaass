import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Building2, Users, Home, CreditCard, Calendar } from "lucide-react";
import { administradorasMock, sindicosMock, pagamentosMock } from "@/data/superAdminMock";

const statusBadge: Record<string, { label: string; className: string }> = {
  ativo: { label: "Ativo", className: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
  suspenso: { label: "Suspenso", className: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
  trial: { label: "Trial", className: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  cancelado: { label: "Cancelado", className: "bg-red-500/20 text-red-400 border-red-500/30" },
};

const SuperAdminAdminDetalhes = () => {
  const { id } = useParams();
  const adm = administradorasMock.find(a => a.id === id);
  if (!adm) return <div className="text-white">Administradora não encontrada.</div>;

  const sindicosVinculados = sindicosMock.filter(s => s.administradoraId === adm.id);
  const pagamentos = pagamentosMock.filter(p => p.clienteId === adm.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild className="text-slate-400 hover:text-white">
          <Link to="/super-admin/administradoras"><ArrowLeft className="w-5 h-5" /></Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-white">{adm.nomeFantasia}</h1>
          <p className="text-slate-400">{adm.razaoSocial} — {adm.cnpj}</p>
        </div>
        <Badge className={statusBadge[adm.status].className}>{statusBadge[adm.status].label}</Badge>
      </div>

      <Tabs defaultValue="geral" className="space-y-4">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="geral" className="data-[state=active]:bg-violet-600 data-[state=active]:text-white text-slate-400">Visão Geral</TabsTrigger>
          <TabsTrigger value="sindicos" className="data-[state=active]:bg-violet-600 data-[state=active]:text-white text-slate-400">Síndicos Vinculados</TabsTrigger>
          <TabsTrigger value="financeiro" className="data-[state=active]:bg-violet-600 data-[state=active]:text-white text-slate-400">Financeiro</TabsTrigger>
        </TabsList>

        <TabsContent value="geral">
          <div className="grid grid-cols-4 gap-4 mb-6">
            {[
              { label: "Plano", value: adm.planoNome, icon: CreditCard },
              { label: "Síndicos", value: adm.sindicosVinculados, icon: Users },
              { label: "Condomínios", value: adm.condominiosGerenciados, icon: Home },
              { label: "Vencimento", value: new Date(adm.dataVencimento).toLocaleDateString("pt-BR"), icon: Calendar },
            ].map(s => (
              <Card key={s.label} className="bg-slate-800/50 border-slate-700/50">
                <CardContent className="p-4 flex items-center gap-3">
                  <s.icon className="w-5 h-5 text-violet-400" />
                  <div><p className="text-lg font-bold text-white">{s.value}</p><p className="text-xs text-slate-400">{s.label}</p></div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-6">
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader><CardTitle className="text-white text-sm">Responsável</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm text-slate-300">
                <p><span className="text-slate-500">Nome:</span> {adm.responsavel.nome}</p>
                <p><span className="text-slate-500">CPF:</span> {adm.responsavel.cpf}</p>
                <p><span className="text-slate-500">Cargo:</span> {adm.responsavel.cargo}</p>
              </CardContent>
            </Card>
            <Card className="bg-slate-800/50 border-slate-700/50">
              <CardHeader><CardTitle className="text-white text-sm">Contato</CardTitle></CardHeader>
              <CardContent className="space-y-2 text-sm text-slate-300">
                <p><span className="text-slate-500">E-mail:</span> {adm.contato.email}</p>
                <p><span className="text-slate-500">Telefone:</span> {adm.contato.telefone}</p>
                <p><span className="text-slate-500">WhatsApp:</span> {adm.contato.whatsapp}</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sindicos">
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700/50 hover:bg-transparent">
                    <TableHead className="text-slate-400">Nome</TableHead>
                    <TableHead className="text-slate-400">Condomínios</TableHead>
                    <TableHead className="text-slate-400">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sindicosVinculados.map(s => (
                    <TableRow key={s.id} className="border-slate-700/50 hover:bg-slate-700/30">
                      <TableCell className="text-white">{s.nome}</TableCell>
                      <TableCell className="text-slate-300">{s.condominios.join(", ")}</TableCell>
                      <TableCell><Badge className={statusBadge[s.status].className}>{statusBadge[s.status].label}</Badge></TableCell>
                    </TableRow>
                  ))}
                  {sindicosVinculados.length === 0 && (
                    <TableRow><TableCell colSpan={3} className="text-center text-slate-500">Nenhum síndico vinculado</TableCell></TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financeiro">
          <Card className="bg-slate-800/50 border-slate-700/50">
            <CardHeader><CardTitle className="text-white text-sm">Histórico de Pagamentos</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700/50 hover:bg-transparent">
                    <TableHead className="text-slate-400">Vencimento</TableHead>
                    <TableHead className="text-slate-400">Valor</TableHead>
                    <TableHead className="text-slate-400">Status</TableHead>
                    <TableHead className="text-slate-400">Pagamento</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pagamentos.map(p => (
                    <TableRow key={p.id} className="border-slate-700/50 hover:bg-slate-700/30">
                      <TableCell className="text-slate-300">{new Date(p.dataVencimento).toLocaleDateString("pt-BR")}</TableCell>
                      <TableCell className="text-white font-medium">R$ {p.valor.toLocaleString("pt-BR")}</TableCell>
                      <TableCell>
                        <Badge className={p.status === "pago" ? "bg-emerald-500/20 text-emerald-400" : p.status === "pendente" ? "bg-amber-500/20 text-amber-400" : "bg-red-500/20 text-red-400"}>
                          {p.status.charAt(0).toUpperCase() + p.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-300">{p.dataPagamento ? new Date(p.dataPagamento).toLocaleDateString("pt-BR") : "—"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SuperAdminAdminDetalhes;
