/* DTOs da API de gatilhos e webhooks, como no documento "DTOs — Gatilhos e Webhooks".
   São o formato em que os dados viajam entre o back-end e a tela: o ObjectTriggerService e os
   mocks usam estes tipos, e a aba Dados do prototipador monta o diagrama a partir deles.
   As telas trabalham com o modelo de object-trigger.model.ts; a conversão fica em
   object-trigger.conversao.ts. Datas chegam como texto ISO 8601. */

/** Situação do gatilho. */
export enum ObjectTriggerStatus {
  EDITING = 1,
  ACTIVE = 2,
  INACTIVE = 3
}

/** Conector da condição com as demais: AND no bloco "Todas", OR no bloco "Qualquer". */
export enum ObjectTriggerConditionType {
  AND = 1,
  OR = 2
}

/** Forma de comparação da condição. */
export enum ObjectTriggerConditionOperator {
  PRESENT = 1,
  NOT_PRESENT = 2,
  EQUAL_TO = 3,
  DIFFERENT_FROM = 4,
  GREATER_THAN = 5,
  GREATER_THAN_OR_EQUAL = 6,
  LESS_THAN = 7,
  LESS_THAN_OR_EQUAL = 8,
  BETWEEN = 9,
  BETWEEN_OR_EQUAL = 10,
  EQUAL_IGNORE_CASE = 11,
  DIFFERENT_IGNORE_CASE = 12
}

/**
 * Qual ação é executada. Na API, WEBHOOK_CUSTOM_PAYLOAD tem o mesmo código 1 de
 * WEBHOOK_FIXED_SO_PAYLOAD (⚠ P8); aqui fica só a constante usada pela tela.
 */
export enum ObjectTriggerActionType {
  WEBHOOK_CUSTOM_PAYLOAD = 1,
  CLOSE_EVENT = 2
}

/** Tipo de dado do campo observado. */
export enum ObjectTriggerFieldType {
  BOOLEAN = 1,
  LONG = 2,
  DECIMAL = 3,
  STRING = 4,
  DATE = 5,
  TIMESTAMP = 6
}

export enum WebhookStatus {
  EDITING = 1,
  ACTIVE = 2,
  INACTIVE = 3
}

export enum WebhookMethod {
  GET = 1,
  POST = 2,
  PUT = 3,
  DELETE = 4,
  PATCH = 5
}

export enum WebhookAuthType {
  NONE = 1,
  BASIC = 2,
  BEARER = 3,
  OAUTH2 = 4
}

/** Campo que pode ser observado em uma condição; também define a categoria (objeto) dele. */
export interface ObjectTriggerFieldDTO {
  id: number;
  /** Código da categoria (objeto), ex.: 1 = Ordem de Serviço. */
  objectType: number;
  /** Tag do nome da categoria. Não vem no campo dentro de uma condição (⚠ P20). */
  objectTranslationTag?: string;
  /** Nome técnico, ex.: `actstatus`. */
  name: string;
  type: ObjectTriggerFieldType;
  /** Tag do nome do campo. */
  translationTag: string;
  /** Casas decimais, para campos decimais. Não vem no campo dentro de uma condição (⚠ P20). */
  precision?: number;
}

/** Destino externo chamado por uma ação. Não tem campo de corpo da requisição (⚠ P29). */
export interface WebhookDTO {
  id: number;
  description: string;
  status: WebhookStatus;
  /** URL chamada. */
  path: string;
  method: WebhookMethod;
  authType: WebhookAuthType;
  authParam1: string | null;
  authParam2: string | null;
  authParam3: string | null;
  authParam4: string | null;
  notes: string | null;
  dateCreated: string;
  dateUpdated: string;
}

/** Uma condição do gatilho: campo, operador e valores (sempre texto). */
export interface ObjectTriggerConditionDTO {
  id?: number;
  type: ObjectTriggerConditionType;
  operator: ObjectTriggerConditionOperator;
  /** Valor comparado; início do intervalo em "entre". */
  value1?: string | null;
  /** Fim do intervalo em "entre". */
  value2?: string | null;
  /** Uso não documentado (⚠ P6). */
  value3?: string | null;
  /** Uso não documentado (⚠ P6). */
  value4?: string | null;
  field: ObjectTriggerFieldDTO;
}

/** Uma ação do gatilho, executada quando as condições são atendidas. */
export interface ObjectTriggerActionDTO {
  id?: number;
  type: ObjectTriggerActionType;
  /** Nos tipos de webhook, o `id` do webhook. */
  referredObjectId: number;
  /** Uso conforme o tipo não documentado (⚠ P7); o protótipo guarda aqui o corpo JSON da chamada. */
  param1?: string | null;
  param2?: string | null;
  param3?: string | null;
  param4?: string | null;
  /** Webhook referenciado, completo (⚠ P21, ⚠ P22). */
  webhook?: WebhookDTO;
}

/** O gatilho. `conditions` e `actions` vêm na busca com `includeConditions`/`includeActions`. */
export interface ObjectTriggerDTO {
  id?: number;
  description: string;
  status: ObjectTriggerStatus;
  notes: string | null;
  dateCreated?: string;
  dateUpdated?: string;
  conditions?: ObjectTriggerConditionDTO[];
  actions?: ObjectTriggerActionDTO[];
}
