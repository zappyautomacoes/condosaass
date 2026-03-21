import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Eye, Pencil, Ban, Trash2, Building2, Users, Home } from "lucide-react";
import { administradorasMock, planosMock } from "@/data/superAdminMock";
import { Administradora, StatusCliente, allModulosTrue, modulosProfissional, modulosBasico } from "@/types/superAdmin";
import { ModulosCheckboxes } from "@/components/super-admin/ModulosCheckboxes";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const statusBadge: Record<StatusCliente, { label: string; className: string }> = {
  ativo: { label: "Ativo", className: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" },
  suspenso: { label: "Suspenso", className: "bg-amber-500/20 text-amber-400 border-amber-500/30" },
  trial: { label: "Trial", className: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  cancelado: { label: "Cancelado", className: "bg-red-500/20 text-red-400 border-red-500/30" },
};

const planoBadge: Record<string, string> = {
  "Básico": "bg-slate-500/20 text-slate-300 border-slate-500/30",
  "Profissional": "bg-violet-500/20 text-violet-300 border-violet-500/30",
  "Enterprise": "bg-amber-500/20 text-amber-300 border-amber-500/30",
};

const SuperAdminAdministradoras = () => {
  const [search, setSearch] = useState("");
  const [list] = useState<Administradora[]>(administradorasMock);
  const [showCreate, setShowCreate] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Administradora | null>(null);
  const { toast } = useToast();

  const filtered = list.filter(a =>
    a.nomeFantasia.toLowerCase().includes(search.toLowerCase()) ||
    a.cnpj.includes(search)
  );

  const handleCreate = () => {
    toast({ title: "Administradora cadastrada!", description: "O cadastro foi realizado com sucesso." });
    setShowCreate(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Administradoras</h1>
          <p className="text-slate-400">Gestão de empresas administradoras de condomínios</p>
        </div>
        <Button onClick={() => setShowCreate(true)} className="bg-violet-600 hover:bg-violet-700 text-white">
          <Plus className="w-4 h-4 mr-2" /> Nova Administradora
        </Button>
      </div>

      {/* Stats mini */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total", value: list.length, icon: Building2, color: "from-violet-500 to-purple-600" },
          { label: "Ativas", value: list.filter(a => a.status === "ativo").length, icon: Users, color: "from-emerald-500 to-green-600" },
          { label: "Condomínios", value: list.reduce((a, b) => a + b.condominiosGerenciados, 0), icon: Home, color: "from-blue-500 to-cyan-600" },
        ].map(s => (
          <Card key={s.label} className="bg-slate-800/50 border-slate-700/50">
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${s.color} flex items-center justify-center`}>
                <s.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-xl font-bold text-white">{s.value}</p>
                <p className="text-xs text-slate-400">{s.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search + Table */}
      <Card className="bg-slate-800/50 border-slate-700/50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white text-sm">Lista de Administradoras</CardTitle>
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                placeholder="Buscar por nome ou CNPJ..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700/50 hover:bg-transparent">
                <TableHead className="text-slate-400">Empresa</TableHead>
                <TableHead className="text-slate-400">CNPJ</TableHead>
                <TableHead className="text-slate-400">Plano</TableHead>
                <TableHead className="text-slate-400">Status</TableHead>
                <TableHead className="text-slate-400">Síndicos</TableHead>
                <TableHead className="text-slate-400">Condomínios</TableHead>
                <TableHead className="text-slate-400 text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map(adm => (
                <TableRow key={adm.id} className="border-slate-700/50 hover:bg-slate-700/30">
                  <TableCell>
                    <div>
                      <p className="font-medium text-white">{adm.nomeFantasia}</p>
                      <p className="text-xs text-slate-400">{adm.responsavel.nome}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-300 text-sm">{adm.cnpj}</TableCell>
                  <TableCell><Badge className={planoBadge[adm.planoNome]}>{adm.planoNome}</Badge></TableCell>
                  <TableCell><Badge className={statusBadge[adm.status].className}>{statusBadge[adm.status].label}</Badge></TableCell>
                  <TableCell className="text-slate-300">{adm.sindicosVinculados}</TableCell>
                  <TableCell className="text-slate-300">{adm.condominiosGerenciados}</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" asChild className="text-slate-400 hover:text-white hover:bg-slate-700">
                        <Link to={`/super-admin/administradoras/${adm.id}`}><Eye className="w-4 h-4" /></Link>
                      </Button>
                      <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white hover:bg-slate-700">
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-amber-400 hover:text-amber-300 hover:bg-slate-700">
                        <Ban className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" onClick={() => setDeleteTarget(adm)} className="text-red-400 hover:text-red-300 hover:bg-slate-700">
                        <Trash2 className="w-4 h-4" />
                      </Button>
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
            <DialogTitle>Nova Administradora</DialogTitle>
            <DialogDescription className="text-slate-400">Preencha os dados para cadastrar uma nova administradora.</DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold text-violet-400 mb-3">Dados da Empresa</p>
              <div className="grid grid-cols-2 gap-3">
                <div><Label className="text-slate-300">Razão Social</Label><Input className="bg-slate-800 border-slate-600 text-white" /></div>
                <div><Label className="text-slate-300">Nome Fantasia</Label><Input className="bg-slate-800 border-slate-600 text-white" /></div>
                <div><Label className="text-slate-300">CNPJ</Label><Input className="bg-slate-800 border-slate-600 text-white" /></div>
                <div><Label className="text-slate-300">Inscrição Estadual</Label><Input className="bg-slate-800 border-slate-600 text-white" /></div>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-violet-400 mb-3">Responsável</p>
              <div className="grid grid-cols-3 gap-3">
                <div><Label className="text-slate-300">Nome</Label><Input className="bg-slate-800 border-slate-600 text-white" /></div>
                <div><Label className="text-slate-300">CPF</Label><Input className="bg-slate-800 border-slate-600 text-white" /></div>
                <div><Label className="text-slate-300">Cargo</Label><Input className="bg-slate-800 border-slate-600 text-white" /></div>
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
              <p className="text-sm font-semibold text-violet-400 mb-3">Endereço</p>
              <div className="grid grid-cols-3 gap-3">
                <div><Label className="text-slate-300">CEP</Label><Input className="bg-slate-800 border-slate-600 text-white" /></div>
                <div className="col-span-2"><Label className="text-slate-300">Rua</Label><Input className="bg-slate-800 border-slate-600 text-white" /></div>
                <div><Label className="text-slate-300">Número</Label><Input className="bg-slate-800 border-slate-600 text-white" /></div>
                <div><Label className="text-slate-300">Complemento</Label><Input className="bg-slate-800 border-slate-600 text-white" /></div>
                <div><Label className="text-slate-300">Bairro</Label><Input className="bg-slate-800 border-slate-600 text-white" /></div>
                <div><Label className="text-slate-300">Cidade</Label><Input className="bg-slate-800 border-slate-600 text-white" /></div>
                <div>
                  <Label className="text-slate-300">Estado</Label>
                  <Select>
                    <SelectTrigger className="bg-slate-800 border-slate-600 text-white"><SelectValue placeholder="UF" /></SelectTrigger>
                    <SelectContent className="bg-slate-800 border-slate-600">
                      {["SP","RJ","MG","RS","PR","SC","BA","PE","CE","DF"].map(uf => <SelectItem key={uf} value={uf}>{uf}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-violet-400 mb-3">Plano e Limites</p>
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
                <div><Label className="text-slate-300">Limite de Condomínios</Label><Input type="number" defaultValue={5} className="bg-slate-800 border-slate-600 text-white" /></div>
                <div><Label className="text-slate-300">Limite de Síndicos</Label><Input type="number" defaultValue={5} className="bg-slate-800 border-slate-600 text-white" /></div>
                <div><Label className="text-slate-300">Data Início</Label><Input type="date" className="bg-slate-800 border-slate-600 text-white" /></div>
                <div><Label className="text-slate-300">Data Vencimento</Label><Input type="date" className="bg-slate-800 border-slate-600 text-white" /></div>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold text-violet-400 mb-3">Módulos Liberados</p>
              <ModulosCheckboxes value={modulosProfissional} onChange={() => {}} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowCreate(false)} className="text-slate-300">Cancelar</Button>
            <Button onClick={handleCreate} className="bg-violet-600 hover:bg-violet-700 text-white">Cadastrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete confirm */}
      <Dialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <DialogContent className="bg-slate-900 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription className="text-slate-400">
              Deseja realmente excluir a administradora <strong className="text-white">{deleteTarget?.nomeFantasia}</strong>? Esta ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDeleteTarget(null)} className="text-slate-300">Cancelar</Button>
            <Button variant="destructive" onClick={() => { toast({ title: "Excluída com sucesso" }); setDeleteTarget(null); }}>Excluir</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SuperAdminAdministradoras;
