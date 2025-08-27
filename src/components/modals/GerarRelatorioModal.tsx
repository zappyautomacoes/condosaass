import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GerarRelatorioModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const GerarRelatorioModal = ({ open, onOpenChange }: GerarRelatorioModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    tipo: "",
    periodo: "",
    dataInicio: "",
    dataFim: "",
    formato: "pdf",
    incluirGraficos: true,
    condominio: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Relatório gerado!",
      description: `Relatório ${formData.tipo} está sendo processado.`,
    });
    setFormData({
      tipo: "",
      periodo: "",
      dataInicio: "",
      dataFim: "",
      formato: "pdf",
      incluirGraficos: true,
      condominio: ""
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            <DialogTitle>Gerar Relatório</DialogTitle>
          </div>
          <DialogDescription>
            Configure e gere relatórios personalizados do sistema.
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="tipo">Tipo de Relatório</Label>
            <Select value={formData.tipo} onValueChange={(value) => setFormData({...formData, tipo: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="financeiro">Financeiro</SelectItem>
                <SelectItem value="atendimentos">Atendimentos</SelectItem>
                <SelectItem value="ocupacao">Ocupação de Espaços</SelectItem>
                <SelectItem value="inadimplencia">Inadimplência</SelectItem>
                <SelectItem value="manutencoes">Manutenções</SelectItem>
                <SelectItem value="comunicados">Comunicados</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="condominio">Condomínio</Label>
            <Select value={formData.condominio} onValueChange={(value) => setFormData({...formData, condominio: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o condomínio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Condomínios</SelectItem>
                <SelectItem value="residencial-aurora">Residencial Aurora</SelectItem>
                <SelectItem value="torre-azul">Torre Azul</SelectItem>
                <SelectItem value="jardim-botanico">Jardim Botânico</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="periodo">Período</Label>
            <Select value={formData.periodo} onValueChange={(value) => setFormData({...formData, periodo: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mes-atual">Mês Atual</SelectItem>
                <SelectItem value="mes-anterior">Mês Anterior</SelectItem>
                <SelectItem value="trimestre">Último Trimestre</SelectItem>
                <SelectItem value="semestre">Último Semestre</SelectItem>
                <SelectItem value="ano">Ano Atual</SelectItem>
                <SelectItem value="personalizado">Período Personalizado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {formData.periodo === "personalizado" && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dataInicio">Data de Início</Label>
                <Input
                  id="dataInicio"
                  type="date"
                  value={formData.dataInicio}
                  onChange={(e) => setFormData({...formData, dataInicio: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dataFim">Data de Fim</Label>
                <Input
                  id="dataFim"
                  type="date"
                  value={formData.dataFim}
                  onChange={(e) => setFormData({...formData, dataFim: e.target.value})}
                  required
                />
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="formato">Formato do Arquivo</Label>
            <Select value={formData.formato} onValueChange={(value) => setFormData({...formData, formato: value})}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o formato" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="excel">Excel (XLSX)</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox 
              id="incluirGraficos"
              checked={formData.incluirGraficos}
              onCheckedChange={(checked) => setFormData({...formData, incluirGraficos: checked as boolean})}
            />
            <Label htmlFor="incluirGraficos">Incluir gráficos e estatísticas</Label>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Gerar Relatório</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};