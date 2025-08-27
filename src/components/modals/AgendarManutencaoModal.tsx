import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Wrench, Calendar } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface AgendarManutencaoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  patrimonio?: any;
}

const AgendarManutencaoModal = ({ open, onOpenChange, patrimonio }: AgendarManutencaoModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    tipo: "",
    dataAgendada: "",
    responsavel: "",
    fornecedor: "",
    custo: "",
    observacoes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.tipo || !formData.dataAgendada || !formData.responsavel) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    console.log('Agendando manutenção:', { patrimonio, formData });
    
    toast({
      title: "Manutenção agendada",
      description: "A manutenção foi agendada com sucesso",
    });
    
    // Reset form
    setFormData({
      tipo: "",
      dataAgendada: "",
      responsavel: "",
      fornecedor: "",
      custo: "",
      observacoes: ""
    });
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Wrench className="w-5 h-5" />
            Agendar Manutenção
          </DialogTitle>
          {patrimonio && (
            <p className="text-sm text-muted-foreground">
              Item: {patrimonio.nome} - {patrimonio.numeroPlaqueta}
            </p>
          )}
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo de Manutenção *</Label>
              <Select value={formData.tipo} onValueChange={(value) => setFormData({...formData, tipo: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Preventiva">Preventiva</SelectItem>
                  <SelectItem value="Corretiva">Corretiva</SelectItem>
                  <SelectItem value="Preditiva">Preditiva</SelectItem>
                  <SelectItem value="Emergencial">Emergencial</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dataAgendada">Data Agendada *</Label>
              <Input
                id="dataAgendada"
                type="datetime-local"
                value={formData.dataAgendada}
                onChange={(e) => setFormData({...formData, dataAgendada: e.target.value})}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="responsavel">Responsável *</Label>
              <Input
                id="responsavel"
                value={formData.responsavel}
                onChange={(e) => setFormData({...formData, responsavel: e.target.value})}
                placeholder="Nome do responsável"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fornecedor">Fornecedor</Label>
              <Select value={formData.fornecedor} onValueChange={(value) => setFormData({...formData, fornecedor: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o fornecedor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Elevadores Tech LTDA">Elevadores Tech LTDA</SelectItem>
                  <SelectItem value="Bombas Hidráulicas LTDA">Bombas Hidráulicas LTDA</SelectItem>
                  <SelectItem value="Segurança Plus">Segurança Plus</SelectItem>
                  <SelectItem value="Outro">Outro</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="custo">Custo Estimado (R$)</Label>
              <Input
                id="custo"
                type="number"
                step="0.01"
                value={formData.custo}
                onChange={(e) => setFormData({...formData, custo: e.target.value})}
                placeholder="0,00"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea
              id="observacoes"
              value={formData.observacoes}
              onChange={(e) => setFormData({...formData, observacoes: e.target.value})}
              placeholder="Detalhes da manutenção, peças necessárias, etc..."
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              Agendar Manutenção
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AgendarManutencaoModal;