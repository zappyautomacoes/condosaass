import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Pencil, Power, Package } from "lucide-react";
import { planosMock } from "@/data/superAdminMock";
import { Plano, allModulosTrue } from "@/types/superAdmin";
import { ModulosCheckboxes } from "@/components/super-admin/ModulosCheckboxes";
import { useToast } from "@/hooks/use-toast";

const SuperAdminPlanos = () => {
  const [list] = useState<Plano[]>(planosMock);
  const [showCreate, setShowCreate] = useState(false);
  const { toast } = useToast();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Planos</h1>
          <p className="text-slate-400">Gerencie os planos disponíveis na plataforma</p>
        </div>
        <Button onClick={() => setShowCreate(true)} className="bg-violet-600 hover:bg-violet-700 text-white">
          <Plus className="w-4 h-4 mr-2" /> Novo Plano
        </Button>
      </div>

      {/* Plan cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {list.map(plano => (
          <Card key={plano.id} className="bg-slate-800/50 border-slate-700/50 overflow-hidden">
            <div className={`h-2 ${plano.nome === "Enterprise" ? "bg-gradient-to-r from-amber-500 to-orange-500" : plano.nome === "Profissional" ? "bg-gradient-to-r from-violet-500 to-purple-500" : "bg-gradient-to-r from-slate-500 to-slate-400"}`} />
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">{plano.nome}</CardTitle>
                <Badge className={plano.status === "ativo" ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}>
                  {plano.status === "ativo" ? "Ativo" : "Inativo"}
                </Badge>
              </div>
              <p className="text-slate-400 text-sm capitalize">Para {plano.tipo === "administradora" ? "Administradoras" : "Síndicos"}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-3xl font-bold text-white">R$ {plano.precoMensal}<span className="text-sm text-slate-400 font-normal">/mês</span></p>
                <p className="text-sm text-slate-500">R$ {plano.precoAnual}/ano</p>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-300"><span>Condomínios</span><span className="text-white font-medium">{plano.limiteCondominios}</span></div>
                <div className="flex justify-between text-slate-300"><span>Síndicos</span><span className="text-white font-medium">{plano.limiteSindicos}</span></div>
                <div className="flex justify-between text-slate-300"><span>Moradores</span><span className="text-white font-medium">{plano.limiteMoradores.toLocaleString()}</span></div>
                <div className="flex justify-between text-slate-300"><span>Usuários</span><span className="text-white font-medium">{plano.limiteUsuarios}</span></div>
                <div className="flex justify-between text-slate-300">
                  <span>Módulos</span>
                  <span className="text-white font-medium">{Object.values(plano.modulosInclusos).filter(Boolean).length}/{Object.keys(plano.modulosInclusos).length}</span>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="ghost" size="sm" className="flex-1 text-slate-400 hover:text-white hover:bg-slate-700"><Pencil className="w-3 h-3 mr-1" /> Editar</Button>
                <Button variant="ghost" size="sm" className="flex-1 text-slate-400 hover:text-white hover:bg-slate-700"><Power className="w-3 h-3 mr-1" /> {plano.status === "ativo" ? "Desativar" : "Ativar"}</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table view */}
      <Card className="bg-slate-800/50 border-slate-700/50">
        <CardHeader><CardTitle className="text-white text-sm">Todos os Planos</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700/50 hover:bg-transparent">
                <TableHead className="text-slate-400">Nome</TableHead>
                <TableHead className="text-slate-400">Tipo</TableHead>
                <TableHead className="text-slate-400">Mensal</TableHead>
                <TableHead className="text-slate-400">Anual</TableHead>
                <TableHead className="text-slate-400">Módulos</TableHead>
                <TableHead className="text-slate-400">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {list.map(p => (
                <TableRow key={p.id} className="border-slate-700/50 hover:bg-slate-700/30">
                  <TableCell className="text-white font-medium">{p.nome}</TableCell>
                  <TableCell className="text-slate-300 capitalize">{p.tipo}</TableCell>
                  <TableCell className="text-white">R$ {p.precoMensal}</TableCell>
                  <TableCell className="text-slate-300">R$ {p.precoAnual}</TableCell>
                  <TableCell className="text-slate-300">{Object.values(p.modulosInclusos).filter(Boolean).length}</TableCell>
                  <TableCell><Badge className={p.status === "ativo" ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"}>{p.status === "ativo" ? "Ativo" : "Inativo"}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={showCreate} onOpenChange={setShowCreate}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-700 text-white">
          <DialogHeader>
            <DialogTitle>Novo Plano</DialogTitle>
            <DialogDescription className="text-slate-400">Configure um novo plano para a plataforma.</DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-3">
              <div><Label className="text-slate-300">Nome do Plano</Label><Input className="bg-slate-800 border-slate-600 text-white" /></div>
              <div>
                <Label className="text-slate-300">Tipo</Label>
                <Select><SelectTrigger className="bg-slate-800 border-slate-600 text-white"><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-600"><SelectItem value="administradora">Administradora</SelectItem><SelectItem value="sindico">Síndico</SelectItem></SelectContent>
                </Select>
              </div>
              <div><Label className="text-slate-300">Preço Mensal (R$)</Label><Input type="number" className="bg-slate-800 border-slate-600 text-white" /></div>
              <div><Label className="text-slate-300">Preço Anual (R$)</Label><Input type="number" className="bg-slate-800 border-slate-600 text-white" /></div>
              <div><Label className="text-slate-300">Limite Condomínios</Label><Input type="number" className="bg-slate-800 border-slate-600 text-white" /></div>
              <div><Label className="text-slate-300">Limite Síndicos</Label><Input type="number" className="bg-slate-800 border-slate-600 text-white" /></div>
              <div><Label className="text-slate-300">Limite Moradores</Label><Input type="number" className="bg-slate-800 border-slate-600 text-white" /></div>
              <div><Label className="text-slate-300">Limite Usuários</Label><Input type="number" className="bg-slate-800 border-slate-600 text-white" /></div>
            </div>
            <div>
              <p className="text-sm font-semibold text-violet-400 mb-3">Módulos Inclusos</p>
              <ModulosCheckboxes value={allModulosTrue} onChange={() => {}} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowCreate(false)} className="text-slate-300">Cancelar</Button>
            <Button onClick={() => { toast({ title: "Plano criado!" }); setShowCreate(false); }} className="bg-violet-600 hover:bg-violet-700 text-white">Criar Plano</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SuperAdminPlanos;
