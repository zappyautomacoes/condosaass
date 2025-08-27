import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { FileText, Upload, Calendar } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Documento } from "@/contexts/DataContext";

interface EditarDocumentoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  documento: Documento | null;
}

const EditarDocumentoModal = ({ open, onOpenChange, documento }: EditarDocumentoModalProps) => {
  const { toast } = useToast();
  const [novoArquivo, setNovoArquivo] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    nome: "",
    categoria: "",
    dataVencimento: "",
    responsavel: "",
    descricao: "",
    tags: "",
    compartilhado: false
  });

  useEffect(() => {
    if (documento) {
      setFormData({
        nome: documento.nome,
        categoria: documento.categoria,
        dataVencimento: documento.dataVencimento || "",
        responsavel: documento.responsavel || "",
        descricao: documento.descricao || "",
        tags: documento.tags || "",
        compartilhado: documento.compartilhado
      });
      setNovoArquivo(null);
    }
  }, [documento]);

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
    
    if (!formData.nome) {
      toast({
        title: "Campo obrigatório",
        description: "O nome do documento é obrigatório",
        variant: "destructive",
      });
      return;
    }

    // Aqui seria feita a integração com o banco de dados
    console.log('Editando documento:', { 
      id: documento?.id, 
      formData, 
      novoArquivo 
    });
    
    toast({
      title: "Documento atualizado",
      description: "Metadados do documento atualizados com sucesso",
    });
    
    onOpenChange(false);
  };

  if (!documento) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Editar Documento
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Informações do Arquivo Atual */}
          <div className="bg-muted/30 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Arquivo Atual</h4>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <FileText className="w-4 h-4" />
              <span>{documento.nome}</span>
              <span>•</span>
              <span>{documento.tipo}</span>
              <span>•</span>
              <span>{documento.tamanho}</span>
            </div>
          </div>

          {/* Substituir Arquivo */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Substituir Arquivo (Opcional)
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
                  <p className="text-sm font-medium text-success">Novo arquivo selecionado:</p>
                  <p className="text-xs text-muted-foreground">
                    {novoArquivo.name} • {(novoArquivo.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Metadados */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome do Documento *</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => setFormData({...formData, nome: e.target.value})}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="categoria">Categoria</Label>
              <Select value={formData.categoria} onValueChange={(value) => setFormData({...formData, categoria: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Atas">Atas</SelectItem>
                  <SelectItem value="Licenças">Licenças</SelectItem>
                  <SelectItem value="Contratos">Contratos</SelectItem>
                  <SelectItem value="Seguros">Seguros</SelectItem>
                  <SelectItem value="Alvarás">Alvarás</SelectItem>
                  <SelectItem value="Outros">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dataVencimento">Data de Vencimento</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="dataVencimento"
                  type="date"
                  value={formData.dataVencimento}
                  onChange={(e) => setFormData({...formData, dataVencimento: e.target.value})}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="responsavel">Responsável</Label>
              <Input
                id="responsavel"
                value={formData.responsavel}
                onChange={(e) => setFormData({...formData, responsavel: e.target.value})}
                placeholder="Nome do responsável"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags</Label>
            <Input
              id="tags"
              value={formData.tags}
              onChange={(e) => setFormData({...formData, tags: e.target.value})}
              placeholder="Tags separadas por vírgula"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição</Label>
            <Textarea
              id="descricao"
              value={formData.descricao}
              onChange={(e) => setFormData({...formData, descricao: e.target.value})}
              placeholder="Descrição do documento..."
              rows={3}
            />
          </div>

          {/* Configurações de Compartilhamento */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Configurações de Compartilhamento</h4>
            
            <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
              <div className="space-y-1">
                <Label htmlFor="compartilhado">Documento Compartilhado</Label>
                <p className="text-sm text-muted-foreground">
                  Permitir que outros usuários visualizem este documento
                </p>
              </div>
              <Switch
                id="compartilhado"
                checked={formData.compartilhado}
                onCheckedChange={(checked) => setFormData({...formData, compartilhado: checked})}
              />
            </div>
          </div>

          {/* Botões */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              Salvar Alterações
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditarDocumentoModal;