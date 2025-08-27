import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

interface AbrirAtendimentoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onChamadoCreated?: (chamado: any) => void;
}

export const AbrirAtendimentoModal = ({ open, onOpenChange, onChamadoCreated }: AbrirAtendimentoModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    tipo: "",
    descricao: "",
    morador: "",
    apartamento: "",
    prioridade: "media",
    observacoes: "",
  });

  const tiposManutencao = [
    "Hidráulica",
    "Elétrica", 
    "Limpeza",
    "Jardinagem",
    "Segurança",
    "Estrutural",
    "Pintura",
    "Ar Condicionado"
  ];

  const prioridades = [
    { value: "baixa", label: "Baixa", color: "success" },
    { value: "media", label: "Média", color: "warning" },
    { value: "alta", label: "Alta", color: "destructive" }
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.tipo || !formData.descricao || !formData.morador) {
      toast({
        title: "Erro no preenchimento",
        description: "Preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    const novoChamado = {
      id: Date.now(),
      protocolo: `MAN${String(Date.now()).slice(-6)}`,
      tipo: formData.tipo,
      descricao: formData.descricao,
      morador: formData.morador,
      apartamento: formData.apartamento,
      prioridade: formData.prioridade,
      status: "aberto",
      dataAbertura: new Date().toLocaleString("pt-BR"),
      tecnico: null,
      observacoes: formData.observacoes,
    };

    onChamadoCreated?.(novoChamado);
    
    toast({
      title: "Chamado aberto!",
      description: `Chamado ${novoChamado.protocolo} criado com sucesso.`,
    });

    // Reset form
    setFormData({
      tipo: "",
      descricao: "",
      morador: "",
      apartamento: "",
      prioridade: "media",
      observacoes: "",
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Novo Chamado de Manutenção</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tipo">Tipo de Manutenção *</Label>
            <Select onValueChange={(value) => handleInputChange("tipo", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                {tiposManutencao.map((tipo) => (
                  <SelectItem key={tipo} value={tipo}>
                    {tipo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição do Problema *</Label>
            <Textarea
              id="descricao"
              value={formData.descricao}
              onChange={(e) => handleInputChange("descricao", e.target.value)}
              placeholder="Descreva detalhadamente o problema..."
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="morador">Morador *</Label>
              <Input
                id="morador"
                value={formData.morador}
                onChange={(e) => handleInputChange("morador", e.target.value)}
                placeholder="Nome do solicitante"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="apartamento">Apartamento</Label>
              <Input
                id="apartamento"
                value={formData.apartamento}
                onChange={(e) => handleInputChange("apartamento", e.target.value)}
                placeholder="Ex: Apt 301"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Prioridade</Label>
            <div className="flex gap-2">
              {prioridades.map((p) => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => handleInputChange("prioridade", p.value)}
                  className={`flex-1 p-2 rounded-md border transition-colors ${
                    formData.prioridade === p.value 
                      ? "border-primary bg-primary/10" 
                      : "border-border hover:bg-muted/50"
                  }`}
                >
                  <Badge 
                    className={`w-full ${
                      p.color === "success" ? "bg-success/10 text-success border-success/20" :
                      p.color === "warning" ? "bg-warning/10 text-warning border-warning/20" :
                      "bg-destructive/10 text-destructive border-destructive/20"
                    }`}
                  >
                    {p.label}
                  </Badge>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea
              id="observacoes"
              value={formData.observacoes}
              onChange={(e) => handleInputChange("observacoes", e.target.value)}
              placeholder="Informações adicionais..."
              rows={2}
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
              Abrir Chamado
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};