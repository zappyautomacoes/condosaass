import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Upload, FileText, X, Building, Phone, Mail, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NovoFornecedorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NovoFornecedorModal = ({ open, onOpenChange }: NovoFornecedorModalProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    nome: "",
    cnpj: "",
    contato: "",
    telefone: "",
    email: "",
    endereco: "",
    cep: "",
    cidade: "",
    estado: "",
    areaServico: "",
    observacoes: "",
    status: "ativo"
  });
  
  const [documentos, setDocumentos] = useState<File[]>([]);

  const areasServico = [
    "Manutenção de Elevadores",
    "Limpeza e Conservação",
    "Segurança e Portaria",
    "Jardinagem e Paisagismo",
    "Manutenção Predial",
    "Elétrica",
    "Hidráulica",
    "Pintura",
    "Outros"
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const validFiles = files.filter(file => {
      if (file.type !== "application/pdf") {
        toast({
          title: "Arquivo inválido",
          description: `${file.name} não é um arquivo PDF válido.`,
          variant: "destructive",
        });
        return false;
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB
        toast({
          title: "Arquivo muito grande",
          description: `${file.name} deve ter no máximo 10MB.`,
          variant: "destructive",
        });
        return false;
      }
      return true;
    });

    if (documentos.length + validFiles.length > 5) {
      toast({
        title: "Limite de arquivos",
        description: "Você pode enviar no máximo 5 documentos.",
        variant: "destructive",
      });
      return;
    }

    setDocumentos([...documentos, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setDocumentos(documentos.filter((_, i) => i !== index));
  };

  const formatCNPJ = (value: string) => {
    const cleanValue = value.replace(/\D/g, '');
    if (cleanValue.length <= 14) {
      return cleanValue.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }
    return value;
  };

  const formatPhone = (value: string) => {
    const cleanValue = value.replace(/\D/g, '');
    if (cleanValue.length <= 11) {
      return cleanValue.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  const formatCEP = (value: string) => {
    const cleanValue = value.replace(/\D/g, '');
    if (cleanValue.length <= 8) {
      return cleanValue.replace(/^(\d{5})(\d{3})/, '$1-$2');
    }
    return value;
  };

  const handleSubmit = () => {
    // Validações básicas
    if (!formData.nome || !formData.cnpj || !formData.contato || !formData.telefone || !formData.email) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Email inválido",
        description: "Por favor, insira um email válido.",
        variant: "destructive",
      });
      return;
    }

    // Simular salvamento
    console.log("Dados do fornecedor:", formData);
    console.log("Documentos:", documentos);

    toast({
      title: "Fornecedor cadastrado!",
      description: "O fornecedor foi cadastrado com sucesso.",
    });

    onOpenChange(false);
    // Reset form
    setFormData({
      nome: "",
      cnpj: "",
      contato: "",
      telefone: "",
      email: "",
      endereco: "",
      cep: "",
      cidade: "",
      estado: "",
      areaServico: "",
      observacoes: "",
      status: "ativo"
    });
    setDocumentos([]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building className="w-5 h-5" />
            Novo Fornecedor
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Coluna Esquerda - Dados da Empresa */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="nome">Nome da Empresa *</Label>
              <Input
                id="nome"
                placeholder="Ex: Elevadores Tech LTDA"
                value={formData.nome}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="cnpj">CNPJ *</Label>
              <Input
                id="cnpj"
                placeholder="00.000.000/0000-00"
                value={formData.cnpj}
                onChange={(e) => setFormData({ ...formData, cnpj: formatCNPJ(e.target.value) })}
                maxLength={18}
              />
            </div>

            <div>
              <Label htmlFor="contato">Nome do Contato *</Label>
              <Input
                id="contato"
                placeholder="Ex: João Santos"
                value={formData.contato}
                onChange={(e) => setFormData({ ...formData, contato: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="telefone">Telefone *</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="telefone"
                  placeholder="(11) 99999-8888"
                  className="pl-10"
                  value={formData.telefone}
                  onChange={(e) => setFormData({ ...formData, telefone: formatPhone(e.target.value) })}
                  maxLength={15}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="contato@empresa.com.br"
                  className="pl-10"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="areaServico">Área de Serviço</Label>
              <Select value={formData.areaServico} onValueChange={(value) => setFormData({ ...formData, areaServico: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a área de serviço" />
                </SelectTrigger>
                <SelectContent>
                  {areasServico.map((area) => (
                    <SelectItem key={area} value={area}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Coluna Direita - Endereço e Documentos */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="endereco">Endereço Completo</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Textarea
                  id="endereco"
                  placeholder="Rua, número, complemento, bairro"
                  className="pl-10"
                  value={formData.endereco}
                  onChange={(e) => setFormData({ ...formData, endereco: e.target.value })}
                  rows={3}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="cep">CEP</Label>
                <Input
                  id="cep"
                  placeholder="00000-000"
                  value={formData.cep}
                  onChange={(e) => setFormData({ ...formData, cep: formatCEP(e.target.value) })}
                  maxLength={9}
                />
              </div>
              <div>
                <Label htmlFor="estado">Estado</Label>
                <Input
                  id="estado"
                  placeholder="SP"
                  value={formData.estado}
                  onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                  maxLength={2}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="cidade">Cidade</Label>
              <Input
                id="cidade"
                placeholder="São Paulo"
                value={formData.cidade}
                onChange={(e) => setFormData({ ...formData, cidade: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ativo">Ativo</SelectItem>
                  <SelectItem value="inativo">Inativo</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Upload de Documentos */}
            <div className="p-4 bg-muted/30 rounded-lg">
              <Label className="text-sm font-medium mb-2 block">
                Documentos (Contrato Social, Certidões)
              </Label>
              
              {documentos.length === 0 ? (
                <div className="border-2 border-dashed border-border rounded-lg p-4 text-center">
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Selecione até 5 documentos em PDF
                  </p>
                  <input
                    type="file"
                    accept=".pdf"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                    id="docs-upload"
                  />
                  <Label htmlFor="docs-upload" className="cursor-pointer">
                    <Button type="button" variant="outline" size="sm">
                      Selecionar PDFs
                    </Button>
                  </Label>
                </div>
              ) : (
                <div className="space-y-2">
                  {documentos.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-success/10 border border-success/20 rounded-lg">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-success" />
                        <span className="text-sm font-medium">{file.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </Badge>
                      </div>
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(index)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                  
                  {documentos.length < 5 && (
                    <div className="mt-2">
                      <input
                        type="file"
                        accept=".pdf"
                        multiple
                        onChange={handleFileUpload}
                        className="hidden"
                        id="docs-upload-more"
                      />
                      <Label htmlFor="docs-upload-more" className="cursor-pointer">
                        <Button type="button" variant="outline" size="sm" className="w-full">
                          <Upload className="w-4 h-4 mr-2" />
                          Adicionar mais documentos
                        </Button>
                      </Label>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Observações - Largura Total */}
        <div className="mt-6">
          <Label htmlFor="observacoes">Observações</Label>
          <Textarea
            id="observacoes"
            placeholder="Observações adicionais sobre o fornecedor..."
            value={formData.observacoes}
            onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
            rows={3}
          />
        </div>

        {/* Botões de Ação */}
        <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            Cadastrar Fornecedor
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NovoFornecedorModal;