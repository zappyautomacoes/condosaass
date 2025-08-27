import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface AtribuirTecnicoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  chamado?: any;
  onChamadoUpdated?: (chamado: any) => void;
}

export const AtribuirTecnicoModal = ({ open, onOpenChange, chamado, onChamadoUpdated }: AtribuirTecnicoModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    tecnico: "",
    prazo: "",
    observacoes: "",
  });

  const tecnicos = [
    "Carlos Técnico",
    "Pedro Limpeza", 
    "Ana Hidráulica",
    "João Elétrica",
    "Maria Jardinagem"
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.tecnico) {
      toast({
        title: "Erro no preenchimento",
        description: "Selecione um técnico.",
        variant: "destructive",
      });
      return;
    }

    const chamadoAtualizado = {
      ...chamado,
      tecnico: formData.tecnico,
      prazo: formData.prazo,
      status: "em_andamento",
      observacoesTecnico: formData.observacoes,
    };

    onChamadoUpdated?.(chamadoAtualizado);
    
    toast({
      title: "Técnico atribuído!",
      description: `Chamado atribuído a ${formData.tecnico}.`,
    });

    setFormData({
      tecnico: "",
      prazo: "",
      observacoes: "",
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Atribuir Técnico</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Protocolo</Label>
            <p className="text-sm font-medium text-muted-foreground">
              #{chamado?.protocolo}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tecnico">Técnico Responsável *</Label>
            <Select onValueChange={(value) => handleInputChange("tecnico", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o técnico" />
              </SelectTrigger>
              <SelectContent>
                {tecnicos.map((tecnico) => (
                  <SelectItem key={tecnico} value={tecnico}>
                    {tecnico}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="prazo">Prazo Estimado</Label>
            <Select onValueChange={(value) => handleInputChange("prazo", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o prazo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2h">2 horas</SelectItem>
                <SelectItem value="4h">4 horas</SelectItem>
                <SelectItem value="8h">8 horas</SelectItem>
                <SelectItem value="1d">1 dia</SelectItem>
                <SelectItem value="2d">2 dias</SelectItem>
                <SelectItem value="1s">1 semana</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="observacoes">Observações para o Técnico</Label>
            <Textarea
              id="observacoes"
              value={formData.observacoes}
              onChange={(e) => handleInputChange("observacoes", e.target.value)}
              placeholder="Instruções específicas, localização, ferramentas..."
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
              Atribuir
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};