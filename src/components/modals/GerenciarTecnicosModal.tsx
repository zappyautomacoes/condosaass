import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { 
  Plus,
  Search,
  Phone,
  Mail,
  Edit,
  Trash2
} from "lucide-react";

interface GerenciarTecnicosModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const GerenciarTecnicosModal = ({ open, onOpenChange }: GerenciarTecnicosModalProps) => {
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [editingTecnico, setEditingTecnico] = useState<any>(null);
  const [formData, setFormData] = useState({
    nome: "",
    especialidade: "",
    telefone: "",
    email: "",
    status: "ativo",
  });

  const [tecnicos, setTecnicos] = useState([
    {
      id: 1,
      nome: "Carlos Técnico",
      especialidade: "Hidráulica",
      telefone: "(11) 99999-1111",
      email: "carlos@tecnico.com",
      status: "ativo",
      chamadosAtivos: 3,
      ultimoServico: "2024-01-20"
    },
    {
      id: 2,
      nome: "Pedro Limpeza",
      especialidade: "Limpeza",
      telefone: "(11) 99999-2222", 
      email: "pedro@limpeza.com",
      status: "ativo",
      chamadosAtivos: 1,
      ultimoServico: "2024-01-22"
    },
    {
      id: 3,
      nome: "Ana Hidráulica",
      especialidade: "Hidráulica",
      telefone: "(11) 99999-3333",
      email: "ana@hidraulica.com", 
      status: "inativo",
      chamadosAtivos: 0,
      ultimoServico: "2024-01-10"
    },
  ]);

  const especialidades = [
    "Hidráulica",
    "Elétrica", 
    "Limpeza",
    "Jardinagem",
    "Segurança",
    "Estrutural",
    "Pintura",
    "Ar Condicionado"
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ativo":
        return <Badge className="bg-success/10 text-success border-success/20">Ativo</Badge>;
      case "inativo":
        return <Badge className="bg-muted/10 text-muted-foreground border-muted/20">Inativo</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getInitials = (nome: string) => {
    return nome
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nome || !formData.especialidade) {
      toast({
        title: "Erro no preenchimento",
        description: "Preencha os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    if (editingTecnico) {
      // Editar técnico existente
      setTecnicos(prev => prev.map(t => 
        t.id === editingTecnico.id 
          ? { ...t, ...formData }
          : t
      ));
      toast({
        title: "Técnico atualizado!",
        description: `${formData.nome} foi atualizado com sucesso.`,
      });
    } else {
      // Adicionar novo técnico
      const novoTecnico = {
        id: Date.now(),
        ...formData,
        chamadosAtivos: 0,
        ultimoServico: "-"
      };
      setTecnicos(prev => [...prev, novoTecnico]);
      toast({
        title: "Técnico cadastrado!",
        description: `${formData.nome} foi adicionado com sucesso.`,
      });
    }

    // Reset form
    setFormData({
      nome: "",
      especialidade: "",
      telefone: "",
      email: "",
      status: "ativo",
    });
    setEditingTecnico(null);
    setShowForm(false);
  };

  const handleEdit = (tecnico: any) => {
    setFormData(tecnico);
    setEditingTecnico(tecnico);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setTecnicos(prev => prev.filter(t => t.id !== id));
    toast({
      title: "Técnico removido!",
      description: "Técnico foi removido do sistema.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Gerenciar Técnicos</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Header com busca e botão adicionar */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar técnicos..."
                className="pl-10"
              />
            </div>
            <Button 
              onClick={() => setShowForm(!showForm)}
              className="bg-gradient-primary text-primary-foreground"
            >
              <Plus className="w-4 h-4 mr-2" />
              {showForm ? "Cancelar" : "Novo Técnico"}
            </Button>
          </div>

          {/* Formulário */}
          {showForm && (
            <form onSubmit={handleSubmit} className="bg-muted/20 p-4 rounded-lg space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="nome">Nome *</Label>
                  <Input
                    id="nome"
                    value={formData.nome}
                    onChange={(e) => handleInputChange("nome", e.target.value)}
                    placeholder="Nome completo"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="especialidade">Especialidade *</Label>
                  <Select onValueChange={(value) => handleInputChange("especialidade", value)} value={formData.especialidade}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      {especialidades.map((esp) => (
                        <SelectItem key={esp} value={esp}>
                          {esp}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    value={formData.telefone}
                    onChange={(e) => handleInputChange("telefone", e.target.value)}
                    placeholder="(11) 99999-9999"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="email@exemplo.com"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setShowForm(false);
                    setEditingTecnico(null);
                    setFormData({
                      nome: "",
                      especialidade: "",
                      telefone: "",
                      email: "",
                      status: "ativo",
                    });
                  }}
                >
                  Cancelar
                </Button>
                <Button type="submit" className="bg-gradient-primary text-primary-foreground">
                  {editingTecnico ? "Atualizar" : "Cadastrar"}
                </Button>
              </div>
            </form>
          )}

          {/* Lista de técnicos */}
          <ScrollArea className="h-96">
            <div className="space-y-3">
              {tecnicos.map((tecnico) => (
                <div key={tecnico.id} className="border border-border rounded-lg p-4 hover:bg-muted/20 transition-smooth">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                          {getInitials(tecnico.nome)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <p className="font-semibold text-foreground">
                            {tecnico.nome}
                          </p>
                          <Badge variant="outline" className="text-xs">
                            {tecnico.especialidade}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                          <div className="flex items-center gap-1">
                            <Phone className="w-3 h-3" />
                            {tecnico.telefone}
                          </div>
                          <div className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {tecnico.email}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          {getStatusBadge(tecnico.status)}
                          <span className="text-xs text-muted-foreground">
                            {tecnico.chamadosAtivos} chamados ativos
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEdit(tecnico)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDelete(tecnico.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="flex justify-end">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Fechar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};