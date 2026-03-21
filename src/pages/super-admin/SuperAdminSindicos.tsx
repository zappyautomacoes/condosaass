import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Eye, Pencil, Ban, Trash2, Users, UserCheck } from "lucide-react";
import { sindicosMock, planosMock } from "@/data/superAdminMock";
import { Sindico, StatusCliente, modulosBasico } from "@/types/superAdmin";
import { ModulosCheckboxes } from "@/components/super-admin/ModulosCheckboxes";
import { useToast } from "@/hooks/use-toast";

const statusBadge: Record<StatusCliente, { label: string; className: string }> = {
  ativo: { label: "Ativo", className: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
  suspenso: { label: "Suspenso", className: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
  trial: { label: "Trial", className: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  cancelado: { label: "Cancelado", className: "bg-red-500/20 text-red-400 border-red-500/30" },
};

const SuperAdminSindicos = () => {
  const [search, setSearch] = useState("");
  const [list] = useState<Sindico[]>(sindicosMock);
  const [showCreate, setShowCreate] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Sindico | null>(null);
  const { toast } = useToast();

  const filtered = list.filter(s =>
    s.nome.toLowerCase().includes(search.toLowerCase()) || s.cpf.includes(search)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Síndicos</h1>
          <p className="text-slate-400">Gestão de síndicos da plataforma</p>
        </div>
        <Button onClick={() => setShowCreate(true)} className="bg-violet-600 hover:bg-violet-700 text-white">
          <Plus className="w-4 h-4 mr-2" /> Novo Síndico Independente
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total", value: list.length, icon: Users, color: "from-violet-500 to-purple-600" },
          { label: "Independentes", value: list.filter(s => s.tipo === "independente").length, icon: UserCheck, color: "from-emerald-500 to-green-600" },
          { label: "Vinculados", value: list.filter(s => s.tipo === "vinculado").length, icon: Users, color: "from-blue-500 to-cyan-600" },
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
          <div className="flex items-center justify-between">
            <CardTitle className="text-white text-sm">Lista de Síndicos</CardTitle>
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input placeholder="Buscar por nome ou CPF..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700/50 hover:bg-transparent">
                <TableHead className="text-slate-400">Nome</TableHead>
                <TableHead className="text-slate-400">CPF</TableHead>
                <TableHead className="text-slate-400">Tipo</TableHead>
                <TableHead className="text-slate-400">Condomínios</TableHead>
                <TableHead className="text-slate-400">Status</TableHead>
                <TableHead className="text-slate-400 text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(s => (
                <TableRow key={s.id} className="border-slate-700/50 hover:bg-slate-700/30">
                  <TableCell>
                    <div>
                      <p className="font-medium text-white">{s.nome}</p>
                      <p className="text-xs text-slate-400">{s.contato.email}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-300 text-sm">{s.cpf}</TableCell>
                  <TableCell>
                    {s.tipo === "independente" ? (
                      <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Independente</Badge>
                    ) : (
                      <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Via {s.administradoraNome}</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-slate-300 text-sm">{s.condominios.join(", ")}</TableCell>
                  <TableCell><Badge className={statusBadge[s.status].className}>{statusBadge[s.status].label}</Badge></TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-700"><Eye className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-700"><Pencil className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" className="text-amber-400 hover:text-amber-300 hover:bg-slate-700"><Ban className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="icon" onClick={() => setDeleteTarget(s)} className="text-red-400 hover:text-red-300 hover:bg-slate-700"><Trash2 className="w-4 h-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create Modal */}
      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>Novo Síndico Independente</DialogTitle>
            <DialogDescription className="text-slate-400">Cadastro de síndico sem vínculo com administradora.</DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold text-violet-400 mb-3">Dados Pessoais</p>
              <div className="grid grid-cols-2 gap-3">
                <div><Label className="text-slate-300">Nome Completo</Label><Input className="bg-slate-800 border-slate-600 text-white" /></div>
                <div><Label className="text-slate-300">CPF</Label><Input className="bg-slate-800 border-slate-600 text-white" /></div>
                <div><Label className="text-slate-300">RG</Label><Input className="bg-slate-800 border-slate-600 text-white" /></div>
                <div><Label className="text-slate-300">Data de Nascimento</Label><Input type="date" className="bg-slate-800 border-slate-600 text-white" /></div>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-violet-400 mb-3">Contato</p>
              <div className="grid grid-cols-3 gap-3">
                <div><Label className="text-slate-300">E-mail</Label><Input type="email" className="bg-slate-800 border-slate-600 text-white" /></div>
                <div><Label className="text-slate-300">Telefone</Label><Input className="bg-slate-800 border-slate-600 text-white" /></div>
                <div><Label className="text-slate-300">WhatsApp</Label><Input className="bg-slate-800 border-slate-600 text-white" /></div>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-violet-400 mb-3">Dados do Condomínio</p>
              <div className="grid grid-cols-2 gap-3">
                <div><Label className="text-slate-300">Nome do Condomínio</Label><Input className="bg-slate-800 border-slate-600 text-white" /></div>
                <div><Label className="text-slate-300">CNPJ do Condomínio</Label><Input className="bg-slate-800 border-slate-600 text-white" /></div>
                <div className="col-span-2"><Label className="text-slate-300">Endereço</Label><Input className="bg-slate-800 border-slate-600 text-white" /></div>
                <div><Label className="text-slate-300">Nº de Unidades</Label><Input type="number" className="bg-slate-800 border-slate-600 text-white" /></div>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-violet-400 mb-3">Plano</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-slate-300">Plano</Label>
                  <Select>
                    <SelectTrigger className="bg-slate-800 border-slate-600 text-white"><SelectValue placeholder="Selecione" /></SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600">
                      {planosMock.map(p => <SelectItem key={p.id} value={p.id}>{p.nome} - R$ {p.precoMensal}/mês</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="text-slate-300">Status</Label>
                  <Select defaultValue="trial">
                    <SelectTrigger className="bg-slate-800 border-slate-600 text-white"><SelectValue /></SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600">
                      <SelectItem value="trial">Trial</SelectItem>
                      <SelectItem value="ativo">Ativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div><Label className="text-slate-300">Data Início</Label><Input type="date" className="bg-slate-800 border-slate-600 text-white" /></div>
                <div><Label className="text-slate-300">Data Vencimento</Label><Input type="date" className="bg-slate-800 border-slate-600 text-white" /></div>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-violet-400 mb-3">Módulos Liberados</p>
              <ModulosCheckboxes value={modulosBasico} onChange={() => {}} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowCreate(false)} className="text-slate-300">Cancelar</Button>
            <Button onClick={() => { toast({ title: "Síndico cadastrado!" }); setShowCreate(false); }} className="bg-violet-600 hover:bg-violet-700 text-white">Cadastrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <DialogContent className="bg-slate-900 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription className="text-slate-400">
              Deseja realmente excluir o síndico <strong className="text-white">{deleteTarget?.nome}</strong>?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDeleteTarget(null)} className="text-slate-300">Cancelar</Button>
            <Button variant="destructive" onClick={() => { toast({ title: "Excluído!" }); setDeleteTarget(null); }}>Excluir</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SuperAdminSindicos;
