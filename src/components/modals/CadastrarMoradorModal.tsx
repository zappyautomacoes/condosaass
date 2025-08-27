import { useState } from "react";
import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { Plus, X, Upload, User, FileText, Users, PawPrint } from "lucide-react";

interface CadastrarMoradorModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMoradorCreated?: (morador: any) => void;
}

interface Dependente {
  id: string;
  nome: string;
  idade: string;
  parentesco: string;
}

interface Pet {
  id: string;
  nome: string;
  especie: string;
  raca: string;
  registro: string;
}

export const CadastrarMoradorModal = ({ open, onOpenChange, onMoradorCreated }: CadastrarMoradorModalProps) => {
  const { toast } = useToast();
  const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm();
  
  const [dependentes, setDependentes] = useState<Dependente[]>([]);
  const [pets, setPets] = useState<Pet[]>([]);
  const [documentos, setDocumentos] = useState<File[]>([]);
  const [foto, setFoto] = useState<File | null>(null);

  const watchedTipo = watch("tipo");

  const adicionarDependente = () => {
    const novoDependente: Dependente = {
      id: Date.now().toString(),
      nome: "",
      idade: "",
      parentesco: ""
    };
    setDependentes([...dependentes, novoDependente]);
  };

  const removerDependente = (id: string) => {
    setDependentes(dependentes.filter(dep => dep.id !== id));
  };

  const atualizarDependente = (id: string, campo: string, valor: string) => {
    setDependentes(dependentes.map(dep => 
      dep.id === id ? { ...dep, [campo]: valor } : dep
    ));
  };

  const adicionarPet = () => {
    const novoPet: Pet = {
      id: Date.now().toString(),
      nome: "",
      especie: "",
      raca: "",
      registro: ""
    };
    setPets([...pets, novoPet]);
  };

  const removerPet = (id: string) => {
    setPets(pets.filter(pet => pet.id !== id));
  };

  const atualizarPet = (id: string, campo: string, valor: string) => {
    setPets(pets.map(pet => 
      pet.id === id ? { ...pet, [campo]: valor } : pet
    ));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, tipo: 'documento' | 'foto') => {
    const files = event.target.files;
    if (files) {
      if (tipo === 'documento') {
        setDocumentos([...documentos, ...Array.from(files)]);
      } else if (files[0]) {
        setFoto(files[0]);
      }
    }
  };

  const removerDocumento = (index: number) => {
    setDocumentos(documentos.filter((_, i) => i !== index));
  };

  const onSubmit = (data: any) => {
    const novoMorador = {
      id: Date.now(),
      ...data,
      dependentes,
      pets,
      documentos: documentos.map(doc => doc.name),
      foto: foto?.name,
      dataCadastro: new Date().toISOString(),
      ultimaAlteracao: new Date().toISOString(),
    };

    onMoradorCreated?.(novoMorador);
    
    toast({
      title: "Morador cadastrado!",
      description: `${data.nome} foi cadastrado com sucesso.`,
    });
    
    // Reset form
    reset();
    setDependentes([]);
    setPets([]);
    setDocumentos([]);
    setFoto(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            Cadastrar Novo Morador
          </DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[70vh] pr-4">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Tabs defaultValue="pessoais" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="pessoais">Dados Pessoais</TabsTrigger>
                <TabsTrigger value="endereco">Endereço</TabsTrigger>
                <TabsTrigger value="familia">Família</TabsTrigger>
                <TabsTrigger value="documentos">Documentos</TabsTrigger>
              </TabsList>

              <TabsContent value="pessoais" className="space-y-4 mt-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome Completo *</Label>
                    <Input
                      id="nome"
                      {...register("nome", { required: "Nome é obrigatório" })}
                      placeholder="Nome completo do morador"
                    />
                    {errors.nome && <span className="text-sm text-destructive">{String(errors.nome.message)}</span>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cpf">CPF *</Label>
                    <Input
                      id="cpf"
                      {...register("cpf", { required: "CPF é obrigatório" })}
                      placeholder="000.000.000-00"
                    />
                    {errors.cpf && <span className="text-sm text-destructive">{String(errors.cpf.message)}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rg">RG</Label>
                    <Input
                      id="rg"
                      {...register("rg")}
                      placeholder="00.000.000-0"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dataNascimento">Data de Nascimento</Label>
                    <Input
                      id="dataNascimento"
                      type="date"
                      {...register("dataNascimento")}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="estadoCivil">Estado Civil</Label>
                    <Select onValueChange={(value) => setValue("estadoCivil", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="solteiro">Solteiro(a)</SelectItem>
                        <SelectItem value="casado">Casado(a)</SelectItem>
                        <SelectItem value="divorciado">Divorciado(a)</SelectItem>
                        <SelectItem value="viuvo">Viúvo(a)</SelectItem>
                        <SelectItem value="uniao-estavel">União Estável</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="profissao">Profissão</Label>
                    <Input
                      id="profissao"
                      {...register("profissao")}
                      placeholder="Profissão do morador"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email", { required: "Email é obrigatório" })}
                      placeholder="email@exemplo.com"
                    />
                    {errors.email && <span className="text-sm text-destructive">{String(errors.email.message)}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input
                      id="telefone"
                      {...register("telefone")}
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="whatsapp">WhatsApp</Label>
                    <Input
                      id="whatsapp"
                      {...register("whatsapp")}
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="foto">Foto do Morador</Label>
                  <div className="flex items-center gap-4">
                    <Input
                      id="foto"
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'foto')}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('foto')?.click()}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      {foto ? 'Alterar Foto' : 'Selecionar Foto'}
                    </Button>
                    {foto && <span className="text-sm text-muted-foreground">{foto.name}</span>}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="endereco" className="space-y-4 mt-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bloco">Bloco</Label>
                    <Select onValueChange={(value) => setValue("bloco", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Bloco" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A">Bloco A</SelectItem>
                        <SelectItem value="B">Bloco B</SelectItem>
                        <SelectItem value="C">Bloco C</SelectItem>
                        <SelectItem value="D">Bloco D</SelectItem>
                        <SelectItem value="E">Bloco E</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="apartamento">Apartamento/Unidade *</Label>
                    <Input
                      id="apartamento"
                      {...register("apartamento", { required: "Apartamento é obrigatório" })}
                      placeholder="Ex: Apt 301"
                    />
                    {errors.apartamento && <span className="text-sm text-destructive">{String(errors.apartamento.message)}</span>}
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="vagaGaragem">Vaga de Garagem</Label>
                    <Input
                      id="vagaGaragem"
                      {...register("vagaGaragem")}
                      placeholder="Ex: G-15"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tipo">Tipo *</Label>
                    <Select onValueChange={(value) => setValue("tipo", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="proprietario">Proprietário</SelectItem>
                        <SelectItem value="inquilino">Inquilino</SelectItem>
                        <SelectItem value="familiar">Familiar</SelectItem>
                        <SelectItem value="visitante">Visitante</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="dataEntrada">Data de Entrada</Label>
                    <Input
                      id="dataEntrada"
                      type="date"
                      {...register("dataEntrada")}
                    />
                  </div>
                </div>

                {watchedTipo === "inquilino" && (
                  <div className="space-y-2">
                    <Label htmlFor="dataSaida">Data de Saída (Prevista)</Label>
                    <Input
                      id="dataSaida"
                      type="date"
                      {...register("dataSaida")}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="status">Situação Atual</Label>
                  <Select onValueChange={(value) => setValue("status", value)} defaultValue="ativo">
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a situação" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ativo">Ativo</SelectItem>
                      <SelectItem value="inativo">Inativo</SelectItem>
                      <SelectItem value="transferido">Transferido</SelectItem>
                      <SelectItem value="pendente">Pendente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <TabsContent value="familia" className="space-y-6 mt-6">
                {/* Dependentes */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5 text-primary" />
                      <Label className="text-base font-semibold">Dependentes</Label>
                    </div>
                    <Button type="button" variant="outline" size="sm" onClick={adicionarDependente}>
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar Dependente
                    </Button>
                  </div>

                  {dependentes.map((dependente, index) => (
                    <div key={dependente.id} className="p-4 border border-border rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Dependente {index + 1}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removerDependente(dependente.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-3 gap-3">
                        <Input
                          placeholder="Nome completo"
                          value={dependente.nome}
                          onChange={(e) => atualizarDependente(dependente.id, "nome", e.target.value)}
                        />
                        <Input
                          placeholder="Idade"
                          type="number"
                          value={dependente.idade}
                          onChange={(e) => atualizarDependente(dependente.id, "idade", e.target.value)}
                        />
                        <Select
                          value={dependente.parentesco}
                          onValueChange={(value) => atualizarDependente(dependente.id, "parentesco", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Parentesco" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="conjuge">Cônjuge</SelectItem>
                            <SelectItem value="filho">Filho(a)</SelectItem>
                            <SelectItem value="pai">Pai</SelectItem>
                            <SelectItem value="mae">Mãe</SelectItem>
                            <SelectItem value="irmao">Irmão(ã)</SelectItem>
                            <SelectItem value="avo">Avô(ó)</SelectItem>
                            <SelectItem value="outro">Outro</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Pets */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <PawPrint className="w-5 h-5 text-primary" />
                      <Label className="text-base font-semibold">Pets</Label>
                    </div>
                    <Button type="button" variant="outline" size="sm" onClick={adicionarPet}>
                      <Plus className="w-4 h-4 mr-2" />
                      Adicionar Pet
                    </Button>
                  </div>

                  {pets.map((pet, index) => (
                    <div key={pet.id} className="p-4 border border-border rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Pet {index + 1}</span>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removerPet(pet.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <Input
                          placeholder="Nome do pet"
                          value={pet.nome}
                          onChange={(e) => atualizarPet(pet.id, "nome", e.target.value)}
                        />
                        <Select
                          value={pet.especie}
                          onValueChange={(value) => atualizarPet(pet.id, "especie", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Espécie" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="cao">Cão</SelectItem>
                            <SelectItem value="gato">Gato</SelectItem>
                            <SelectItem value="passaro">Pássaro</SelectItem>
                            <SelectItem value="peixe">Peixe</SelectItem>
                            <SelectItem value="outros">Outros</SelectItem>
                          </SelectContent>
                        </Select>
                        <Input
                          placeholder="Raça"
                          value={pet.raca}
                          onChange={(e) => atualizarPet(pet.id, "raca", e.target.value)}
                        />
                        <Input
                          placeholder="Nº Registro (RGA)"
                          value={pet.registro}
                          onChange={(e) => atualizarPet(pet.id, "registro", e.target.value)}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="documentos" className="space-y-6 mt-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    <Label className="text-base font-semibold">Upload de Documentos</Label>
                  </div>

                  <div className="space-y-2">
                    <Input
                      id="documentos"
                      type="file"
                      multiple
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload(e, 'documento')}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('documentos')?.click()}
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Adicionar Documentos
                    </Button>
                    <p className="text-sm text-muted-foreground">
                      Aceita arquivos PDF, JPG, JPEG, PNG. Ex: RG, CPF, Contrato de Locação/Compra
                    </p>
                  </div>

                  {documentos.length > 0 && (
                    <div className="space-y-2">
                      <Label>Documentos Selecionados:</Label>
                      <div className="space-y-2">
                        {documentos.map((doc, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-muted/20 rounded">
                            <span className="text-sm">{doc.name}</span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => removerDocumento(index)}
                            >
                              <X className="w-4 h-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <Separator />

                <div className="space-y-4">
                  <Label className="text-base font-semibold">Restrições</Label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="inadimplencia" onCheckedChange={(checked) => setValue("restricaoInadimplencia", checked)} />
                      <Label htmlFor="inadimplencia">Inadimplência</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="advertencias" onCheckedChange={(checked) => setValue("restricaoAdvertencias", checked)} />
                      <Label htmlFor="advertencias">Advertências</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="multas" onCheckedChange={(checked) => setValue("restricaoMultas", checked)} />
                      <Label htmlFor="multas">Multas Aplicadas</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="observacoes">Observações Adicionais</Label>
                  <Textarea
                    id="observacoes"
                    {...register("observacoes")}
                    placeholder="Informações adicionais sobre o morador..."
                    rows={4}
                  />
                </div>
              </TabsContent>
            </Tabs>

            <div className="flex justify-end gap-3 pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button type="submit" className="bg-gradient-primary text-primary-foreground">
                Cadastrar Morador
              </Button>
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};