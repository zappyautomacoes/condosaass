import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Upload, Calendar, RotateCcw, History } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Documento } from "@/contexts/DataContext";

interface RenovarDocumentoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  documento: Documento | null;
}

const RenovarDocumentoModal = ({ open, onOpenChange, documento }: RenovarDocumentoModalProps) => {
  const { toast } = useToast();
  const [novoArquivo, setNovoArquivo] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    novaDataVencimento: "",
    motivoRenovacao: "",
    observacoes: ""
  });

  useEffect(() => {
    if (documento && open) {
      // Calcular nova data de vencimento (1 ano a partir de hoje)
      const hoje = new Date();
      const proximoAno = new Date(hoje);
      proximoAno.setFullYear(hoje.getFullYear() + 1);
      
      setFormData({
        novaDataVencimento: proximoAno.toISOString().split('T')[0],
        motivoRenovacao: "",
        observacoes: ""
      });
      setNovoArquivo(null);
    }
  }, [documento, open]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'application/pdf') {
        toast({
          title: "Formato inválido",
          description: "Apenas arquivos PDF são permitidos",
          variant: "destructive",
        });
        return;
      }
      setNovoArquivo(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.novaDataVencimento) {
      toast({
        title: "Campo obrigatório",
        description: "A nova data de vencimento é obrigatória",
        variant: "destructive",
      });
      return;
    }

    // Aqui seria feita a integração com o banco de dados
    console.log('Renovando documento:', { 
      id: documento?.id, 
      formData, 
      novoArquivo 
    });
    
    toast({
      title: "Documento renovado",
      description: `${documento?.nome} foi renovado com sucesso`,
    });
    
    onOpenChange(false);
  };

  if (!documento) return null;

  const historicoRenovacoes = [
    { data: "10/02/2023", dataVencimento: "10/02/2024", responsavel: "Maria Santos" },
    { data: "15/02/2022", dataVencimento: "15/02/2023", responsavel: "João Silva" }
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <RotateCcw className="w-5 h-5" />
            Renovar Documento
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações do Documento Atual */}
          <div className="bg-muted/30 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Documento Atual</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <FileText className="w-4 h-4" />
                <span className="font-medium">{documento.nome}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>
                  Vencimento atual: {documento.dataVencimento 
                    ? new Date(documento.dataVencimento).toLocaleDateString('pt-BR')
                    : 'Sem data de vencimento'
                  }
                </span>
              </div>
            </div>
          </div>

          {/* Nova Data de Vencimento */}
          <div className="space-y-2">
            <Label htmlFor="novaDataVencimento">Nova Data de Vencimento *</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="novaDataVencimento"
                type="date"
                value={formData.novaDataVencimento}
                onChange={(e) => setFormData({...formData, novaDataVencimento: e.target.value})}
                className="pl-10"
                required
              />
            </div>
          </div>

          {/* Substituir Arquivo (Opcional) */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Nova Versão do Documento (Opcional)
            </h4>
            
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 px-4 py-2 border border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                <Upload className="w-4 h-4" />
                <span className="text-sm">Escolher novo arquivo PDF</span>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {novoArquivo && (
              <div className="flex items-center gap-2 p-3 bg-success/10 rounded-lg border border-success/20">
                <FileText className="w-4 h-4 text-success" />
                <div>
                  <p className="text-sm font-medium text-success">Nova versão selecionada:</p>
                  <p className="text-xs text-muted-foreground">
                    {novoArquivo.name} • {(novoArquivo.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Motivo da Renovação */}
          <div className="space-y-2">
            <Label htmlFor="motivoRenovacao">Motivo da Renovação</Label>
            <Input
              id="motivoRenovacao"
              value={formData.motivoRenovacao}
              onChange={(e) => setFormData({...formData, motivoRenovacao: e.target.value})}
              placeholder="Ex: Renovação anual, Atualização de dados..."
            />
          </div>

          {/* Observações */}
          <div className="space-y-2">
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea
              id="observacoes"
              value={formData.observacoes}
              onChange={(e) => setFormData({...formData, observacoes: e.target.value})}
              placeholder="Observações sobre a renovação..."
              rows={3}
            />
          </div>

          {/* Histórico de Renovações */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold flex items-center gap-2">
              <History className="w-5 h-5" />
              Histórico de Renovações
            </h4>
            
            <div className="bg-muted/30 p-4 rounded-lg">
              {historicoRenovacoes.length > 0 ? (
                <div className="space-y-3">
                  {historicoRenovacoes.map((renovacao, index) => (
                    <div key={index} className="flex items-center justify-between pb-2 border-b border-border/50 last:border-b-0">
                      <div>
                        <p className="text-sm font-medium">
                          Renovado em {renovacao.data}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Por {renovacao.responsavel} • Vencimento: {renovacao.dataVencimento}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">Nenhuma renovação anterior registrada</p>
              )}
            </div>
          </div>

          {/* Botões */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              Renovar Documento
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default RenovarDocumentoModal;