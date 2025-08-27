import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GerarCobrancaModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const GerarCobrancaModal = ({ open, onOpenChange }: GerarCobrancaModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    condominio: "",
    morador: "",
    tipo: "",
    valor: "",
    vencimento: "",
    observacoes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Cobrança gerada!",
      description: `Boleto de R$ ${formData.valor} criado com sucesso.`,
    });
    setFormData({
      condominio: "",
      morador: "",
      tipo: "",
      valor: "",
      vencimento: "",
      observacoes: ""
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-primary" />
            <DialogTitle>Gerar Cobrança</DialogTitle>
          </div>
          <DialogDescription>
            Crie uma nova cobrança ou boleto para envio ao morador.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="condominio">Condomínio</Label>
              <Select value={formData.condominio} onValueChange={(value) => setFormData({...formData, condominio: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residencial-aurora">Residencial Aurora</SelectItem>
                  <SelectItem value="torre-azul">Torre Azul</SelectItem>
                  <SelectItem value="jardim-botanico">Jardim Botânico</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="morador">Morador</Label>
              <Select value={formData.morador} onValueChange={(value) => setFormData({...formData, morador: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="joao-silva">João Silva - Apt 301</SelectItem>
                  <SelectItem value="maria-santos">Maria Santos - Apt 205</SelectItem>
                  <SelectItem value="pedro-oliveira">Pedro Oliveira - Apt 102</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tipo">Tipo de Cobrança</Label>
            <Select value={formData.tipo} onValueChange={(value) => setFormData({...formData, tipo: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="condominio">Taxa de Condomínio</SelectItem>
                <SelectItem value="multa">Multa</SelectItem>
                <SelectItem value="taxa-extra">Taxa Extraordinária</SelectItem>
                <SelectItem value="reserva">Taxa de Reserva</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="valor">Valor (R$)</Label>
              <Input
                id="valor"
                type="number"
                step="0.01"
                value={formData.valor}
                onChange={(e) => setFormData({...formData, valor: e.target.value})}
                placeholder="850.00"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vencimento">Data de Vencimento</Label>
              <Input
                id="vencimento"
                type="date"
                value={formData.vencimento}
                onChange={(e) => setFormData({...formData, vencimento: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea
              id="observacoes"
              value={formData.observacoes}
              onChange={(e) => setFormData({...formData, observacoes: e.target.value})}
              placeholder="Informações adicionais sobre a cobrança..."
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Gerar Cobrança</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};