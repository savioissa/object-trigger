/** Status do gatilho, na ordem do enum ObjectTriggerStatus: EDITING (1), ACTIVE (2), INACTIVE (3). */
export type StatusObjectTrigger = 'EM_EDICAO' | 'ATIVO' | 'INATIVO';
export const STATUS_OBJECT_TRIGGER: StatusObjectTrigger[] = ['EM_EDICAO', 'ATIVO', 'INATIVO'];

/** Tag de tradução de cada status. */
export const TAG_STATUS: Record<StatusObjectTrigger, string> = {
  EM_EDICAO: 'portal.generic.label.in-edit',
  ATIVO: 'portal.generic.label.active',
  INATIVO: 'portal.generic.label.inactive'
};

/** Tipo do dado da categoria: define o controle do campo "Valor". */
export type TipoCampo = 'LISTA' | 'TEXTO' | 'NUMERO' | 'DATA';

/** Operadores disponíveis para qualquer categoria, na ordem do enum (1 a 12), que é a do dropdown. */
export const OPERADORES = [
  'PRESENTE',
  'AUSENTE',
  'IGUAL',
  'DIFERENTE',
  'MAIOR_QUE',
  'MAIOR_OU_IGUAL',
  'MENOR_QUE',
  'MENOR_OU_IGUAL',
  'ENTRE',
  'ENTRE_OU_IGUAL',
  'IGUAL_SEM_MAIUSCULAS',
  'DIFERENTE_SEM_MAIUSCULAS'
] as const;

export type Operador = (typeof OPERADORES)[number];

/** Tag de tradução de cada operador. */
export const TAG_OPERADOR: Record<Operador, string> = {
  PRESENTE: 'portal.generic.label.operator-present',
  AUSENTE: 'portal.generic.label.operator-absent',
  IGUAL: 'portal.generic.label.equal',
  DIFERENTE: 'portal.generic.label.operator-different',
  MAIOR_QUE: 'portal.generic.label.greater-than',
  MAIOR_OU_IGUAL: 'iclass.generic.label.greater-than-or-equal-to',
  MENOR_QUE: 'portal.generic.label.less-than',
  MENOR_OU_IGUAL: 'iclass.generic.label.less-than-or-equal-to',
  ENTRE: 'iclass.generic.label.between',
  ENTRE_OU_IGUAL: 'portal.generic.label.operator-between-or-equal',
  IGUAL_SEM_MAIUSCULAS: 'portal.generic.label.operator-equal-ignore-case',
  DIFERENTE_SEM_MAIUSCULAS: 'portal.generic.label.operator-not-equal-ignore-case'
};

/** Operadores que não comparam com um valor: com eles o campo "Valor" fica desabilitado. */
export const OPERADORES_SEM_VALOR: readonly Operador[] = ['PRESENTE', 'AUSENTE'];

/** Operadores que comparam com um intervalo: com eles o "Valor" vira dois campos (de e até). */
export const OPERADORES_INTERVALO: readonly Operador[] = ['ENTRE', 'ENTRE_OU_IGUAL'];

export function operadorExigeValor(operador: Operador | null): boolean {
  return operador != null && !OPERADORES_SEM_VALOR.includes(operador);
}

export function operadorUsaIntervalo(operador: Operador | null): boolean {
  return operador != null && OPERADORES_INTERVALO.includes(operador);
}

export interface OpcaoValor {
  id: string;
  label: string;
}

export interface CategoriaCondicao {
  id: string;
  /** Nome do campo dentro do grupo, ex.: "Status". */
  label: string;
  /** Nome do grupo a que pertence, ex.: "Ordem de serviço". Usado no texto do item selecionado. */
  grupo: string;
  tipo: TipoCampo;
  /** Só para categorias do tipo LISTA. */
  valores?: OpcaoValor[];
}

/** Grupo de categorias exibido no dropdown agrupado (cabeçalho + itens). */
export interface GrupoCategoria {
  label: string;
  itens: CategoriaCondicao[];
}

export type TipoAcao = 'WEBHOOK';
export const TIPOS_ACAO: TipoAcao[] = ['WEBHOOK'];

/** Tag de tradução de cada tipo de ação. */
export const TAG_TIPO_ACAO: Record<TipoAcao, string> = {
  WEBHOOK: 'portal.generic.label.get-webhook'
};

export type MetodoHttp = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface Webhook {
  id: string;
  nome: string;
  url: string;
  descricao: string;
  metodo: MetodoHttp;
  /** Corpo sugerido, copiado para a ação quando o webhook é escolhido. */
  corpoPadrao: string;
}

/** Valor de condição no payload: datas vão como "AAAA-MM-DD". */
export type ValorCondicao = string | number;

export interface Condicao {
  categoriaId: string;
  operador: Operador;
  /** `null` quando o operador não usa valor (Presente, Ausente). Em "Entre" e "Entre ou igual", é o início. */
  valor: ValorCondicao | null;
  /** Fim do intervalo, só em "Entre" e "Entre ou igual"; `null` nos demais operadores. */
  valorFim: ValorCondicao | null;
}

export interface Acao {
  tipo: TipoAcao;
  webhookId: string;
  corpo: string;
}

export interface ObjectTrigger {
  id?: string;
  descricao: string;
  status: StatusObjectTrigger;
  observacoes: string | null;
  condicoes: {
    /** Todas devem ser atendidas (E). */
    todas: Condicao[];
    /** Pelo menos uma deve ser atendida (OU). */
    qualquer: Condicao[];
  };
  acoes: Acao[];
}
