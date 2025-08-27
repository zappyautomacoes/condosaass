import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, X, Plus, Package, Camera, FileText } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface NovoPatrimonioModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NovoPatrimonioModal = ({ open, onOpenChange }: NovoPatrimonioModalProps) => {
  const { toast } = useToast();
  const [fotos, setFotos] = useState<File[]>([]);
  const [documentos, setDocumentos] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    nome: "",
    numeroPlaqueta: "",
    localFisico: "",
    categoria: "",
    dataAtribuicao: "",
    situacao: "",
    valor: "",
    status: "",
    fornecedor: "",
    garantia: "",
    observacoes: ""
  });

  const handleFotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (fotos.length + files.length > 5) {
      toast({
        title: "Limite excedido",
        description: "Máximo de 5 fotos por item",
        variant: "destructive",
      });
      return;
    }
    setFotos([...fotos, ...files]);
  };

  const handleDocumentoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const pdfFiles = files.filter(file => file.type === 'application/pdf');
    if (pdfFiles.length !== files.length) {
      toast({
        title: "Formato inválido",
        description: "Apenas arquivos PDF são permitidos",
        variant: "destructive",
      });
    }
    setDocumentos([...documentos, ...pdfFiles]);
  };

  const removeFoto = (index: number) => {
    setFotos(fotos.filter((_, i) => i !== index));
  };

  const removeDocumento = (index: number) => {
    setDocumentos(documentos.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.nome || !formData.numeroPlaqueta || !formData.localFisico) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }

    // Aqui seria feita a integração com o banco de dados
    console.log('Cadastrando patrimônio:', { formData, fotos, documentos });
    
    toast({
      title: "Item cadastrado",
      description: "Item adicionado ao inventário com sucesso",
    });
    
    // Reset form
    setFormData({
      nome: "",
      numeroPlaqueta: "",
      localFisico: "",
      categoria: "",
      dataAtribuicao: "",
      situacao: "",
      valor: "",
      status: "",
      fornecedor: "",
      garantia: "",
      observacoes: ""
    });
    setFotos([]);
    setDocumentos([]);
    
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            Cadastrar Item do Inventário
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome do Objeto *</Label>
              <Input
                id="nome"
                value={formData.nome}
                onChange={(e) => setFormData({...formData, nome: e.target.value})}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="numeroPlaqueta">Número da Plaqueta *</Label>
              <Input
                id="numeroPlaqueta"
                value={formData.numeroPlaqueta}
                onChange={(e) => setFormData({...formData, numeroPlaqueta: e.target.value})}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="localFisico">Local do Objeto *</Label>
              <Input
                id="localFisico"
                value={formData.localFisico}
                onChange={(e) => setFormData({...formData, localFisico: e.target.value})}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dataAtribuicao">Data de Atribuição da Plaqueta</Label>
              <Input
                id="dataAtribuicao"
                type="date"
                value={formData.dataAtribuicao}
                onChange={(e) => setFormData({...formData, dataAtribuicao: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="categoria">Categoria</Label>
              <Select value={formData.categoria} onValueChange={(value) => setFormData({...formData, categoria: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a categoria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Eletrônicos">Eletrônicos</SelectItem>
                  <SelectItem value="Equipamentos">Equipamentos</SelectItem>
                  <SelectItem value="Móveis">Móveis</SelectItem>
                  <SelectItem value="Ferramentas">Ferramentas</SelectItem>
                  <SelectItem value="Veículos">Veículos</SelectItem>
                  <SelectItem value="Outros">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="situacao">Situação</Label>
              <Select value={formData.situacao} onValueChange={(value) => setFormData({...formData, situacao: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a situação" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Novo">Novo</SelectItem>
                  <SelectItem value="Seminovo">Seminovo</SelectItem>
                  <SelectItem value="Reformado">Reformado</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="valor">Valor de Aquisição (R$)</Label>
              <Input
                id="valor"
                type="number"
                step="0.01"
                value={formData.valor}
                onChange={(e) => setFormData({...formData, valor: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({...formData, status: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ativo">Ativo em bom uso</SelectItem>
                  <SelectItem value="manutencao">Em manutenção</SelectItem>
                  <SelectItem value="baixado">Quebrado para baixa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fornecedor">Fornecedor</Label>
              <Input
                id="fornecedor"
                value={formData.fornecedor}
                onChange={(e) => setFormData({...formData, fornecedor: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="garantia">Garantia</Label>
              <Input
                id="garantia"
                value={formData.garantia}
                onChange={(e) => setFormData({...formData, garantia: e.target.value})}
                placeholder="Ex: 12 meses"
              />
            </div>
          </div>

          {/* Upload de Fotos */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold flex items-center gap-2">
              <Camera className="w-5 h-5" />
              Fotos do Item
            </h4>
            
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 px-4 py-2 border border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                <Plus className="w-4 h-4" />
                <span className="text-sm">Adicionar Fotos</span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFotoUpload}
                  className="hidden"
                />
              </label>
              <span className="text-sm text-muted-foreground">
                {fotos.length}/5 fotos
              </span>
            </div>

            {fotos.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {fotos.map((foto, index) => (
                  <div key={index} className="relative">
                    <div className="aspect-square bg-muted/30 rounded-lg flex items-center justify-center border border-border/50">
                      <Camera className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFoto(index)}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center hover:bg-destructive/80"
                    >
                      <X className="w-3 h-3" />
                    </button>
                    <p className="text-xs text-center mt-1 text-muted-foreground truncate">
                      {foto.name}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Upload de Documentos */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Documentos
            </h4>
            
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 px-4 py-2 border border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                <Upload className="w-4 h-4" />
                <span className="text-sm">Upload PDFs</span>
                <input
                  type="file"
                  multiple
                  accept=".pdf"
                  onChange={handleDocumentoUpload}
                  className="hidden"
                />
              </label>
            </div>

            {documentos.length > 0 && (
              <div className="space-y-2">
                {documentos.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border/50">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      <div>
                        <p className="text-sm font-medium">{doc.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {(doc.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeDocumento(index)}
                      className="text-destructive hover:text-destructive/80"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Observações */}
          <div className="space-y-2">
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea
              id="observacoes"
              value={formData.observacoes}
              onChange={(e) => setFormData({...formData, observacoes: e.target.value})}
              placeholder="Informações adicionais sobre o item..."
              rows={3}
            />
          </div>

          {/* Botões */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" type="button" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              Cadastrar Item
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );

};

export default NovoPatrimonioModal;