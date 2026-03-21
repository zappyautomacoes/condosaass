import {
  Administradora, Sindico, Plano, Pagamento, AtividadeRecente,
  allModulosTrue, modulosBasico, modulosProfissional,
} from "@/types/superAdmin";

export const planosMock: Plano[] = [
  {
    id: "plan-1", nome: "Básico", precoMensal: 199, precoAnual: 1990,
    tipo: "sindico", modulosInclusos: modulosBasico,
    limiteCondominios: 1, limiteSindicos: 1, limiteMoradores: 100, limiteUsuarios: 5, status: "ativo",
  },
  {
    id: "plan-2", nome: "Profissional", precoMensal: 399, precoAnual: 3990,
    tipo: "administradora", modulosInclusos: modulosProfissional,
    limiteCondominios: 5, limiteSindicos: 5, limiteMoradores: 500, limiteUsuarios: 20, status: "ativo",
  },
  {
    id: "plan-3", nome: "Enterprise", precoMensal: 799, precoAnual: 7990,
    tipo: "administradora", modulosInclusos: allModulosTrue,
    limiteCondominios: 50, limiteSindicos: 50, limiteMoradores: 5000, limiteUsuarios: 100, status: "ativo",
  },
];

export const administradorasMock: Administradora[] = [
  {
    id: "adm-1", razaoSocial: "Gestão Total Administradora Ltda", nomeFantasia: "Gestão Total",
    cnpj: "12.345.678/0001-90", inscricaoEstadual: "123.456.789",
    responsavel: { nome: "Carlos Eduardo Silva", cpf: "111.222.333-44", cargo: "Diretor" },
    contato: { email: "carlos@gestaototal.com.br", telefone: "(11) 3456-7890", whatsapp: "(11) 99876-5432" },
    endereco: { cep: "01310-100", rua: "Av. Paulista", numero: "1000", complemento: "Sala 1201", bairro: "Bela Vista", cidade: "São Paulo", estado: "SP" },
    planoId: "plan-3", planoNome: "Enterprise", modulosLiberados: allModulosTrue,
    limiteCondominios: 50, limiteSindicos: 50, sindicosVinculados: 12, condominiosGerenciados: 18,
    status: "ativo", dataCadastro: "2024-01-15", dataVencimento: "2026-01-15",
  },
  {
    id: "adm-2", razaoSocial: "Prime Administradora de Condomínios S/A", nomeFantasia: "Prime Condominial",
    cnpj: "98.765.432/0001-10", inscricaoEstadual: "987.654.321",
    responsavel: { nome: "Ana Carolina Mendes", cpf: "555.666.777-88", cargo: "CEO" },
    contato: { email: "ana@primecondominial.com.br", telefone: "(21) 2345-6789", whatsapp: "(21) 98765-4321" },
    endereco: { cep: "22041-080", rua: "Rua Barata Ribeiro", numero: "500", complemento: "10º andar", bairro: "Copacabana", cidade: "Rio de Janeiro", estado: "RJ" },
    planoId: "plan-2", planoNome: "Profissional", modulosLiberados: modulosProfissional,
    limiteCondominios: 5, limiteSindicos: 5, sindicosVinculados: 4, condominiosGerenciados: 5,
    status: "ativo", dataCadastro: "2024-03-20", dataVencimento: "2026-03-20",
  },
  {
    id: "adm-3", razaoSocial: "Habitat Gestão Predial Ltda", nomeFantasia: "Habitat Gestão",
    cnpj: "45.678.901/0001-23", inscricaoEstadual: "456.789.012",
    responsavel: { nome: "Roberto Farias", cpf: "222.333.444-55", cargo: "Sócio-Gerente" },
    contato: { email: "roberto@habitatgestao.com.br", telefone: "(31) 3456-1234", whatsapp: "(31) 97654-3210" },
    endereco: { cep: "30130-000", rua: "Rua da Bahia", numero: "800", complemento: "", bairro: "Centro", cidade: "Belo Horizonte", estado: "MG" },
    planoId: "plan-2", planoNome: "Profissional", modulosLiberados: modulosProfissional,
    limiteCondominios: 5, limiteSindicos: 5, sindicosVinculados: 3, condominiosGerenciados: 4,
    status: "trial", dataCadastro: "2025-02-10", dataVencimento: "2025-03-10",
  },
  {
    id: "adm-4", razaoSocial: "CondomínioFácil Ltda", nomeFantasia: "CondomínioFácil",
    cnpj: "67.890.123/0001-45", inscricaoEstadual: "678.901.234",
    responsavel: { nome: "Mariana Costa", cpf: "333.444.555-66", cargo: "Diretora Operacional" },
    contato: { email: "mariana@condominiofacil.com.br", telefone: "(41) 3234-5678", whatsapp: "(41) 99123-4567" },
    endereco: { cep: "80020-000", rua: "Rua XV de Novembro", numero: "300", complemento: "Sala 5", bairro: "Centro", cidade: "Curitiba", estado: "PR" },
    planoId: "plan-3", planoNome: "Enterprise", modulosLiberados: allModulosTrue,
    limiteCondominios: 50, limiteSindicos: 50, sindicosVinculados: 8, condominiosGerenciados: 15,
    status: "ativo", dataCadastro: "2023-11-05", dataVencimento: "2025-11-05",
  },
  {
    id: "adm-5", razaoSocial: "Vertice Administração Condominial Ltda", nomeFantasia: "Vertice Admin",
    cnpj: "34.567.890/0001-67", inscricaoEstadual: "345.678.901",
    responsavel: { nome: "Paulo Henrique Lima", cpf: "444.555.666-77", cargo: "Administrador" },
    contato: { email: "paulo@verticeadmin.com.br", telefone: "(51) 3321-0987", whatsapp: "(51) 98432-1098" },
    endereco: { cep: "90010-000", rua: "Rua dos Andradas", numero: "1200", complemento: "", bairro: "Centro Histórico", cidade: "Porto Alegre", estado: "RS" },
    planoId: "plan-2", planoNome: "Profissional", modulosLiberados: modulosProfissional,
    limiteCondominios: 5, limiteSindicos: 5, sindicosVinculados: 2, condominiosGerenciados: 3,
    status: "suspenso", dataCadastro: "2024-06-01", dataVencimento: "2025-06-01",
  },
];

export const sindicosMock: Sindico[] = [
  {
    id: "sind-1", nome: "João Pedro Almeida", cpf: "123.456.789-00", rg: "12.345.678-9", dataNascimento: "1980-05-15",
    contato: { email: "joao@email.com", telefone: "(11) 3456-7890", whatsapp: "(11) 99876-0001" },
    endereco: { cep: "01310-100", rua: "Rua Augusta", numero: "500", complemento: "Apto 12", bairro: "Consolação", cidade: "São Paulo", estado: "SP" },
    tipo: "vinculado", administradoraId: "adm-1", administradoraNome: "Gestão Total",
    condominios: ["Residencial Aurora", "Edifício Solar"], status: "ativo", dataCadastro: "2024-02-01",
  },
  {
    id: "sind-2", nome: "Maria Fernanda Costa", cpf: "987.654.321-00", rg: "98.765.432-1", dataNascimento: "1975-08-22",
    contato: { email: "maria@email.com", telefone: "(21) 2345-6789", whatsapp: "(21) 98765-0002" },
    endereco: { cep: "22041-080", rua: "Rua Tonelero", numero: "200", complemento: "", bairro: "Copacabana", cidade: "Rio de Janeiro", estado: "RJ" },
    tipo: "vinculado", administradoraId: "adm-2", administradoraNome: "Prime Condominial",
    condominios: ["Condomínio Mar Azul"], status: "ativo", dataCadastro: "2024-04-10",
  },
  {
    id: "sind-3", nome: "Ricardo Santos Oliveira", cpf: "456.789.123-00", rg: "45.678.912-3", dataNascimento: "1982-11-30",
    contato: { email: "ricardo@email.com", telefone: "(11) 3567-8901", whatsapp: "(11) 99234-5678" },
    endereco: { cep: "04567-000", rua: "Rua Vergueiro", numero: "3000", complemento: "Apto 45", bairro: "Vila Mariana", cidade: "São Paulo", estado: "SP" },
    tipo: "independente", condominios: ["Residencial Parque Verde"],
    planoId: "plan-1", planoNome: "Básico", modulosLiberados: modulosBasico,
    status: "ativo", dataCadastro: "2024-05-15", dataVencimento: "2026-05-15",
  },
  {
    id: "sind-4", nome: "Luciana Barbosa Ferreira", cpf: "789.123.456-00", rg: "78.912.345-6", dataNascimento: "1990-03-12",
    contato: { email: "luciana@email.com", telefone: "(31) 3456-7890", whatsapp: "(31) 97654-3211" },
    endereco: { cep: "30130-001", rua: "Rua Espírito Santo", numero: "800", complemento: "", bairro: "Centro", cidade: "Belo Horizonte", estado: "MG" },
    tipo: "vinculado", administradoraId: "adm-3", administradoraNome: "Habitat Gestão",
    condominios: ["Edifício Montanha"], status: "trial", dataCadastro: "2025-02-20",
  },
  {
    id: "sind-5", nome: "Fernando Gomes Neto", cpf: "321.654.987-00", rg: "32.165.498-7", dataNascimento: "1978-07-08",
    contato: { email: "fernando@email.com", telefone: "(41) 3234-5678", whatsapp: "(41) 99123-4568" },
    endereco: { cep: "80020-001", rua: "Rua Marechal Deodoro", numero: "600", complemento: "Sala 3", bairro: "Centro", cidade: "Curitiba", estado: "PR" },
    tipo: "vinculado", administradoraId: "adm-4", administradoraNome: "CondomínioFácil",
    condominios: ["Residencial Pinhais", "Condomínio Jardim"], status: "ativo", dataCadastro: "2024-01-20",
  },
  {
    id: "sind-6", nome: "Patrícia Lima Souza", cpf: "654.987.321-00", rg: "65.498.732-1", dataNascimento: "1985-09-25",
    contato: { email: "patricia@email.com", telefone: "(51) 3321-0988", whatsapp: "(51) 98432-1099" },
    endereco: { cep: "90010-001", rua: "Rua da Praia", numero: "400", complemento: "", bairro: "Centro Histórico", cidade: "Porto Alegre", estado: "RS" },
    tipo: "independente", condominios: ["Edifício Porto Sul"],
    planoId: "plan-1", planoNome: "Básico", modulosLiberados: modulosBasico,
    status: "ativo", dataCadastro: "2024-08-01", dataVencimento: "2026-08-01",
  },
  {
    id: "sind-7", nome: "André Luiz Pereira", cpf: "147.258.369-00", rg: "14.725.836-9", dataNascimento: "1988-12-03",
    contato: { email: "andre@email.com", telefone: "(11) 3789-0123", whatsapp: "(11) 99345-6789" },
    endereco: { cep: "01310-200", rua: "Rua Haddock Lobo", numero: "150", complemento: "Apto 8B", bairro: "Cerqueira César", cidade: "São Paulo", estado: "SP" },
    tipo: "vinculado", administradoraId: "adm-1", administradoraNome: "Gestão Total",
    condominios: ["Condomínio Estrela"], status: "ativo", dataCadastro: "2024-09-10",
  },
  {
    id: "sind-8", nome: "Cláudia Rodrigues Mendonça", cpf: "258.369.147-00", rg: "25.836.914-7", dataNascimento: "1983-01-18",
    contato: { email: "claudia@email.com", telefone: "(21) 2456-7890", whatsapp: "(21) 98321-6543" },
    endereco: { cep: "22070-000", rua: "Rua Voluntários da Pátria", numero: "300", complemento: "", bairro: "Botafogo", cidade: "Rio de Janeiro", estado: "RJ" },
    tipo: "independente", condominios: ["Residencial Botafogo Park"],
    planoId: "plan-2", planoNome: "Profissional", modulosLiberados: modulosProfissional,
    status: "cancelado", dataCadastro: "2024-03-01", dataVencimento: "2025-03-01",
  },
];

export const pagamentosMock: Pagamento[] = [
  { id: "pag-1", clienteId: "adm-1", clienteNome: "Gestão Total", clienteTipo: "administradora", planoNome: "Enterprise", valor: 799, status: "pago", dataVencimento: "2025-03-15", dataPagamento: "2025-03-14" },
  { id: "pag-2", clienteId: "adm-2", clienteNome: "Prime Condominial", clienteTipo: "administradora", planoNome: "Profissional", valor: 399, status: "pago", dataVencimento: "2025-03-20", dataPagamento: "2025-03-19" },
  { id: "pag-3", clienteId: "adm-3", clienteNome: "Habitat Gestão", clienteTipo: "administradora", planoNome: "Profissional", valor: 399, status: "pendente", dataVencimento: "2025-03-25" },
  { id: "pag-4", clienteId: "adm-4", clienteNome: "CondomínioFácil", clienteTipo: "administradora", planoNome: "Enterprise", valor: 799, status: "pago", dataVencimento: "2025-03-05", dataPagamento: "2025-03-04" },
  { id: "pag-5", clienteId: "adm-5", clienteNome: "Vertice Admin", clienteTipo: "administradora", planoNome: "Profissional", valor: 399, status: "atrasado", dataVencimento: "2025-02-28" },
  { id: "pag-6", clienteId: "sind-3", clienteNome: "Ricardo Santos Oliveira", clienteTipo: "sindico", planoNome: "Básico", valor: 199, status: "pago", dataVencimento: "2025-03-15", dataPagamento: "2025-03-15" },
  { id: "pag-7", clienteId: "sind-6", clienteNome: "Patrícia Lima Souza", clienteTipo: "sindico", planoNome: "Básico", valor: 199, status: "pago", dataVencimento: "2025-03-01", dataPagamento: "2025-02-28" },
  { id: "pag-8", clienteId: "sind-8", clienteNome: "Cláudia Rodrigues Mendonça", clienteTipo: "sindico", planoNome: "Profissional", valor: 399, status: "atrasado", dataVencimento: "2025-02-15" },
  // Previous months
  { id: "pag-9", clienteId: "adm-1", clienteNome: "Gestão Total", clienteTipo: "administradora", planoNome: "Enterprise", valor: 799, status: "pago", dataVencimento: "2025-02-15", dataPagamento: "2025-02-14" },
  { id: "pag-10", clienteId: "adm-2", clienteNome: "Prime Condominial", clienteTipo: "administradora", planoNome: "Profissional", valor: 399, status: "pago", dataVencimento: "2025-02-20", dataPagamento: "2025-02-20" },
  { id: "pag-11", clienteId: "adm-4", clienteNome: "CondomínioFácil", clienteTipo: "administradora", planoNome: "Enterprise", valor: 799, status: "pago", dataVencimento: "2025-02-05", dataPagamento: "2025-02-04" },
  { id: "pag-12", clienteId: "adm-1", clienteNome: "Gestão Total", clienteTipo: "administradora", planoNome: "Enterprise", valor: 799, status: "pago", dataVencimento: "2025-01-15", dataPagamento: "2025-01-14" },
];

export const atividadesRecentesMock: AtividadeRecente[] = [
  { id: "at-1", tipo: "cadastro", descricao: "Nova administradora cadastrada: Habitat Gestão (Trial)", data: "2025-02-10" },
  { id: "at-2", tipo: "upgrade", descricao: "CondomínioFácil fez upgrade para Enterprise", data: "2025-01-28" },
  { id: "at-3", tipo: "pagamento", descricao: "Pagamento recebido: Gestão Total - R$ 799,00", data: "2025-03-14" },
  { id: "at-4", tipo: "inadimplencia", descricao: "Vertice Admin com pagamento em atraso há 21 dias", data: "2025-03-21" },
  { id: "at-5", tipo: "cadastro", descricao: "Novo síndico independente: Patrícia Lima Souza", data: "2024-08-01" },
  { id: "at-6", tipo: "suspensao", descricao: "Acesso suspenso: Vertice Admin (inadimplência)", data: "2025-03-15" },
  { id: "at-7", tipo: "pagamento", descricao: "Pagamento recebido: Prime Condominial - R$ 399,00", data: "2025-03-19" },
  { id: "at-8", tipo: "cadastro", descricao: "Novo síndico vinculado: André Luiz Pereira (Gestão Total)", data: "2024-09-10" },
];
