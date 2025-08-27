import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface EditarMoradorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  morador: any;
  onMoradorUpdated?: (morador: any) => void;
}

export const EditarMoradorModal = ({ open, onOpenChange, morador, onMoradorUpdated }: EditarMoradorModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    apartamento: "",
    bloco: "",
    tipo: "proprietario",
    status: "ativo",
    observacoes: "",
  });

  const tipoOptions = [
    { value: "proprietario", label: "Proprietário" },
    { value: "inquilino", label: "Inquilino" },
    { value: "familiar", label: "Familiar" },
    { value: "visitante", label: "Visitante" }
  ];

  const statusOptions = [
    { value: "ativo", label: "Ativo" },
    { value: "inativo", label: "Inativo" },
    { value: "pendente", label: "Pendente" }
  ];

  const blocos = ["A", "B", "C", "D", "E"];

  useEffect(() => {
    if (morador && open) {
      setFormData({
        nome: morador.nome || "",
        email: morador.email || "",
        telefone: morador.telefone || "",
        apartamento: morador.apartamento || "",
        bloco: morador.bloco || "",
        tipo: morador.tipo || "proprietario",
        status: morador.status || "ativo",
        observacoes: morador.observacoes || "",
      });
    }
  }, [morador, open]);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nome || !formData.email || !formData.apartamento) {
      toast({
        title: "Erro no preenchimento",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    const moradorAtualizado = {
      ...morador,
      nome: formData.nome,
      email: formData.email,
      telefone: formData.telefone,
      apartamento: formData.apartamento,
      bloco: formData.bloco,
      tipo: formData.tipo,
      status: formData.status,
      observacoes: formData.observacoes,
      ultimaAlteracao: new Date().toISOString(),
    };

    onMoradorUpdated?.(moradorAtualizado);
    
    toast({
      title: "Morador atualizado!",
      description: `Dados de ${formData.nome} foram atualizados com sucesso.`,
    });
    
    onOpenChange(false);
  };

  if (!morador) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Editar Morador</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome Completo *</Label>
            <Input
              id="nome"
              value={formData.nome}
              onChange={(e) => handleInputChange("nome", e.target.value)}
              placeholder="Nome completo do morador"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="email@exemplo.com"
            />
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

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="apartamento">Apartamento *</Label>
              <Input
                id="apartamento"
                value={formData.apartamento}
                onChange={(e) => handleInputChange("apartamento", e.target.value)}
                placeholder="Ex: Apt 301"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bloco">Bloco</Label>
              <Select value={formData.bloco} onValueChange={(value) => handleInputChange("bloco", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Bloco" />
                </SelectTrigger>
                <SelectContent>
                  {blocos.map((bloco) => (
                    <SelectItem key={bloco} value={bloco}>
                      Bloco {bloco}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo</Label>
              <Select value={formData.tipo} onValueChange={(value) => handleInputChange("tipo", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  {tipoOptions.map((tipo) => (
                    <SelectItem key={tipo.value} value={tipo.value}>
                      {tipo.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((status) => (
                    <SelectItem key={status.value} value={status.value}>
                      {status.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea
              id="observacoes"
              value={formData.observacoes}
              onChange={(e) => handleInputChange("observacoes", e.target.value)}
              placeholder="Informações adicionais sobre o morador..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" className="bg-gradient-primary text-primary-foreground">
              Salvar Alterações
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};