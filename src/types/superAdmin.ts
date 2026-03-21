export type PermissoesModulos = {
  dashboard: boolean;
  analytics: boolean;
  tarefasDiarias: boolean;
  manutencoes: boolean;
  agendaSindico: boolean;
  funcionarios: boolean;
  equipamentos: boolean;
  seguranca: boolean;
  financeiro: boolean;
  cobranca: boolean;
  inadimplencia: boolean;
  integracaoBancaria: boolean;
  moradores: boolean;
  reservas: boolean;
  assembleias: boolean;
  contratos: boolean;
  fornecedores: boolean;
  documentos: boolean;
  patrimonio: boolean;
  certificacoes: boolean;
  atendimento: boolean;
  whatsapp: boolean;
  comunicados: boolean;
  chatIA: boolean;
  automacao: boolean;
  alertas: boolean;
  relatorios: boolean;
  configuracoes: boolean;
};

export const moduloLabels: Record<keyof PermissoesModulos, string> = {
  dashboard: "Dashboard",
  analytics: "Analytics",
  tarefasDiarias: "Tarefas Diárias",
  manutencoes: "Manutenções",
  agendaSindico: "Agenda Síndico",
  funcionarios: "Funcionários",
  equipamentos: "Equipamentos",
  seguranca: "Segurança",
  financeiro: "Financeiro",
  cobranca: "Cobrança",
  inadimplencia: "Inadimplência",
  integracaoBancaria: "Integração Bancária",
  moradores: "Moradores",
  reservas: "Reservas",
  assembleias: "Assembleias",
  contratos: "Contratos",
  fornecedores: "Fornecedores",
  documentos: "Documentos",
  patrimonio: "Patrimônio",
  certificacoes: "Certificações",
  atendimento: "Atendimento",
  whatsapp: "WhatsApp",
  comunicados: "Comunicados",
  chatIA: "Chat IA",
  automacao: "Automação",
  alertas: "Alertas",
  relatorios: "Relatórios",
  configuracoes: "Configurações",
};

export const modulosCategorias = {
  "Gestão Geral": ["dashboard", "analytics"] as (keyof PermissoesModulos)[],
  "Gestão do Síndico": ["tarefasDiarias", "manutencoes", "agendaSindico", "funcionarios", "equipamentos", "seguranca"] as (keyof PermissoesModulos)[],
  "Gestão Financeira": ["financeiro", "cobranca", "inadimplencia", "integracaoBancaria"] as (keyof PermissoesModulos)[],
  "Gestão Operacional": ["moradores", "reservas", "assembleias", "contratos", "fornecedores", "documentos", "patrimonio", "certificacoes"] as (keyof PermissoesModulos)[],
  "Comunicação": ["atendimento", "whatsapp", "comunicados", "chatIA"] as (keyof PermissoesModulos)[],
  "Automação": ["automacao", "alertas", "relatorios", "configuracoes"] as (keyof PermissoesModulos)[],
};

export type PlanoTipo = "administradora" | "sindico";
export type PlanoNome = "Básico" | "Profissional" | "Enterprise";
export type StatusCliente = "ativo" | "suspenso" | "trial" | "cancelado";
export type StatusPagamento = "pago" | "pendente" | "atrasado";

export interface Plano {
  id: string;
  nome: PlanoNome;
  precoMensal: number;
  precoAnual: number;
  tipo: PlanoTipo;
  modulosInclusos: PermissoesModulos;
  limiteCondominios: number;
  limiteSindicos: number;
  limiteMoradores: number;
  limiteUsuarios: number;
  status: "ativo" | "inativo";
}

export interface Administradora {
  id: string;
  razaoSocial: string;
  nomeFantasia: string;
  cnpj: string;
  inscricaoEstadual: string;
  responsavel: { nome: string; cpf: string; cargo: string };
  contato: { email: string; telefone: string; whatsapp: string };
  endereco: { cep: string; rua: string; numero: string; complemento: string; bairro: string; cidade: string; estado: string };
  planoId: string;
  planoNome: PlanoNome;
  modulosLiberados: PermissoesModulos;
  limiteCondominios: number;
  limiteSindicos: number;
  sindicosVinculados: number;
  condominiosGerenciados: number;
  status: StatusCliente;
  dataCadastro: string;
  dataVencimento: string;
}

export interface Sindico {
  id: string;
  nome: string;
  cpf: string;
  rg: string;
  dataNascimento: string;
  contato: { email: string; telefone: string; whatsapp: string };
  endereco: { cep: string; rua: string; numero: string; complemento: string; bairro: string; cidade: string; estado: string };
  tipo: "independente" | "vinculado";
  administradoraId?: string;
  administradoraNome?: string;
  condominios: string[];
  planoId?: string;
  planoNome?: PlanoNome;
  modulosLiberados?: PermissoesModulos;
  status: StatusCliente;
  dataCadastro: string;
  dataVencimento?: string;
}

export interface Pagamento {
  id: string;
  clienteId: string;
  clienteNome: string;
  clienteTipo: "administradora" | "sindico";
  planoNome: PlanoNome;
  valor: number;
  status: StatusPagamento;
  dataVencimento: string;
  dataPagamento?: string;
}

export interface AtividadeRecente {
  id: string;
  tipo: "cadastro" | "upgrade" | "pagamento" | "inadimplencia" | "suspensao";
  descricao: string;
  data: string;
}

export const allModulosTrue: PermissoesModulos = {
  dashboard: true, analytics: true, tarefasDiarias: true, manutencoes: true,
  agendaSindico: true, funcionarios: true, equipamentos: true, seguranca: true,
  financeiro: true, cobranca: true, inadimplencia: true, integracaoBancaria: true,
  moradores: true, reservas: true, assembleias: true, contratos: true,
  fornecedores: true, documentos: true, patrimonio: true, certificacoes: true,
  atendimento: true, whatsapp: true, comunicados: true, chatIA: true,
  automacao: true, alertas: true, relatorios: true, configuracoes: true,
};

export const modulosBasico: PermissoesModulos = {
  dashboard: true, analytics: false, tarefasDiarias: true, manutencoes: true,
  agendaSindico: true, funcionarios: false, equipamentos: false, seguranca: false,
  financeiro: true, cobranca: true, inadimplencia: false, integracaoBancaria: false,
  moradores: true, reservas: true, assembleias: true, contratos: false,
  fornecedores: false, documentos: true, patrimonio: false, certificacoes: false,
  atendimento: true, whatsapp: false, comunicados: true, chatIA: false,
  automacao: false, alertas: true, relatorios: false, configuracoes: true,
};

export const modulosProfissional: PermissoesModulos = {
  dashboard: true, analytics: true, tarefasDiarias: true, manutencoes: true,
  agendaSindico: true, funcionarios: true, equipamentos: true, seguranca: true,
  financeiro: true, cobranca: true, inadimplencia: true, integracaoBancaria: false,
  moradores: true, reservas: true, assembleias: true, contratos: true,
  fornecedores: true, documentos: true, patrimonio: true, certificacoes: true,
  atendimento: true, whatsapp: true, comunicados: true, chatIA: false,
  automacao: true, alertas: true, relatorios: true, configuracoes: true,
};
