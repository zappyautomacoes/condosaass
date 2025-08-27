import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Share, Plus, Trash2, Eye, Download, Edit, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Documento } from "@/contexts/DataContext";

interface GerenciarCompartilhamentoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  documento: Documento | null;
}

const GerenciarCompartilhamentoModal = ({ open, onOpenChange, documento }: GerenciarCompartilhamentoModalProps) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [novoUsuario, setNovoUsuario] = useState("");
  const [permissions, setPermissions] = useState<{[key: string]: string[]}>({});

  const usuariosDisponiveis = [
    { id: 1, nome: "João Silva", email: "joao@email.com", tipo: "Síndico", avatar: "" },
    { id: 2, nome: "Maria Santos", email: "maria@email.com", tipo: "Administradora", avatar: "" },
    { id: 3, nome: "Carlos Lima", email: "carlos@email.com", tipo: "Conselheiro", avatar: "" },
    { id: 4, nome: "Ana Costa", email: "ana@email.com", tipo: "Porteiro", avatar: "" }
  ];

  const usuariosComPartilhados = [
    { 
      id: 1, 
      nome: "João Silva", 
      email: "joao@email.com", 
      tipo: "Síndico", 
      avatar: "",
      permissoes: ["visualizar", "download", "editar"],
      dataCompartilhamento: "2024-01-15",
      ultimoAcesso: "2024-01-20"
    },
    { 
      id: 2, 
      nome: "Maria Santos", 
      email: "maria@email.com", 
      tipo: "Administradora", 
      avatar: "",
      permissoes: ["visualizar", "download"],
      dataCompartilhamento: "2024-01-18",
      ultimoAcesso: "2024-01-19"
    }
  ];

  useEffect(() => {
    if (documento && open) {
      // Inicializar permissões dos usuários existentes
      const initialPermissions: {[key: string]: string[]} = {};
      usuariosComPartilhados.forEach(user => {
        initialPermissions[user.id] = [...user.permissoes];
      });
      setPermissions(initialPermissions);
    }
  }, [documento, open]);

  const handlePermissionChange = (userId: number, permission: string, checked: boolean) => {
    setPermissions(prev => {
      const userPermissions = prev[userId] || [];
      if (checked) {
        return { ...prev, [userId]: [...userPermissions, permission] };
      } else {
        return { ...prev, [userId]: userPermissions.filter(p => p !== permission) };
      }
    });
  };

  const handleAddUser = (user: any) => {
    // Adicionar usuário à lista de compartilhados
    console.log('Adicionando usuário:', user.id);
    setPermissions(prev => ({
      ...prev,
      [user.id]: ["visualizar"]
    }));
    toast({
      title: "Usuário adicionado",
      description: `${user.nome} agora tem acesso ao documento`,
    });
  };

  const handleRemoveUser = (userId: number) => {
    // Remover usuário da lista de compartilhados
    console.log('Removendo usuário:', userId);
    setPermissions(prev => {
      const newPermissions = { ...prev };
      delete newPermissions[userId];
      return newPermissions;
    });
    toast({
      title: "Acesso removido",
      description: "Usuário removido da lista de compartilhamento",
    });
  };

  const getPermissionBadge = (permission: string) => {
    const configs = {
      visualizar: { label: "Visualizar", variant: "secondary" as const, icon: Eye },
      download: { label: "Download", variant: "outline" as const, icon: Download },
      editar: { label: "Editar", variant: "default" as const, icon: Edit }
    };
    
    const config = configs[permission as keyof typeof configs];
    const IconComponent = config.icon;
    
    return (
      <Badge key={permission} variant={config.variant} className="gap-1">
        <IconComponent className="w-3 h-3" />
        {config.label}
      </Badge>
    );
  };

  const handleSave = () => {
    // Aqui seria feita a integração com o banco de dados
    console.log('Salvando permissões:', permissions);
    
    toast({
      title: "Permissões atualizadas",
      description: "As configurações de compartilhamento foram salvas",
    });
    
    onOpenChange(false);
  };

  if (!documento) return null;

  const filteredUsuarios = usuariosDisponiveis.filter(user =>
    user.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.tipo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share className="w-5 h-5" />
            Gerenciar Compartilhamento - {documento.nome}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status do Documento */}
          <div className="bg-muted/30 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Status de Compartilhamento</h4>
                <p className="text-sm text-muted-foreground">
                  {documento.compartilhado ? 'Documento compartilhado' : 'Documento privado'}
                </p>
              </div>
              <Badge variant={documento.compartilhado ? "default" : "secondary"}>
                {documento.compartilhado ? 'Público' : 'Privado'}
              </Badge>
            </div>
          </div>

          {/* Usuários com Acesso */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Usuários com Acesso</h4>
            
            <div className="space-y-3">
              {usuariosComPartilhados.map((user) => (
                <div key={user.id} className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg">
                  <Avatar>
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.nome.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="font-medium">{user.nome}</p>
                        <p className="text-sm text-muted-foreground">{user.email} • {user.tipo}</p>
                      </div>
                      <div className="flex gap-2">
                        {(permissions[user.id] || user.permissoes).map(permission => 
                          getPermissionBadge(permission)
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div className="space-y-2">
                        <Label className="text-xs">Permissões</Label>
                        <div className="flex gap-4">
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id={`${user.id}-visualizar`}
                              checked={(permissions[user.id] || user.permissoes).includes("visualizar")}
                              onCheckedChange={(checked) => 
                                handlePermissionChange(user.id, "visualizar", checked as boolean)
                              }
                            />
                            <Label htmlFor={`${user.id}-visualizar`} className="text-xs">Visualizar</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id={`${user.id}-download`}
                              checked={(permissions[user.id] || user.permissoes).includes("download")}
                              onCheckedChange={(checked) => 
                                handlePermissionChange(user.id, "download", checked as boolean)
                              }
                            />
                            <Label htmlFor={`${user.id}-download`} className="text-xs">Download</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Checkbox 
                              id={`${user.id}-editar`}
                              checked={(permissions[user.id] || user.permissoes).includes("editar")}
                              onCheckedChange={(checked) => 
                                handlePermissionChange(user.id, "editar", checked as boolean)
                              }
                            />
                            <Label htmlFor={`${user.id}-editar`} className="text-xs">Editar</Label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-xs text-muted-foreground">
                        <p>Compartilhado: {new Date(user.dataCompartilhamento).toLocaleDateString('pt-BR')}</p>
                        <p>Último acesso: {new Date(user.ultimoAcesso).toLocaleDateString('pt-BR')}</p>
                      </div>
                      
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleRemoveUser(user.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Adicionar Novos Usuários */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Adicionar Usuários</h4>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar usuários para adicionar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {filteredUsuarios
                .filter(user => !usuariosComPartilhados.some(shared => shared.id === user.id))
                .map((user) => (
                <div key={user.id} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user.avatar} />
                      <AvatarFallback className="text-xs">
                        {user.nome.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{user.nome}</p>
                      <p className="text-xs text-muted-foreground">{user.email} • {user.tipo}</p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => handleAddUser(user)}>
                    <Plus className="w-4 h-4 mr-1" />
                    Adicionar
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Botões */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button onClick={handleSave}>
              Salvar Configurações
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GerenciarCompartilhamentoModal;