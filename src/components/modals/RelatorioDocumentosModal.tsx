import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Calendar, Filter, FileSpreadsheet, File } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface RelatorioDocumentosModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const RelatorioDocumentosModal = ({ open, onOpenChange }: RelatorioDocumentosModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    tipoRelatorio: "completo",
    formato: "pdf",
    dataInicio: "",
    dataFim: "",
    categorias: [] as string[],
    incluirVencidos: true,
    incluirCompartilhados: true,
    incluirDownloads: true,
    incluirHistorico: false,
    agruparPor: "categoria"
  });

  const categorias = [
    "Atas", "Licenças", "Contratos", "Seguros", "Alvarás", "Outros"
  ];

  const tiposRelatorio = [
    { value: "completo", label: "Relatório Completo", description: "Todos os documentos com detalhes" },
    { value: "vencimentos", label: "Vencimentos", description: "Documentos próximos ao vencimento" },
    { value: "atividade", label: "Atividade", description: "Downloads e acessos recentes" },
    { value: "compartilhamento", label: "Compartilhamento", description: "Status de compartilhamento" }
  ];

  const handleCategoriaChange = (categoria: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({ ...prev, categorias: [...prev.categorias, categoria] }));
    } else {
      setFormData(prev => ({ ...prev, categorias: prev.categorias.filter(c => c !== categoria) }));
    }
  };

  const handleGenerate = () => {
    // Simular geração do relatório
    console.log('Gerando relatório:', formData);
    
    toast({
      title: "Relatório sendo gerado",
      description: `Relatório ${formData.tipoRelatorio} em formato ${formData.formato.toUpperCase()} será baixado em instantes`,
    });

    // Simular download após delay
    setTimeout(() => {
      toast({
        title: "Relatório pronto",
        description: "O relatório foi gerado e está sendo baixado",
      });
    }, 2000);
    
    onOpenChange(false);
  };

  const estatisticas = {
    totalDocumentos: 15,
    documentosVencendo: 3,
    documentosVencidos: 1,
    documentosCompartilhados: 8,
    totalDownloads: 124
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Gerar Relatório de Documentos
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Estatísticas Rápidas */}
          <div className="bg-muted/30 p-4 rounded-lg">
            <h4 className="font-medium mb-3">Resumo Atual</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary">{estatisticas.totalDocumentos}</p>
                <p className="text-xs text-muted-foreground">Total</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-warning">{estatisticas.documentosVencendo}</p>
                <p className="text-xs text-muted-foreground">Vencendo</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-destructive">{estatisticas.documentosVencidos}</p>
                <p className="text-xs text-muted-foreground">Vencidos</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-success">{estatisticas.documentosCompartilhados}</p>
                <p className="text-xs text-muted-foreground">Compartilhados</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-accent">{estatisticas.totalDownloads}</p>
                <p className="text-xs text-muted-foreground">Downloads</p>
              </div>
            </div>
          </div>

          {/* Tipo de Relatório */}
          <div className="space-y-2">
            <Label>Tipo de Relatório</Label>
            <Select value={formData.tipoRelatorio} onValueChange={(value) => setFormData(prev => ({ ...prev, tipoRelatorio: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo de relatório" />
              </SelectTrigger>
              <SelectContent>
                {tiposRelatorio.map((tipo) => (
                  <SelectItem key={tipo.value} value={tipo.value}>
                    <div>
                      <p className="font-medium">{tipo.label}</p>
                      <p className="text-xs text-muted-foreground">{tipo.description}</p>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Formato */}
          <div className="space-y-2">
            <Label>Formato de Exportação</Label>
            <div className="flex gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="pdf"
                  checked={formData.formato === "pdf"}
                  onCheckedChange={() => setFormData(prev => ({ ...prev, formato: "pdf" }))}
                />
                <Label htmlFor="pdf" className="flex items-center gap-2">
                  <File className="w-4 h-4 text-red-500" />
                  PDF
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="excel"
                  checked={formData.formato === "excel"}
                  onCheckedChange={() => setFormData(prev => ({ ...prev, formato: "excel" }))}
                />
                <Label htmlFor="excel" className="flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4 text-green-600" />
                  Excel
                </Label>
              </div>
            </div>
          </div>

          {/* Período */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Período (Opcional)
            </Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dataInicio" className="text-sm">Data Início</Label>
                <Input
                  id="dataInicio"
                  type="date"
                  value={formData.dataInicio}
                  onChange={(e) => setFormData(prev => ({ ...prev, dataInicio: e.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dataFim" className="text-sm">Data Fim</Label>
                <Input
                  id="dataFim"
                  type="date"
                  value={formData.dataFim}
                  onChange={(e) => setFormData(prev => ({ ...prev, dataFim: e.target.value }))}
                />
              </div>
            </div>
          </div>

          {/* Categorias */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Categorias (Deixe vazio para incluir todas)
            </Label>
            <div className="grid grid-cols-2 gap-2">
              {categorias.map((categoria) => (
                <div key={categoria} className="flex items-center space-x-2">
                  <Checkbox
                    id={categoria}
                    checked={formData.categorias.includes(categoria)}
                    onCheckedChange={(checked) => handleCategoriaChange(categoria, checked as boolean)}
                  />
                  <Label htmlFor={categoria}>{categoria}</Label>
                </div>
              ))}
            </div>
            {formData.categorias.length > 0 && (
              <div className="flex gap-1 flex-wrap mt-2">
                {formData.categorias.map(categoria => (
                  <Badge key={categoria} variant="secondary">{categoria}</Badge>
                ))}
              </div>
            )}
          </div>

          {/* Opções Adicionais */}
          <div className="space-y-2">
            <Label>Incluir no Relatório</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="incluirVencidos"
                  checked={formData.incluirVencidos}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, incluirVencidos: checked as boolean }))}
                />
                <Label htmlFor="incluirVencidos">Documentos vencidos</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="incluirCompartilhados"
                  checked={formData.incluirCompartilhados}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, incluirCompartilhados: checked as boolean }))}
                />
                <Label htmlFor="incluirCompartilhados">Status de compartilhamento</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="incluirDownloads"
                  checked={formData.incluirDownloads}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, incluirDownloads: checked as boolean }))}
                />
                <Label htmlFor="incluirDownloads">Histórico de downloads</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="incluirHistorico"
                  checked={formData.incluirHistorico}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, incluirHistorico: checked as boolean }))}
                />
                <Label htmlFor="incluirHistorico">Histórico de alterações</Label>
              </div>
            </div>
          </div>

          {/* Agrupamento */}
          <div className="space-y-2">
            <Label>Agrupar Por</Label>
            <Select value={formData.agruparPor} onValueChange={(value) => setFormData(prev => ({ ...prev, agruparPor: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Selecione o agrupamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="categoria">Categoria</SelectItem>
                <SelectItem value="data">Data de Upload</SelectItem>
                <SelectItem value="responsavel">Responsável</SelectItem>
                <SelectItem value="status">Status</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Botões */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button onClick={handleGenerate} className="gap-2">
              <Download className="w-4 h-4" />
              Gerar Relatório
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RelatorioDocumentosModal;