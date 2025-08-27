import React, { createContext, useContext, useReducer, ReactNode } from 'react';

// Tipos de dados
export interface Fornecedor {
  id: number;
  nome: string;
  cnpj: string;
  contato: string;
  telefone: string;
  email: string;
  endereco: string;
  cep?: string;
  cidade?: string;
  estado?: string;
  areaServico: string;
  avaliacaoMedia: number;
  totalServicos: number;
  valorTotal: number;
  ultimoServico: string;
  status: 'ativo' | 'inativo';
  observacoes?: string;
  documentos?: string[];
}

export interface Contrato {
  id: number;
  numero: string;
  titulo: string;
  fornecedor: string;
  servico: string;
  tipoServico?: string;
  dataInicio: string;
  dataTermino: string;
  valor: number;
  status: 'ativo' | 'vencendo' | 'vencido' | 'suspenso';
  diasParaVencer: number;
  responsavel: string;
  observacoes?: string;
  alertaRenovacao?: boolean;
  diasAntecedencia?: string;
  arquivoPDF?: string;
}

export interface Documento {
  id: number;
  nome: string;
  categoria: string;
  tipo: string;
  tamanho: string;
  dataUpload: string;
  dataVencimento?: string;
  uploadedBy: string;
  status: 'ativo' | 'vencendo' | 'vencido';
  compartilhado: boolean;
  downloads: number;
  responsavel?: string;
  descricao?: string;
  tags?: string;
  arquivoPDF?: string;
}

export interface PatrimonioItem {
  id: number;
  nome: string;
  categoria: string;
  numeroPlaqueta: string;
  localFisico: string;
  dataAquisicao: string;
  valorAquisicao: number;
  fornecedor: string;
  status: 'ativo' | 'manutencao' | 'baixado';
  ultimaManutencao?: string;
  proximaManutencao?: string;
  garantia?: string;
  observacoes?: string;
  fotos?: string[];
  documentos?: string[];
}

export interface Certificacao {
  id: number;
  tipo: string;
  categoria: string;
  orgaoEmissor: string;
  numeroDocumento: string;
  dataEmissao: string;
  dataVencimento: string;
  status: 'ativo' | 'vencendo' | 'vencido';
  diasParaVencer: number;
  valorRenovacao: number;
  responsavel: string;
  observacoes?: string;
  alertaRenovacao?: boolean;
  diasAntecedencia?: string;
  arquivoPDF?: string;
}

export interface Equipamento {
  id: number;
  nome: string;
  tipo: 'extintor' | 'alarme' | 'luz_emergencia' | 'porta_corta_fogo' | 'outro';
  localInstalacao: string;
  dataInstalacao: string;
  ultimaManutencao?: string;
  proximaManutencao?: string;
  situacao: 'ativo' | 'manutencao' | 'inativo';
  documentos?: string[];
  fotos?: string[];
  observacoes?: string;
  responsavel?: string;
  fornecedor?: string;
  numeroSerie?: string;
  garantia?: string;
}

export interface Manutencao {
  id: number;
  equipamentoId: number;
  tipo: 'preventiva' | 'corretiva' | 'preditiva' | 'emergencial';
  dataAgendada: string;
  dataRealizada?: string;
  responsavel: string;
  fornecedor?: string;
  custo?: number;
  observacoes?: string;
  status: 'agendada' | 'concluida' | 'cancelada';
  descricao?: string;
}

// Estado global
interface DataState {
  fornecedores: Fornecedor[];
  contratos: Contrato[];
  documentos: Documento[];
  patrimonio: PatrimonioItem[];
  certificacoes: Certificacao[];
  equipamentos: Equipamento[];
  manutencoes: Manutencao[];
}

// Ações
type DataAction =
  | { type: 'ADD_FORNECEDOR'; payload: Fornecedor }
  | { type: 'UPDATE_FORNECEDOR'; payload: Fornecedor }
  | { type: 'DELETE_FORNECEDOR'; payload: number }
  | { type: 'ADD_CONTRATO'; payload: Contrato }
  | { type: 'UPDATE_CONTRATO'; payload: Contrato }
  | { type: 'DELETE_CONTRATO'; payload: number }
  | { type: 'ADD_DOCUMENTO'; payload: Documento }
  | { type: 'UPDATE_DOCUMENTO'; payload: Documento }
  | { type: 'DELETE_DOCUMENTO'; payload: number }
  | { type: 'ADD_PATRIMONIO'; payload: PatrimonioItem }
  | { type: 'UPDATE_PATRIMONIO'; payload: PatrimonioItem }
  | { type: 'DELETE_PATRIMONIO'; payload: number }
  | { type: 'ADD_CERTIFICACAO'; payload: Certificacao }
  | { type: 'UPDATE_CERTIFICACAO'; payload: Certificacao }
  | { type: 'DELETE_CERTIFICACAO'; payload: number }
  | { type: 'ADD_EQUIPAMENTO'; payload: Equipamento }
  | { type: 'UPDATE_EQUIPAMENTO'; payload: Equipamento }
  | { type: 'DELETE_EQUIPAMENTO'; payload: number }
  | { type: 'ADD_MANUTENCAO'; payload: Manutencao }
  | { type: 'UPDATE_MANUTENCAO'; payload: Manutencao }
  | { type: 'DELETE_MANUTENCAO'; payload: number };

// Estado inicial com dados mock
const initialState: DataState = {
  fornecedores: [
    {
      id: 1,
      nome: "Elevadores Tech LTDA",
      cnpj: "12.345.678/0001-90",
      contato: "João Santos",
      telefone: "(11) 9999-8888",
      email: "contato@elevadorestech.com.br",
      endereco: "Rua das Flores, 123 - São Paulo/SP",
      areaServico: "Manutenção de Elevadores",
      avaliacaoMedia: 4.8,
      totalServicos: 15,
      valorTotal: 45000,
      ultimoServico: "2024-08-15",
      status: "ativo"
    },
    {
      id: 2,
      nome: "Limpeza Total S.A.",
      cnpj: "98.765.432/0001-10",
      contato: "Maria Silva",
      telefone: "(11) 8888-7777",
      email: "maria@limpezatotal.com.br",
      endereco: "Av. Principal, 456 - São Paulo/SP",
      areaServico: "Limpeza e Conservação",
      avaliacaoMedia: 4.5,
      totalServicos: 8,
      valorTotal: 25000,
      ultimoServico: "2024-08-20",
      status: "ativo"
    },
    {
      id: 3,
      nome: "Segurança Plus",
      cnpj: "11.222.333/0001-44",
      contato: "Carlos Lima",
      telefone: "(11) 7777-6666",
      email: "carlos@segurancaplus.com.br",
      endereco: "Rua da Segurança, 789 - São Paulo/SP",
      areaServico: "Segurança e Portaria",
      avaliacaoMedia: 4.2,
      totalServicos: 12,
      valorTotal: 60000,
      ultimoServico: "2024-08-18",
      status: "inativo"
    }
  ],
  contratos: [
    {
      id: 1,
      numero: "CT-2024-001",
      titulo: "Manutenção de Elevadores - Anual",
      fornecedor: "Elevadores Tech LTDA",
      servico: "Manutenção de Elevadores",
      dataInicio: "2024-01-15",
      dataTermino: "2025-01-15",
      valor: 18000,
      status: "ativo",
      diasParaVencer: 45,
      responsavel: "João Silva"
    },
    {
      id: 2,
      numero: "CT-2024-002",
      titulo: "Limpeza Geral - Semestral",
      fornecedor: "Limpeza Total S.A.",
      servico: "Limpeza Geral",
      dataInicio: "2024-03-01",
      dataTermino: "2024-08-31",
      valor: 12500,
      status: "vencendo",
      diasParaVencer: 15,
      responsavel: "Maria Santos"
    },
    {
      id: 3,
      numero: "CT-2024-003",
      titulo: "Portaria 24h - Mensal",
      fornecedor: "Segurança Plus",
      servico: "Portaria 24h",
      dataInicio: "2024-02-01",
      dataTermino: "2024-07-31",
      valor: 25000,
      status: "vencido",
      diasParaVencer: -5,
      responsavel: "Carlos Lima"
    }
  ],
  documentos: [
    {
      id: 1,
      nome: "Ata da Assembleia - Janeiro 2024",
      categoria: "Atas",
      tipo: "PDF",
      tamanho: "2.4 MB",
      dataUpload: "2024-01-15",
      uploadedBy: "João Silva",
      status: "ativo",
      compartilhado: true,
      downloads: 12
    },
    {
      id: 2,
      nome: "Alvará de Funcionamento",
      categoria: "Licenças",
      tipo: "PDF",
      tamanho: "1.8 MB",
      dataUpload: "2024-02-10",
      dataVencimento: "2025-02-10",
      uploadedBy: "Maria Santos",
      status: "vencendo",
      compartilhado: false,
      downloads: 5
    },
    {
      id: 3,
      nome: "Contrato - Elevadores Tech",
      categoria: "Contratos",
      tipo: "PDF",
      tamanho: "3.2 MB",
      dataUpload: "2024-01-20",
      dataVencimento: "2025-01-20",
      uploadedBy: "Carlos Lima",
      status: "ativo",
      compartilhado: true,
      downloads: 8
    },
    {
      id: 4,
      nome: "Apólice de Seguro",
      categoria: "Seguros",
      tipo: "PDF",
      tamanho: "1.5 MB",
      dataUpload: "2024-03-01",
      dataVencimento: "2024-12-31",
      uploadedBy: "Ana Costa",
      status: "vencendo",
      compartilhado: false,
      downloads: 3
    }
  ],
  patrimonio: [
    {
      id: 1,
      nome: "Televisão Samsung 55\"",
      categoria: "Eletrônicos",
      numeroPlaqueta: "PAT-001",
      localFisico: "Salão de Festas",
      dataAquisicao: "2024-01-15",
      valorAquisicao: 2500,
      fornecedor: "Eletrônicos Tech",
      status: "ativo",
      ultimaManutencao: "2024-07-15",
      proximaManutencao: "2025-01-15"
    },
    {
      id: 2,
      nome: "Bomba d'água 5HP",
      categoria: "Equipamentos",
      numeroPlaqueta: "PAT-002",
      localFisico: "Casa de Máquinas",
      dataAquisicao: "2023-08-20",
      valorAquisicao: 3200,
      fornecedor: "Bombas Hidráulicas LTDA",
      status: "manutencao",
      ultimaManutencao: "2024-08-20",
      proximaManutencao: "2024-09-05"
    },
    {
      id: 3,
      nome: "Mesa de Ping Pong",
      categoria: "Móveis",
      numeroPlaqueta: "PAT-003",
      localFisico: "Área de Lazer",
      dataAquisicao: "2024-03-10",
      valorAquisicao: 800,
      fornecedor: "Móveis e Decoração",
      status: "ativo",
      proximaManutencao: "2024-12-10"
    },
    {
      id: 4,
      nome: "Gerador 15KVA",
      categoria: "Equipamentos",
      numeroPlaqueta: "PAT-004",
      localFisico: "Subsolo",
      dataAquisicao: "2023-11-05",
      valorAquisicao: 8500,
      fornecedor: "Geradores Brasil",
      status: "baixado",
      ultimaManutencao: "2024-05-05"
    }
  ],
  certificacoes: [
    {
      id: 1,
      tipo: "Alvará de Funcionamento",
      categoria: "Alvarás",
      orgaoEmissor: "Prefeitura Municipal",
      numeroDocumento: "ALV-2024-001234",
      dataEmissao: "2024-02-15",
      dataVencimento: "2025-02-15",
      status: "ativo",
      diasParaVencer: 180,
      valorRenovacao: 850,
      responsavel: "João Silva",
      observacoes: "Renovação automática"
    },
    {
      id: 2,
      tipo: "Seguro Incêndio",
      categoria: "Seguros",
      orgaoEmissor: "Seguradora Brasil",
      numeroDocumento: "SEG-2024-5678",
      dataEmissao: "2024-01-01",
      dataVencimento: "2024-12-31",
      status: "vencendo",
      diasParaVencer: 25,
      valorRenovacao: 2500,
      responsavel: "Maria Santos",
      observacoes: "Cobertura para incêndio e raio"
    },
    {
      id: 3,
      tipo: "Certificado Elevador A",
      categoria: "Equipamentos",
      orgaoEmissor: "CREA-SP",
      numeroDocumento: "ELEV-2024-0001",
      dataEmissao: "2024-06-01",
      dataVencimento: "2025-06-01",
      status: "ativo",
      diasParaVencer: 240,
      valorRenovacao: 450,
      responsavel: "Carlos Lima",
      observacoes: "Inspeção técnica anual"
    },
    {
      id: 4,
      tipo: "Licença de Instalação GLP",
      categoria: "Licenças",
      orgaoEmissor: "Corpo de Bombeiros",
      numeroDocumento: "GLP-2023-9999",
      dataEmissao: "2023-08-15",
      dataVencimento: "2024-08-15",
      status: "vencido",
      diasParaVencer: -10,
      valorRenovacao: 300,
      responsavel: "Ana Costa",
      observacoes: "Central de GLP - Renovação urgente"
    }
  ],
  equipamentos: [
    {
      id: 1,
      nome: "Extintor CO2 - Área Garagem",
      tipo: "extintor",
      localInstalacao: "Garagem - Coluna 12",
      dataInstalacao: "2024-01-15",
      ultimaManutencao: "2024-07-15",
      proximaManutencao: "2025-01-15",
      situacao: "ativo",
      responsavel: "João Silva",
      fornecedor: "Extintores Brasil LTDA",
      numeroSerie: "EXT-2024-001",
      garantia: "12 meses"
    },
    {
      id: 2,
      nome: "Sistema de Alarme Central",
      tipo: "alarme",
      localInstalacao: "Portaria Principal",
      dataInstalacao: "2023-08-20",
      ultimaManutencao: "2024-08-20",
      proximaManutencao: "2024-11-20",
      situacao: "ativo",
      responsavel: "Maria Santos",
      fornecedor: "Segurança Plus",
      numeroSerie: "ALM-2023-050"
    },
    {
      id: 3,
      nome: "Luz de Emergência LED - Escada A",
      tipo: "luz_emergencia",
      localInstalacao: "Escada A - 2º Andar",
      dataInstalacao: "2024-03-10",
      ultimaManutencao: "2024-08-10",
      proximaManutencao: "2024-12-10",
      situacao: "manutencao",
      responsavel: "Carlos Lima",
      fornecedor: "Iluminação Tech",
      numeroSerie: "LED-2024-035"
    },
    {
      id: 4,
      nome: "Porta Corta-Fogo - Subsolo",
      tipo: "porta_corta_fogo",
      localInstalacao: "Subsolo - Acesso Principal",
      dataInstalacao: "2023-11-05",
      ultimaManutencao: "2024-05-05",
      proximaManutencao: "2024-11-05",
      situacao: "ativo",
      responsavel: "Ana Costa",
      fornecedor: "Portas Seguras LTDA",
      numeroSerie: "PCF-2023-012"
    },
    {
      id: 5,
      nome: "Extintor ABC - Hall Principal",
      tipo: "extintor",
      localInstalacao: "Hall Principal - Entrada",
      dataInstalacao: "2024-02-20",
      proximaManutencao: "2025-02-20",
      situacao: "ativo",
      responsavel: "João Silva",
      fornecedor: "Extintores Brasil LTDA",
      numeroSerie: "EXT-2024-025"
    },
    {
      id: 6,
      nome: "Detector de Fumaça - Salão de Festas",
      tipo: "alarme",
      localInstalacao: "Salão de Festas",
      dataInstalacao: "2024-01-30",
      ultimaManutencao: "2024-07-30",
      proximaManutencao: "2025-01-30",
      situacao: "inativo",
      responsavel: "Maria Santos",
      fornecedor: "Detectores Pro",
      numeroSerie: "DET-2024-008",
      observacoes: "Equipamento com defeito - aguardando peça de reposição"
    }
  ],
  manutencoes: [
    {
      id: 1,
      equipamentoId: 1,
      tipo: "preventiva",
      dataAgendada: "2025-01-15",
      responsavel: "João Silva",
      fornecedor: "Extintores Brasil LTDA",
      custo: 150,
      observacoes: "Recarga e verificação de pressão",
      status: "agendada",
      descricao: "Manutenção preventiva anual do extintor CO2"
    },
    {
      id: 2,
      equipamentoId: 2,
      tipo: "preventiva",
      dataAgendada: "2024-11-20",
      responsavel: "Maria Santos",
      fornecedor: "Segurança Plus",
      custo: 300,
      observacoes: "Teste completo do sistema",
      status: "agendada",
      descricao: "Manutenção trimestral do sistema de alarme"
    },
    {
      id: 3,
      equipamentoId: 3,
      tipo: "corretiva",
      dataAgendada: "2024-09-05",
      dataRealizada: "2024-09-05",
      responsavel: "Carlos Lima",
      fornecedor: "Iluminação Tech",
      custo: 80,
      observacoes: "Substituição da bateria",
      status: "concluida",
      descricao: "Troca de bateria da luz de emergência"
    },
    {
      id: 4,
      equipamentoId: 6,
      tipo: "corretiva",
      dataAgendada: "2024-09-15",
      responsavel: "Maria Santos",
      fornecedor: "Detectores Pro",
      custo: 250,
      observacoes: "Substituição do sensor principal",
      status: "agendada",
      descricao: "Reparo do detector de fumaça"
    }
  ]
};

// Reducer
const dataReducer = (state: DataState, action: DataAction): DataState => {
  switch (action.type) {
    case 'ADD_FORNECEDOR':
      return { ...state, fornecedores: [...state.fornecedores, action.payload] };
    case 'UPDATE_FORNECEDOR':
      return {
        ...state,
        fornecedores: state.fornecedores.map(item =>
          item.id === action.payload.id ? action.payload : item
        )
      };
    case 'DELETE_FORNECEDOR':
      return {
        ...state,
        fornecedores: state.fornecedores.filter(item => item.id !== action.payload)
      };
    case 'ADD_CONTRATO':
      return { ...state, contratos: [...state.contratos, action.payload] };
    case 'UPDATE_CONTRATO':
      return {
        ...state,
        contratos: state.contratos.map(item =>
          item.id === action.payload.id ? action.payload : item
        )
      };
    case 'DELETE_CONTRATO':
      return {
        ...state,
        contratos: state.contratos.filter(item => item.id !== action.payload)
      };
    case 'ADD_DOCUMENTO':
      return { ...state, documentos: [...state.documentos, action.payload] };
    case 'UPDATE_DOCUMENTO':
      return {
        ...state,
        documentos: state.documentos.map(item =>
          item.id === action.payload.id ? action.payload : item
        )
      };
    case 'DELETE_DOCUMENTO':
      return {
        ...state,
        documentos: state.documentos.filter(item => item.id !== action.payload)
      };
    case 'ADD_PATRIMONIO':
      return { ...state, patrimonio: [...state.patrimonio, action.payload] };
    case 'UPDATE_PATRIMONIO':
      return {
        ...state,
        patrimonio: state.patrimonio.map(item =>
          item.id === action.payload.id ? action.payload : item
        )
      };
    case 'DELETE_PATRIMONIO':
      return {
        ...state,
        patrimonio: state.patrimonio.filter(item => item.id !== action.payload)
      };
    case 'ADD_CERTIFICACAO':
      return { ...state, certificacoes: [...state.certificacoes, action.payload] };
    case 'UPDATE_CERTIFICACAO':
      return {
        ...state,
        certificacoes: state.certificacoes.map(item =>
          item.id === action.payload.id ? action.payload : item
        )
      };
    case 'DELETE_CERTIFICACAO':
      return {
        ...state,
        certificacoes: state.certificacoes.filter(item => item.id !== action.payload)
      };
    case 'ADD_EQUIPAMENTO':
      return { ...state, equipamentos: [...state.equipamentos, action.payload] };
    case 'UPDATE_EQUIPAMENTO':
      return {
        ...state,
        equipamentos: state.equipamentos.map(item =>
          item.id === action.payload.id ? action.payload : item
        )
      };
    case 'DELETE_EQUIPAMENTO':
      return {
        ...state,
        equipamentos: state.equipamentos.filter(item => item.id !== action.payload)
      };
    case 'ADD_MANUTENCAO':
      return { ...state, manutencoes: [...state.manutencoes, action.payload] };
    case 'UPDATE_MANUTENCAO':
      return {
        ...state,
        manutencoes: state.manutencoes.map(item =>
          item.id === action.payload.id ? action.payload : item
        )
      };
    case 'DELETE_MANUTENCAO':
      return {
        ...state,
        manutencoes: state.manutencoes.filter(item => item.id !== action.payload)
      };
    default:
      return state;
  }
};

// Context
const DataContext = createContext<{
  state: DataState;
  dispatch: React.Dispatch<DataAction>;
} | null>(null);

// Provider
export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(dataReducer, initialState);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

// Hook customizado
export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};