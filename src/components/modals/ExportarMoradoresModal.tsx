import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Download, FileText, Table } from "lucide-react";

interface ExportarMoradoresModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const ExportarMoradoresModal = ({ open, onOpenChange }: ExportarMoradoresModalProps) => {
  const { toast } = useToast();
  const [formato, setFormato] = useState("excel");
  const [campos, setCampos] = useState({
    dadosPessoais: true,
    contato: true,
    endereco: true,
    situacao: true,
    dependentes: false,
    pets: false,
    historico: false
  });

  const handleCampoChange = (campo: string, checked: boolean) => {
    setCampos(prev => ({ ...prev, [campo]: checked }));
  };

  const handleExportar = () => {
    // Simular exportação
    toast({
      title: "Relatório gerado!",
      description: `Lista de moradores exportada em ${formato.toUpperCase()} com sucesso.`,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="w-5 h-5 text-primary" />
            Exportar Lista de Moradores
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Formato */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Formato do Arquivo</Label>
            <Select value={formato} onValueChange={setFormato}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o formato" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="excel">
                  <div className="flex items-center gap-2">
                    <Table className="w-4 h-4" />
                    Excel (.xlsx)
                  </div>
                </SelectItem>
                <SelectItem value="pdf">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    PDF (.pdf)
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Separator />

          {/* Campos */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Campos a Incluir</Label>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="dadosPessoais"
                  checked={campos.dadosPessoais}
                  onCheckedChange={(checked) => handleCampoChange("dadosPessoais", checked as boolean)}
                />
                <Label htmlFor="dadosPessoais">Dados Pessoais (Nome, CPF, RG)</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="contato"
                  checked={campos.contato}
                  onCheckedChange={(checked) => handleCampoChange("contato", checked as boolean)}
                />
                <Label htmlFor="contato">Informações de Contato</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="endereco"
                  checked={campos.endereco}
                  onCheckedChange={(checked) => handleCampoChange("endereco", checked as boolean)}
                />
                <Label htmlFor="endereco">Endereço (Bloco, Apartamento)</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="situacao"
                  checked={campos.situacao}
                  onCheckedChange={(checked) => handleCampoChange("situacao", checked as boolean)}
                />
                <Label htmlFor="situacao">Situação (Ativo/Inativo, Tipo)</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="dependentes"
                  checked={campos.dependentes}
                  onCheckedChange={(checked) => handleCampoChange("dependentes", checked as boolean)}
                />
                <Label htmlFor="dependentes">Lista de Dependentes</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="pets"
                  checked={campos.pets}
                  onCheckedChange={(checked) => handleCampoChange("pets", checked as boolean)}
                />
                <Label htmlFor="pets">Lista de Pets</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="historico"
                  checked={campos.historico}
                  onCheckedChange={(checked) => handleCampoChange("historico", checked as boolean)}
                />
                <Label htmlFor="historico">Histórico de Participação</Label>
              </div>
            </div>
          </div>

          {/* Resumo */}
          <div className="p-4 bg-muted/20 rounded-lg">
            <h4 className="font-medium mb-2">Resumo da Exportação</h4>
            <p className="text-sm text-muted-foreground">
              • Formato: {formato.toUpperCase()}<br/>
              • Total de moradores: 127<br/>
              • Campos selecionados: {Object.values(campos).filter(Boolean).length}
            </p>
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button onClick={handleExportar} className="bg-gradient-primary text-primary-foreground">
              <Download className="w-4 h-4 mr-2" />
              Exportar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};