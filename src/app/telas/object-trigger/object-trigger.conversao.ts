import {
  ObjectTriggerActionType,
  ObjectTriggerConditionDTO,
  ObjectTriggerConditionType,
  ObjectTriggerDTO,
  ObjectTriggerFieldDTO,
  ObjectTriggerFieldType,
  ObjectTriggerStatus,
  WebhookDTO,
  WebhookMethod
} from './object-trigger.dto';
import {
  CategoriaCondicao,
  Condicao,
  GrupoCategoria,
  MetodoHttp,
  OPERADORES,
  ObjectTrigger,
  StatusObjectTrigger,
  TipoCampo,
  ValorCondicao,
  Webhook
} from './object-trigger.model';

/* Conversão entre os DTOs da API (object-trigger.dto.ts) e o modelo das telas
   (object-trigger.model.ts), mais o que a tela precisa e a API não traz.
   As constantes deste arquivo não têm tipo com nome de propósito: assim a aba Dados do
   prototipador mostra só as entidades da API. */

/** Nomes das tags de categoria e de campo, como a API devolveria já traduzidos. */
const TEXTO_DA_TAG: Record<string, string> = {
  'portal.objecttrigger.objecttype.service_order': 'Ordem de serviço',
  'field.serviceorder.status': 'Status'
};

/**
 * Opções de Valor dos campos que a tela mostra como lista, pelo nome técnico do campo.
 * A API não tem tipo lista (o `actstatus` é LONG); os códigos são fictícios, com
 * Concluída = 7 como no exemplo da API.
 */
const STATUS_DA_OS = [
  { id: '1', label: 'Aberta' },
  { id: '2', label: 'Agendada' },
  { id: '3', label: 'Atendimento' },
  { id: '4', label: 'Aprovação' },
  { id: '5', label: 'Fila técnico' },
  { id: '6', label: 'Deslocamento' },
  { id: '8', label: 'Despachada' },
  { id: '9', label: 'Vinculada credenciada' },
  { id: '10', label: 'Em análise' },
  { id: '7', label: 'Concluída' },
  { id: '11', label: 'Encerrada' },
  { id: '12', label: 'Paralisada' },
  { id: '13', label: 'Pré-aberta' },
  { id: '14', label: 'Suporte' }
];
const VALORES_DO_CAMPO = new Map([['actstatus', STATUS_DA_OS]]);

/** Corpo modelo de cada webhook, pelo `id`: o WebhookDTO não tem corpo (⚠ P29). */
const CORPO_DO_WEBHOOK: Record<number, string> = {
  1: '{\n  "to": "+55 11 99999-0000",\n  "message": "Sua OS 12345 está Concluída."\n}',
  2: '{\n  "to": "cliente@empresa.com",\n  "subject": "Atualização da OS 12345",\n  "body": "Olá, Maria Souza. Sua OS está Concluída."\n}',
  3: '{\n  "id": "12345",\n  "status": "Concluída",\n  "valor": "350.00"\n}',
  4: '{\n  "text": "OS 12345 (Equipe Sul) mudou para Concluída. Técnico: João Lima."\n}'
};

const STATUS_DA_TELA = new Map<ObjectTriggerStatus, StatusObjectTrigger>([
  [ObjectTriggerStatus.EDITING, 'EM_EDICAO'],
  [ObjectTriggerStatus.ACTIVE, 'ATIVO'],
  [ObjectTriggerStatus.INACTIVE, 'INATIVO']
]);

const METODO_DA_TELA = new Map<WebhookMethod, MetodoHttp>([
  [WebhookMethod.GET, 'GET'],
  [WebhookMethod.POST, 'POST'],
  [WebhookMethod.PUT, 'PUT'],
  [WebhookMethod.DELETE, 'DELETE'],
  [WebhookMethod.PATCH, 'PATCH']
]);

function texto(tag: string | undefined): string {
  return tag ? TEXTO_DA_TAG[tag] ?? tag : '';
}

/** Campos com lista de opções viram LISTA; os demais seguem o tipo de dado (booleano vira texto). */
function tipoDoCampo(campo: ObjectTriggerFieldDTO): TipoCampo {
  if (VALORES_DO_CAMPO.has(campo.name)) {
    return 'LISTA';
  }
  switch (campo.type) {
    case ObjectTriggerFieldType.LONG:
    case ObjectTriggerFieldType.DECIMAL:
      return 'NUMERO';
    case ObjectTriggerFieldType.DATE:
    case ObjectTriggerFieldType.TIMESTAMP:
      return 'DATA';
    default:
      return 'TEXTO';
  }
}

/** Campos da API agrupados por categoria (objeto), como o dropdown de Categoria mostra. */
export function deCamposDTO(campos: ObjectTriggerFieldDTO[]): GrupoCategoria[] {
  const grupos = new Map<number, GrupoCategoria>();
  for (const campo of campos) {
    const nomeDoGrupo = texto(campo.objectTranslationTag);
    let grupo = grupos.get(campo.objectType);
    if (!grupo) {
      grupo = { label: nomeDoGrupo, itens: [] };
      grupos.set(campo.objectType, grupo);
    }
    const item: CategoriaCondicao = {
      id: String(campo.id),
      label: texto(campo.translationTag),
      grupo: nomeDoGrupo,
      tipo: tipoDoCampo(campo)
    };
    const valores = VALORES_DO_CAMPO.get(campo.name);
    if (valores) {
      item.valores = valores;
    }
    grupo.itens.push(item);
  }
  return [...grupos.values()];
}

/** Nome do webhook em `description` e descrição em `notes` (⚠ P28). */
export function deWebhookDTO(webhook: WebhookDTO): Webhook {
  return {
    id: String(webhook.id),
    nome: webhook.description,
    url: webhook.path,
    descricao: webhook.notes ?? '',
    metodo: METODO_DA_TELA.get(webhook.method) ?? 'POST',
    corpoPadrao: CORPO_DO_WEBHOOK[webhook.id] ?? '{\n}'
  };
}

/** Valor da API (sempre texto) no tipo do campo: número para campos numéricos sem lista. */
function deValor(valor: string | null | undefined, campo: ObjectTriggerFieldDTO): ValorCondicao | null {
  if (valor == null) {
    return null;
  }
  return tipoDoCampo(campo) === 'NUMERO' ? Number(valor) : valor;
}

function deCondicaoDTO(condicao: ObjectTriggerConditionDTO): Condicao {
  return {
    categoriaId: String(condicao.field.id),
    operador: OPERADORES[condicao.operator - 1],
    valor: deValor(condicao.value1, condicao.field),
    valorFim: deValor(condicao.value2, condicao.field)
  };
}

/** Gatilho da API no modelo da tela: o `type` de cada condição decide o bloco. */
export function deObjectTriggerDTO(gatilho: ObjectTriggerDTO): ObjectTrigger {
  const condicoes = gatilho.conditions ?? [];
  return {
    id: String(gatilho.id),
    descricao: gatilho.description,
    status: STATUS_DA_TELA.get(gatilho.status) ?? 'EM_EDICAO',
    observacoes: gatilho.notes,
    condicoes: {
      todas: condicoes.filter(c => c.type === ObjectTriggerConditionType.AND).map(deCondicaoDTO),
      qualquer: condicoes.filter(c => c.type === ObjectTriggerConditionType.OR).map(deCondicaoDTO)
    },
    acoes: (gatilho.actions ?? []).map(acao => ({
      tipo: 'WEBHOOK',
      webhookId: String(acao.referredObjectId),
      corpo: acao.param1 ?? ''
    }))
  };
}

function paraCondicaoDTO(condicao: Condicao, type: ObjectTriggerConditionType): ObjectTriggerConditionDTO {
  return {
    type,
    operator: OPERADORES.indexOf(condicao.operador) + 1,
    value1: condicao.valor == null ? null : String(condicao.valor),
    value2: condicao.valorFim == null ? null : String(condicao.valorFim),
    // A tela só conhece o id do campo; quem devolve o campo completo é a API
    field: { id: Number(condicao.categoriaId) } as ObjectTriggerFieldDTO
  };
}

/** Gatilho da tela no formato da API: bloco "Todas" = AND (1), bloco "Qualquer" = OR (2). */
export function paraObjectTriggerDTO(gatilho: ObjectTrigger): ObjectTriggerDTO {
  const status = [...STATUS_DA_TELA].find(([, daTela]) => daTela === gatilho.status)?.[0] ?? ObjectTriggerStatus.EDITING;
  return {
    ...(gatilho.id ? { id: Number(gatilho.id) } : {}),
    description: gatilho.descricao,
    status,
    notes: gatilho.observacoes,
    conditions: [
      ...gatilho.condicoes.todas.map(c => paraCondicaoDTO(c, ObjectTriggerConditionType.AND)),
      ...gatilho.condicoes.qualquer.map(c => paraCondicaoDTO(c, ObjectTriggerConditionType.OR))
    ],
    actions: gatilho.acoes.map(acao => ({
      type: ObjectTriggerActionType.WEBHOOK_CUSTOM_PAYLOAD,
      referredObjectId: Number(acao.webhookId),
      param1: acao.corpo
    }))
  };
}
