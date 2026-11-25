import { ObjectTriggerDTO, ObjectTriggerFieldDTO, WebhookDTO } from './object-trigger.dto';

/* Dados fictícios no formato dos DTOs da API, usados pelo ObjectTriggerService enquanto a API
   não existe. Os textos simulam o que a API devolveria, por isso não passam pelo arquivo de
   tradução. Só valores fixos (sem funções, constantes nem enums): a aba Dados do
   prototipador lê este arquivo. Os códigos dos enums estão em object-trigger.dto.ts.
   Os códigos de status da OS em `value1` são fictícios (Concluída = 7, como no exemplo da API);
   os nomes deles ficam em object-trigger.conversao.ts. */

/** Campos que podem ser observados em condições (GET ../portal/objecttriggerfields). */
export const OBJECT_TRIGGER_FIELDS_MOCK: ObjectTriggerFieldDTO[] = [
  {
    id: 1,
    objectType: 1,
    objectTranslationTag: 'portal.objecttrigger.objecttype.service_order',
    name: 'actstatus',
    type: 2,
    translationTag: 'field.serviceorder.status'
  }
];

/** Webhooks cadastrados (GET /portal/webhooks). */
export const WEBHOOKS_MOCK: WebhookDTO[] = [
  {
    id: 1,
    description: 'Enviar SMS ao cliente',
    status: 2,
    path: 'https://api.empresa.com/rest/v1/notify/sms',
    method: 2,
    authType: 1,
    authParam1: null,
    authParam2: null,
    authParam3: null,
    authParam4: null,
    notes: 'Dispara um SMS de atualização ao cliente',
    dateCreated: '2026-10-01T09:00:00.000+00:00',
    dateUpdated: '2026-10-01T09:00:00.000+00:00'
  },
  {
    id: 2,
    description: 'Enviar e-mail ao cliente',
    status: 2,
    path: 'https://api.empresa.com/rest/v1/notify/email',
    method: 2,
    authType: 1,
    authParam1: null,
    authParam2: null,
    authParam3: null,
    authParam4: null,
    notes: 'Envia um e-mail com o resumo da OS ao cliente',
    dateCreated: '2026-10-02T09:00:00.000+00:00',
    dateUpdated: '2026-10-02T09:00:00.000+00:00'
  },
  {
    id: 3,
    description: 'Atualizar OS no ERP',
    status: 2,
    path: 'https://erp.empresa.com/api/ordens',
    method: 3,
    authType: 3,
    authParam1: 'token-erp-ficticio',
    authParam2: null,
    authParam3: null,
    authParam4: null,
    notes: 'Sincroniza status e valor da OS com o ERP',
    dateCreated: '2026-10-03T09:00:00.000+00:00',
    dateUpdated: '2026-10-03T09:00:00.000+00:00'
  },
  {
    id: 4,
    description: 'Avisar equipe no chat',
    status: 2,
    path: 'https://hooks.chat.empresa.com/services/equipes',
    method: 2,
    authType: 1,
    authParam1: null,
    authParam2: null,
    authParam3: null,
    authParam4: null,
    notes: 'Publica uma mensagem no canal da equipe responsável',
    dateCreated: '2026-10-04T09:00:00.000+00:00',
    dateUpdated: '2026-10-04T09:00:00.000+00:00'
  }
];

/** Gatilhos cadastrados, com condições e ações (como na busca com includeConditions e includeActions). */
export const OBJECT_TRIGGERS_MOCK: ObjectTriggerDTO[] = [
  {
    id: 1,
    description: 'Avisar cliente quando a OS for concluída',
    status: 2,
    notes: 'Usado pelo time de atendimento.',
    dateCreated: '2026-10-13T10:20:27.000+00:00',
    dateUpdated: '2026-11-20T08:45:00.000+00:00',
    conditions: [
      {
        id: 1,
        type: 1,
        operator: 3,
        value1: '7',
        value2: null,
        field: {
          id: 1,
          objectType: 1,
          name: 'actstatus',
          type: 2,
          translationTag: 'field.serviceorder.status'
        }
      }
    ],
    actions: [
      {
        id: 1,
        type: 1,
        referredObjectId: 1,
        param1: '{\n  "to": "+55 11 99999-0000",\n  "message": "Sua OS 12345 está Concluída."\n}',
        webhook: {
          id: 1,
          description: 'Enviar SMS ao cliente',
          status: 2,
          path: 'https://api.empresa.com/rest/v1/notify/sms',
          method: 2,
          authType: 1,
          authParam1: null,
          authParam2: null,
          authParam3: null,
          authParam4: null,
          notes: 'Dispara um SMS de atualização ao cliente',
          dateCreated: '2026-10-01T09:00:00.000+00:00',
          dateUpdated: '2026-10-01T09:00:00.000+00:00'
        }
      }
    ]
  },
  {
    id: 2,
    description: 'Sincronizar OS encerrada ou paralisada com o ERP',
    status: 3,
    notes: null,
    dateCreated: '2026-10-13T11:20:27.000+00:00',
    dateUpdated: '2026-10-13T11:20:27.000+00:00',
    conditions: [
      {
        id: 2,
        type: 1,
        operator: 3,
        value1: '11',
        value2: null,
        field: {
          id: 1,
          objectType: 1,
          name: 'actstatus',
          type: 2,
          translationTag: 'field.serviceorder.status'
        }
      }
    ],
    actions: [
      {
        id: 2,
        type: 1,
        referredObjectId: 3,
        param1: '{\n  "id": "12345",\n  "status": "Concluída",\n  "valor": "350.00"\n}',
        webhook: {
          id: 3,
          description: 'Atualizar OS no ERP',
          status: 2,
          path: 'https://erp.empresa.com/api/ordens',
          method: 3,
          authType: 3,
          authParam1: 'token-erp-ficticio',
          authParam2: null,
          authParam3: null,
          authParam4: null,
          notes: 'Sincroniza status e valor da OS com o ERP',
          dateCreated: '2026-10-03T09:00:00.000+00:00',
          dateUpdated: '2026-10-03T09:00:00.000+00:00'
        }
      }
    ]
  },
  {
    id: 3,
    description: 'Enviar e-mail de confirmação no agendamento',
    status: 2,
    notes: null,
    dateCreated: '2026-10-13T12:20:27.000+00:00',
    dateUpdated: '2026-10-13T12:20:27.000+00:00',
    conditions: [
      {
        id: 3,
        type: 1,
        operator: 3,
        value1: '2',
        value2: null,
        field: {
          id: 1,
          objectType: 1,
          name: 'actstatus',
          type: 2,
          translationTag: 'field.serviceorder.status'
        }
      }
    ],
    actions: [
      {
        id: 3,
        type: 1,
        referredObjectId: 2,
        param1: '{\n  "to": "cliente@empresa.com",\n  "subject": "Atualização da OS 12345",\n  "body": "Olá, Maria Souza. Sua OS está Concluída."\n}',
        webhook: {
          id: 2,
          description: 'Enviar e-mail ao cliente',
          status: 2,
          path: 'https://api.empresa.com/rest/v1/notify/email',
          method: 2,
          authType: 1,
          authParam1: null,
          authParam2: null,
          authParam3: null,
          authParam4: null,
          notes: 'Envia um e-mail com o resumo da OS ao cliente',
          dateCreated: '2026-10-02T09:00:00.000+00:00',
          dateUpdated: '2026-10-02T09:00:00.000+00:00'
        }
      }
    ]
  },
  {
    id: 4,
    description: 'Avisar equipe quando a OS entrar em aprovação',
    status: 1,
    notes: 'Usado pelo time de atendimento.',
    dateCreated: '2026-10-14T13:20:27.000+00:00',
    dateUpdated: '2026-10-14T13:20:27.000+00:00',
    conditions: [
      {
        id: 4,
        type: 1,
        operator: 3,
        value1: '4',
        value2: null,
        field: {
          id: 1,
          objectType: 1,
          name: 'actstatus',
          type: 2,
          translationTag: 'field.serviceorder.status'
        }
      }
    ],
    actions: [
      {
        id: 4,
        type: 1,
        referredObjectId: 4,
        param1: '{\n  "text": "OS 12345 (Equipe Sul) mudou para Concluída. Técnico: João Lima."\n}',
        webhook: {
          id: 4,
          description: 'Avisar equipe no chat',
          status: 2,
          path: 'https://hooks.chat.empresa.com/services/equipes',
          method: 2,
          authType: 1,
          authParam1: null,
          authParam2: null,
          authParam3: null,
          authParam4: null,
          notes: 'Publica uma mensagem no canal da equipe responsável',
          dateCreated: '2026-10-04T09:00:00.000+00:00',
          dateUpdated: '2026-10-04T09:00:00.000+00:00'
        }
      }
    ]
  },
  {
    id: 5,
    description: 'Notificar cliente sobre técnico a caminho',
    status: 2,
    notes: null,
    dateCreated: '2026-10-14T14:20:27.000+00:00',
    dateUpdated: '2026-11-20T08:45:00.000+00:00',
    conditions: [
      {
        id: 5,
        type: 1,
        operator: 3,
        value1: '6',
        value2: null,
        field: {
          id: 1,
          objectType: 1,
          name: 'actstatus',
          type: 2,
          translationTag: 'field.serviceorder.status'
        }
      }
    ],
    actions: [
      {
        id: 5,
        type: 1,
        referredObjectId: 1,
        param1: '{\n  "to": "+55 11 99999-0000",\n  "message": "Sua OS 12345 está Concluída."\n}',
        webhook: {
          id: 1,
          description: 'Enviar SMS ao cliente',
          status: 2,
          path: 'https://api.empresa.com/rest/v1/notify/sms',
          method: 2,
          authType: 1,
          authParam1: null,
          authParam2: null,
          authParam3: null,
          authParam4: null,
          notes: 'Dispara um SMS de atualização ao cliente',
          dateCreated: '2026-10-01T09:00:00.000+00:00',
          dateUpdated: '2026-10-01T09:00:00.000+00:00'
        }
      }
    ]
  },
  {
    id: 6,
    description: 'Atualizar ERP quando a OS for despachada',
    status: 2,
    notes: null,
    dateCreated: '2026-10-14T15:20:27.000+00:00',
    dateUpdated: '2026-10-14T15:20:27.000+00:00',
    conditions: [
      {
        id: 6,
        type: 1,
        operator: 3,
        value1: '8',
        value2: null,
        field: {
          id: 1,
          objectType: 1,
          name: 'actstatus',
          type: 2,
          translationTag: 'field.serviceorder.status'
        }
      }
    ],
    actions: [
      {
        id: 6,
        type: 1,
        referredObjectId: 3,
        param1: '{\n  "id": "12345",\n  "status": "Concluída",\n  "valor": "350.00"\n}',
        webhook: {
          id: 3,
          description: 'Atualizar OS no ERP',
          status: 2,
          path: 'https://erp.empresa.com/api/ordens',
          method: 3,
          authType: 3,
          authParam1: 'token-erp-ficticio',
          authParam2: null,
          authParam3: null,
          authParam4: null,
          notes: 'Sincroniza status e valor da OS com o ERP',
          dateCreated: '2026-10-03T09:00:00.000+00:00',
          dateUpdated: '2026-10-03T09:00:00.000+00:00'
        }
      }
    ]
  },
  {
    id: 7,
    description: 'Alertar supervisão sobre OS paralisada',
    status: 2,
    notes: 'Usado pelo time de atendimento.',
    dateCreated: '2026-10-15T16:20:27.000+00:00',
    dateUpdated: '2026-10-15T16:20:27.000+00:00',
    conditions: [
      {
        id: 7,
        type: 1,
        operator: 3,
        value1: '12',
        value2: null,
        field: {
          id: 1,
          objectType: 1,
          name: 'actstatus',
          type: 2,
          translationTag: 'field.serviceorder.status'
        }
      }
    ],
    actions: [
      {
        id: 7,
        type: 1,
        referredObjectId: 4,
        param1: '{\n  "text": "OS 12345 (Equipe Sul) mudou para Concluída. Técnico: João Lima."\n}',
        webhook: {
          id: 4,
          description: 'Avisar equipe no chat',
          status: 2,
          path: 'https://hooks.chat.empresa.com/services/equipes',
          method: 2,
          authType: 1,
          authParam1: null,
          authParam2: null,
          authParam3: null,
          authParam4: null,
          notes: 'Publica uma mensagem no canal da equipe responsável',
          dateCreated: '2026-10-04T09:00:00.000+00:00',
          dateUpdated: '2026-10-04T09:00:00.000+00:00'
        }
      }
    ]
  },
  {
    id: 8,
    description: 'Enviar pesquisa de satisfação após encerramento',
    status: 3,
    notes: null,
    dateCreated: '2026-10-15T17:20:27.000+00:00',
    dateUpdated: '2026-10-15T17:20:27.000+00:00',
    conditions: [
      {
        id: 8,
        type: 1,
        operator: 3,
        value1: '11',
        value2: null,
        field: {
          id: 1,
          objectType: 1,
          name: 'actstatus',
          type: 2,
          translationTag: 'field.serviceorder.status'
        }
      }
    ],
    actions: [
      {
        id: 8,
        type: 1,
        referredObjectId: 2,
        param1: '{\n  "to": "cliente@empresa.com",\n  "subject": "Atualização da OS 12345",\n  "body": "Olá, Maria Souza. Sua OS está Concluída."\n}',
        webhook: {
          id: 2,
          description: 'Enviar e-mail ao cliente',
          status: 2,
          path: 'https://api.empresa.com/rest/v1/notify/email',
          method: 2,
          authType: 1,
          authParam1: null,
          authParam2: null,
          authParam3: null,
          authParam4: null,
          notes: 'Envia um e-mail com o resumo da OS ao cliente',
          dateCreated: '2026-10-02T09:00:00.000+00:00',
          dateUpdated: '2026-10-02T09:00:00.000+00:00'
        }
      }
    ]
  },
  {
    id: 9,
    description: 'Avisar cliente sobre início do atendimento',
    status: 2,
    notes: null,
    dateCreated: '2026-10-15T18:20:27.000+00:00',
    dateUpdated: '2026-11-20T08:45:00.000+00:00',
    conditions: [
      {
        id: 9,
        type: 1,
        operator: 3,
        value1: '3',
        value2: null,
        field: {
          id: 1,
          objectType: 1,
          name: 'actstatus',
          type: 2,
          translationTag: 'field.serviceorder.status'
        }
      }
    ],
    actions: [
      {
        id: 9,
        type: 1,
        referredObjectId: 1,
        param1: '{\n  "to": "+55 11 99999-0000",\n  "message": "Sua OS 12345 está Concluída."\n}',
        webhook: {
          id: 1,
          description: 'Enviar SMS ao cliente',
          status: 2,
          path: 'https://api.empresa.com/rest/v1/notify/sms',
          method: 2,
          authType: 1,
          authParam1: null,
          authParam2: null,
          authParam3: null,
          authParam4: null,
          notes: 'Dispara um SMS de atualização ao cliente',
          dateCreated: '2026-10-01T09:00:00.000+00:00',
          dateUpdated: '2026-10-01T09:00:00.000+00:00'
        }
      }
    ]
  },
  {
    id: 10,
    description: 'Registrar no ERP a abertura de nova OS',
    status: 1,
    notes: 'Usado pelo time de atendimento.',
    dateCreated: '2026-10-16T19:20:27.000+00:00',
    dateUpdated: '2026-10-16T19:20:27.000+00:00',
    conditions: [
      {
        id: 10,
        type: 1,
        operator: 3,
        value1: '1',
        value2: null,
        field: {
          id: 1,
          objectType: 1,
          name: 'actstatus',
          type: 2,
          translationTag: 'field.serviceorder.status'
        }
      }
    ],
    actions: [
      {
        id: 10,
        type: 1,
        referredObjectId: 3,
        param1: '{\n  "id": "12345",\n  "status": "Concluída",\n  "valor": "350.00"\n}',
        webhook: {
          id: 3,
          description: 'Atualizar OS no ERP',
          status: 2,
          path: 'https://erp.empresa.com/api/ordens',
          method: 3,
          authType: 3,
          authParam1: 'token-erp-ficticio',
          authParam2: null,
          authParam3: null,
          authParam4: null,
          notes: 'Sincroniza status e valor da OS com o ERP',
          dateCreated: '2026-10-03T09:00:00.000+00:00',
          dateUpdated: '2026-10-03T09:00:00.000+00:00'
        }
      }
    ]
  },
  {
    id: 11,
    description: 'Notificar credenciada sobre OS vinculada',
    status: 2,
    notes: null,
    dateCreated: '2026-10-16T10:20:27.000+00:00',
    dateUpdated: '2026-10-16T10:20:27.000+00:00',
    conditions: [
      {
        id: 11,
        type: 1,
        operator: 3,
        value1: '9',
        value2: null,
        field: {
          id: 1,
          objectType: 1,
          name: 'actstatus',
          type: 2,
          translationTag: 'field.serviceorder.status'
        }
      }
    ],
    actions: [
      {
        id: 11,
        type: 1,
        referredObjectId: 2,
        param1: '{\n  "to": "cliente@empresa.com",\n  "subject": "Atualização da OS 12345",\n  "body": "Olá, Maria Souza. Sua OS está Concluída."\n}',
        webhook: {
          id: 2,
          description: 'Enviar e-mail ao cliente',
          status: 2,
          path: 'https://api.empresa.com/rest/v1/notify/email',
          method: 2,
          authType: 1,
          authParam1: null,
          authParam2: null,
          authParam3: null,
          authParam4: null,
          notes: 'Envia um e-mail com o resumo da OS ao cliente',
          dateCreated: '2026-10-02T09:00:00.000+00:00',
          dateUpdated: '2026-10-02T09:00:00.000+00:00'
        }
      }
    ]
  },
  {
    id: 12,
    description: 'Avisar equipe de suporte sobre OS em suporte',
    status: 3,
    notes: null,
    dateCreated: '2026-10-16T11:20:27.000+00:00',
    dateUpdated: '2026-10-16T11:20:27.000+00:00',
    conditions: [
      {
        id: 12,
        type: 1,
        operator: 3,
        value1: '14',
        value2: null,
        field: {
          id: 1,
          objectType: 1,
          name: 'actstatus',
          type: 2,
          translationTag: 'field.serviceorder.status'
        }
      }
    ],
    actions: [
      {
        id: 12,
        type: 1,
        referredObjectId: 4,
        param1: '{\n  "text": "OS 12345 (Equipe Sul) mudou para Concluída. Técnico: João Lima."\n}',
        webhook: {
          id: 4,
          description: 'Avisar equipe no chat',
          status: 2,
          path: 'https://hooks.chat.empresa.com/services/equipes',
          method: 2,
          authType: 1,
          authParam1: null,
          authParam2: null,
          authParam3: null,
          authParam4: null,
          notes: 'Publica uma mensagem no canal da equipe responsável',
          dateCreated: '2026-10-04T09:00:00.000+00:00',
          dateUpdated: '2026-10-04T09:00:00.000+00:00'
        }
      }
    ]
  },
  {
    id: 13,
    description: 'Confirmar recebimento de OS pré-aberta',
    status: 2,
    notes: 'Usado pelo time de atendimento.',
    dateCreated: '2026-10-17T12:20:27.000+00:00',
    dateUpdated: '2026-11-20T08:45:00.000+00:00',
    conditions: [
      {
        id: 13,
        type: 1,
        operator: 3,
        value1: '13',
        value2: null,
        field: {
          id: 1,
          objectType: 1,
          name: 'actstatus',
          type: 2,
          translationTag: 'field.serviceorder.status'
        }
      }
    ],
    actions: [
      {
        id: 13,
        type: 1,
        referredObjectId: 2,
        param1: '{\n  "to": "cliente@empresa.com",\n  "subject": "Atualização da OS 12345",\n  "body": "Olá, Maria Souza. Sua OS está Concluída."\n}',
        webhook: {
          id: 2,
          description: 'Enviar e-mail ao cliente',
          status: 2,
          path: 'https://api.empresa.com/rest/v1/notify/email',
          method: 2,
          authType: 1,
          authParam1: null,
          authParam2: null,
          authParam3: null,
          authParam4: null,
          notes: 'Envia um e-mail com o resumo da OS ao cliente',
          dateCreated: '2026-10-02T09:00:00.000+00:00',
          dateUpdated: '2026-10-02T09:00:00.000+00:00'
        }
      }
    ]
  },
  {
    id: 14,
    description: 'Alertar fila técnica sobre nova OS aberta fora do horário comercial e sem técnico disponível',
    status: 2,
    notes: null,
    dateCreated: '2026-10-17T13:20:27.000+00:00',
    dateUpdated: '2026-10-17T13:20:27.000+00:00',
    conditions: [
      {
        id: 14,
        type: 1,
        operator: 3,
        value1: '5',
        value2: null,
        field: {
          id: 1,
          objectType: 1,
          name: 'actstatus',
          type: 2,
          translationTag: 'field.serviceorder.status'
        }
      }
    ],
    actions: [
      {
        id: 14,
        type: 1,
        referredObjectId: 4,
        param1: '{\n  "text": "OS 12345 (Equipe Sul) mudou para Concluída. Técnico: João Lima."\n}',
        webhook: {
          id: 4,
          description: 'Avisar equipe no chat',
          status: 2,
          path: 'https://hooks.chat.empresa.com/services/equipes',
          method: 2,
          authType: 1,
          authParam1: null,
          authParam2: null,
          authParam3: null,
          authParam4: null,
          notes: 'Publica uma mensagem no canal da equipe responsável',
          dateCreated: '2026-10-04T09:00:00.000+00:00',
          dateUpdated: '2026-10-04T09:00:00.000+00:00'
        }
      }
    ]
  },
  {
    id: 15,
    description: 'Enviar resumo da OS em análise ao gestor',
    status: 3,
    notes: null,
    dateCreated: '2026-10-17T14:20:27.000+00:00',
    dateUpdated: '2026-10-17T14:20:27.000+00:00',
    conditions: [
      {
        id: 15,
        type: 1,
        operator: 3,
        value1: '10',
        value2: null,
        field: {
          id: 1,
          objectType: 1,
          name: 'actstatus',
          type: 2,
          translationTag: 'field.serviceorder.status'
        }
      }
    ],
    actions: [
      {
        id: 15,
        type: 1,
        referredObjectId: 2,
        param1: '{\n  "to": "cliente@empresa.com",\n  "subject": "Atualização da OS 12345",\n  "body": "Olá, Maria Souza. Sua OS está Concluída."\n}',
        webhook: {
          id: 2,
          description: 'Enviar e-mail ao cliente',
          status: 2,
          path: 'https://api.empresa.com/rest/v1/notify/email',
          method: 2,
          authType: 1,
          authParam1: null,
          authParam2: null,
          authParam3: null,
          authParam4: null,
          notes: 'Envia um e-mail com o resumo da OS ao cliente',
          dateCreated: '2026-10-02T09:00:00.000+00:00',
          dateUpdated: '2026-10-02T09:00:00.000+00:00'
        }
      }
    ]
  },
  {
    id: 16,
    description: 'Notificar cliente sobre reagendamento',
    status: 2,
    notes: 'Usado pelo time de atendimento.',
    dateCreated: '2026-10-18T15:20:27.000+00:00',
    dateUpdated: '2026-10-18T15:20:27.000+00:00',
    conditions: [
      {
        id: 16,
        type: 1,
        operator: 3,
        value1: '2',
        value2: null,
        field: {
          id: 1,
          objectType: 1,
          name: 'actstatus',
          type: 2,
          translationTag: 'field.serviceorder.status'
        }
      }
    ],
    actions: [
      {
        id: 16,
        type: 1,
        referredObjectId: 1,
        param1: '{\n  "to": "+55 11 99999-0000",\n  "message": "Sua OS 12345 está Concluída."\n}',
        webhook: {
          id: 1,
          description: 'Enviar SMS ao cliente',
          status: 2,
          path: 'https://api.empresa.com/rest/v1/notify/sms',
          method: 2,
          authType: 1,
          authParam1: null,
          authParam2: null,
          authParam3: null,
          authParam4: null,
          notes: 'Dispara um SMS de atualização ao cliente',
          dateCreated: '2026-10-01T09:00:00.000+00:00',
          dateUpdated: '2026-10-01T09:00:00.000+00:00'
        }
      }
    ]
  },
  {
    id: 17,
    description: 'Sincronizar valor total com o ERP na conclusão',
    status: 1,
    notes: null,
    dateCreated: '2026-10-18T16:20:27.000+00:00',
    dateUpdated: '2026-11-20T08:45:00.000+00:00',
    conditions: [
      {
        id: 17,
        type: 1,
        operator: 3,
        value1: '7',
        value2: null,
        field: {
          id: 1,
          objectType: 1,
          name: 'actstatus',
          type: 2,
          translationTag: 'field.serviceorder.status'
        }
      }
    ],
    actions: [
      {
        id: 17,
        type: 1,
        referredObjectId: 3,
        param1: '{\n  "id": "12345",\n  "status": "Concluída",\n  "valor": "350.00"\n}',
        webhook: {
          id: 3,
          description: 'Atualizar OS no ERP',
          status: 2,
          path: 'https://erp.empresa.com/api/ordens',
          method: 3,
          authType: 3,
          authParam1: 'token-erp-ficticio',
          authParam2: null,
          authParam3: null,
          authParam4: null,
          notes: 'Sincroniza status e valor da OS com o ERP',
          dateCreated: '2026-10-03T09:00:00.000+00:00',
          dateUpdated: '2026-10-03T09:00:00.000+00:00'
        }
      }
    ]
  },
  {
    id: 18,
    description: 'Avisar equipe sobre OS reaberta',
    status: 3,
    notes: null,
    dateCreated: '2026-10-18T17:20:27.000+00:00',
    dateUpdated: '2026-10-18T17:20:27.000+00:00',
    conditions: [
      {
        id: 18,
        type: 1,
        operator: 3,
        value1: '1',
        value2: null,
        field: {
          id: 1,
          objectType: 1,
          name: 'actstatus',
          type: 2,
          translationTag: 'field.serviceorder.status'
        }
      }
    ],
    actions: [
      {
        id: 18,
        type: 1,
        referredObjectId: 4,
        param1: '{\n  "text": "OS 12345 (Equipe Sul) mudou para Concluída. Técnico: João Lima."\n}',
        webhook: {
          id: 4,
          description: 'Avisar equipe no chat',
          status: 2,
          path: 'https://hooks.chat.empresa.com/services/equipes',
          method: 2,
          authType: 1,
          authParam1: null,
          authParam2: null,
          authParam3: null,
          authParam4: null,
          notes: 'Publica uma mensagem no canal da equipe responsável',
          dateCreated: '2026-10-04T09:00:00.000+00:00',
          dateUpdated: '2026-10-04T09:00:00.000+00:00'
        }
      }
    ]
  },
  {
    id: 19,
    description: 'Enviar SMS de lembrete na véspera da visita',
    status: 2,
    notes: 'Usado pelo time de atendimento.',
    dateCreated: '2026-10-19T18:20:27.000+00:00',
    dateUpdated: '2026-10-19T18:20:27.000+00:00',
    conditions: [
      {
        id: 19,
        type: 1,
        operator: 3,
        value1: '2',
        value2: null,
        field: {
          id: 1,
          objectType: 1,
          name: 'actstatus',
          type: 2,
          translationTag: 'field.serviceorder.status'
        }
      }
    ],
    actions: [
      {
        id: 19,
        type: 1,
        referredObjectId: 1,
        param1: '{\n  "to": "+55 11 99999-0000",\n  "message": "Sua OS 12345 está Concluída."\n}',
        webhook: {
          id: 1,
          description: 'Enviar SMS ao cliente',
          status: 2,
          path: 'https://api.empresa.com/rest/v1/notify/sms',
          method: 2,
          authType: 1,
          authParam1: null,
          authParam2: null,
          authParam3: null,
          authParam4: null,
          notes: 'Dispara um SMS de atualização ao cliente',
          dateCreated: '2026-10-01T09:00:00.000+00:00',
          dateUpdated: '2026-10-01T09:00:00.000+00:00'
        }
      }
    ]
  },
  {
    id: 20,
    description: 'Enviar e-mail com relatório de atendimento, fotos do serviço e assinatura do cliente',
    status: 2,
    notes: null,
    dateCreated: '2026-10-19T19:20:27.000+00:00',
    dateUpdated: '2026-10-19T19:20:27.000+00:00',
    conditions: [
      {
        id: 20,
        type: 1,
        operator: 3,
        value1: '7',
        value2: null,
        field: {
          id: 1,
          objectType: 1,
          name: 'actstatus',
          type: 2,
          translationTag: 'field.serviceorder.status'
        }
      }
    ],
    actions: [
      {
        id: 20,
        type: 1,
        referredObjectId: 2,
        param1: '{\n  "to": "cliente@empresa.com",\n  "subject": "Atualização da OS 12345",\n  "body": "Olá, Maria Souza. Sua OS está Concluída."\n}',
        webhook: {
          id: 2,
          description: 'Enviar e-mail ao cliente',
          status: 2,
          path: 'https://api.empresa.com/rest/v1/notify/email',
          method: 2,
          authType: 1,
          authParam1: null,
          authParam2: null,
          authParam3: null,
          authParam4: null,
          notes: 'Envia um e-mail com o resumo da OS ao cliente',
          dateCreated: '2026-10-02T09:00:00.000+00:00',
          dateUpdated: '2026-10-02T09:00:00.000+00:00'
        }
      }
    ]
  },
  {
    id: 21,
    description: 'Alertar gestor sobre OS aguardando aprovação',
    status: 3,
    notes: null,
    dateCreated: '2026-10-19T10:20:27.000+00:00',
    dateUpdated: '2026-11-20T08:45:00.000+00:00',
    conditions: [
      {
        id: 21,
        type: 1,
        operator: 3,
        value1: '4',
        value2: null,
        field: {
          id: 1,
          objectType: 1,
          name: 'actstatus',
          type: 2,
          translationTag: 'field.serviceorder.status'
        }
      }
    ],
    actions: [
      {
        id: 21,
        type: 1,
        referredObjectId: 2,
        param1: '{\n  "to": "cliente@empresa.com",\n  "subject": "Atualização da OS 12345",\n  "body": "Olá, Maria Souza. Sua OS está Concluída."\n}',
        webhook: {
          id: 2,
          description: 'Enviar e-mail ao cliente',
          status: 2,
          path: 'https://api.empresa.com/rest/v1/notify/email',
          method: 2,
          authType: 1,
          authParam1: null,
          authParam2: null,
          authParam3: null,
          authParam4: null,
          notes: 'Envia um e-mail com o resumo da OS ao cliente',
          dateCreated: '2026-10-02T09:00:00.000+00:00',
          dateUpdated: '2026-10-02T09:00:00.000+00:00'
        }
      }
    ]
  },
  {
    id: 22,
    description: 'Atualizar status no ERP durante o deslocamento',
    status: 3,
    notes: 'Usado pelo time de atendimento.',
    dateCreated: '2026-10-20T11:20:27.000+00:00',
    dateUpdated: '2026-10-20T11:20:27.000+00:00',
    conditions: [
      {
        id: 22,
        type: 1,
        operator: 3,
        value1: '6',
        value2: null,
        field: {
          id: 1,
          objectType: 1,
          name: 'actstatus',
          type: 2,
          translationTag: 'field.serviceorder.status'
        }
      }
    ],
    actions: [
      {
        id: 22,
        type: 1,
        referredObjectId: 3,
        param1: '{\n  "id": "12345",\n  "status": "Concluída",\n  "valor": "350.00"\n}',
        webhook: {
          id: 3,
          description: 'Atualizar OS no ERP',
          status: 2,
          path: 'https://erp.empresa.com/api/ordens',
          method: 3,
          authType: 3,
          authParam1: 'token-erp-ficticio',
          authParam2: null,
          authParam3: null,
          authParam4: null,
          notes: 'Sincroniza status e valor da OS com o ERP',
          dateCreated: '2026-10-03T09:00:00.000+00:00',
          dateUpdated: '2026-10-03T09:00:00.000+00:00'
        }
      }
    ]
  },
  {
    id: 23,
    description: 'Avisar canal da equipe sobre OS concluída',
    status: 2,
    notes: null,
    dateCreated: '2026-10-20T12:20:27.000+00:00',
    dateUpdated: '2026-10-20T12:20:27.000+00:00',
    conditions: [
      {
        id: 23,
        type: 1,
        operator: 3,
        value1: '7',
        value2: null,
        field: {
          id: 1,
          objectType: 1,
          name: 'actstatus',
          type: 2,
          translationTag: 'field.serviceorder.status'
        }
      }
    ],
    actions: [
      {
        id: 23,
        type: 1,
        referredObjectId: 4,
        param1: '{\n  "text": "OS 12345 (Equipe Sul) mudou para Concluída. Técnico: João Lima."\n}',
        webhook: {
          id: 4,
          description: 'Avisar equipe no chat',
          status: 2,
          path: 'https://hooks.chat.empresa.com/services/equipes',
          method: 2,
          authType: 1,
          authParam1: null,
          authParam2: null,
          authParam3: null,
          authParam4: null,
          notes: 'Publica uma mensagem no canal da equipe responsável',
          dateCreated: '2026-10-04T09:00:00.000+00:00',
          dateUpdated: '2026-10-04T09:00:00.000+00:00'
        }
      }
    ]
  },
  {
    id: 24,
    description: 'Notificar cliente sobre OS em análise',
    status: 2,
    notes: null,
    dateCreated: '2026-10-20T13:20:27.000+00:00',
    dateUpdated: '2026-10-20T13:20:27.000+00:00',
    conditions: [
      {
        id: 24,
        type: 1,
        operator: 3,
        value1: '10',
        value2: null,
        field: {
          id: 1,
          objectType: 1,
          name: 'actstatus',
          type: 2,
          translationTag: 'field.serviceorder.status'
        }
      }
    ],
    actions: [
      {
        id: 24,
        type: 1,
        referredObjectId: 1,
        param1: '{\n  "to": "+55 11 99999-0000",\n  "message": "Sua OS 12345 está Concluída."\n}',
        webhook: {
          id: 1,
          description: 'Enviar SMS ao cliente',
          status: 2,
          path: 'https://api.empresa.com/rest/v1/notify/sms',
          method: 2,
          authType: 1,
          authParam1: null,
          authParam2: null,
          authParam3: null,
          authParam4: null,
          notes: 'Dispara um SMS de atualização ao cliente',
          dateCreated: '2026-10-01T09:00:00.000+00:00',
          dateUpdated: '2026-10-01T09:00:00.000+00:00'
        }
      }
    ]
  },
  {
    id: 25,
    description: 'Registrar encerramento da OS no ERP',
    status: 1,
    notes: 'Usado pelo time de atendimento.',
    dateCreated: '2026-10-21T14:20:27.000+00:00',
    dateUpdated: '2026-11-20T08:45:00.000+00:00',
    conditions: [
      {
        id: 25,
        type: 1,
        operator: 3,
        value1: '11',
        value2: null,
        field: {
          id: 1,
          objectType: 1,
          name: 'actstatus',
          type: 2,
          translationTag: 'field.serviceorder.status'
        }
      }
    ],
    actions: [
      {
        id: 25,
        type: 1,
        referredObjectId: 3,
        param1: '{\n  "id": "12345",\n  "status": "Concluída",\n  "valor": "350.00"\n}',
        webhook: {
          id: 3,
          description: 'Atualizar OS no ERP',
          status: 2,
          path: 'https://erp.empresa.com/api/ordens',
          method: 3,
          authType: 3,
          authParam1: 'token-erp-ficticio',
          authParam2: null,
          authParam3: null,
          authParam4: null,
          notes: 'Sincroniza status e valor da OS com o ERP',
          dateCreated: '2026-10-03T09:00:00.000+00:00',
          dateUpdated: '2026-10-03T09:00:00.000+00:00'
        }
      }
    ]
  },
  {
    id: 26,
    description: 'Avisar cliente sobre paralisação do serviço',
    status: 2,
    notes: null,
    dateCreated: '2026-10-21T15:20:27.000+00:00',
    dateUpdated: '2026-10-21T15:20:27.000+00:00',
    conditions: [
      {
        id: 26,
        type: 1,
        operator: 3,
        value1: '12',
        value2: null,
        field: {
          id: 1,
          objectType: 1,
          name: 'actstatus',
          type: 2,
          translationTag: 'field.serviceorder.status'
        }
      }
    ],
    actions: [
      {
        id: 26,
        type: 1,
        referredObjectId: 1,
        param1: '{\n  "to": "+55 11 99999-0000",\n  "message": "Sua OS 12345 está Concluída."\n}',
        webhook: {
          id: 1,
          description: 'Enviar SMS ao cliente',
          status: 2,
          path: 'https://api.empresa.com/rest/v1/notify/sms',
          method: 2,
          authType: 1,
          authParam1: null,
          authParam2: null,
          authParam3: null,
          authParam4: null,
          notes: 'Dispara um SMS de atualização ao cliente',
          dateCreated: '2026-10-01T09:00:00.000+00:00',
          dateUpdated: '2026-10-01T09:00:00.000+00:00'
        }
      }
    ]
  },
  {
    id: 27,
    description: 'Enviar e-mail ao cliente quando a OS for aberta',
    status: 2,
    notes: null,
    dateCreated: '2026-10-21T16:20:27.000+00:00',
    dateUpdated: '2026-10-21T16:20:27.000+00:00',
    conditions: [
      {
        id: 27,
        type: 1,
        operator: 3,
        value1: '1',
        value2: null,
        field: {
          id: 1,
          objectType: 1,
          name: 'actstatus',
          type: 2,
          translationTag: 'field.serviceorder.status'
        }
      }
    ],
    actions: [
      {
        id: 27,
        type: 1,
        referredObjectId: 2,
        param1: '{\n  "to": "cliente@empresa.com",\n  "subject": "Atualização da OS 12345",\n  "body": "Olá, Maria Souza. Sua OS está Concluída."\n}',
        webhook: {
          id: 2,
          description: 'Enviar e-mail ao cliente',
          status: 2,
          path: 'https://api.empresa.com/rest/v1/notify/email',
          method: 2,
          authType: 1,
          authParam1: null,
          authParam2: null,
          authParam3: null,
          authParam4: null,
          notes: 'Envia um e-mail com o resumo da OS ao cliente',
          dateCreated: '2026-10-02T09:00:00.000+00:00',
          dateUpdated: '2026-10-02T09:00:00.000+00:00'
        }
      }
    ]
  },
  {
    id: 28,
    description: 'Alertar suporte sobre OS despachada sem técnico',
    status: 3,
    notes: 'Usado pelo time de atendimento.',
    dateCreated: '2026-10-22T17:20:27.000+00:00',
    dateUpdated: '2026-10-22T17:20:27.000+00:00',
    conditions: [
      {
        id: 28,
        type: 1,
        operator: 3,
        value1: '8',
        value2: null,
        field: {
          id: 1,
          objectType: 1,
          name: 'actstatus',
          type: 2,
          translationTag: 'field.serviceorder.status'
        }
      }
    ],
    actions: [
      {
        id: 28,
        type: 1,
        referredObjectId: 4,
        param1: '{\n  "text": "OS 12345 (Equipe Sul) mudou para Concluída. Técnico: João Lima."\n}',
        webhook: {
          id: 4,
          description: 'Avisar equipe no chat',
          status: 2,
          path: 'https://hooks.chat.empresa.com/services/equipes',
          method: 2,
          authType: 1,
          authParam1: null,
          authParam2: null,
          authParam3: null,
          authParam4: null,
          notes: 'Publica uma mensagem no canal da equipe responsável',
          dateCreated: '2026-10-04T09:00:00.000+00:00',
          dateUpdated: '2026-10-04T09:00:00.000+00:00'
        }
      }
    ]
  },
  {
    id: 29,
    description: 'Notificar credenciada sobre conclusão da OS',
    status: 3,
    notes: null,
    dateCreated: '2026-10-22T18:20:27.000+00:00',
    dateUpdated: '2026-11-20T08:45:00.000+00:00',
    conditions: [
      {
        id: 29,
        type: 1,
        operator: 3,
        value1: '7',
        value2: null,
        field: {
          id: 1,
          objectType: 1,
          name: 'actstatus',
          type: 2,
          translationTag: 'field.serviceorder.status'
        }
      }
    ],
    actions: [
      {
        id: 29,
        type: 1,
        referredObjectId: 2,
        param1: '{\n  "to": "cliente@empresa.com",\n  "subject": "Atualização da OS 12345",\n  "body": "Olá, Maria Souza. Sua OS está Concluída."\n}',
        webhook: {
          id: 2,
          description: 'Enviar e-mail ao cliente',
          status: 2,
          path: 'https://api.empresa.com/rest/v1/notify/email',
          method: 2,
          authType: 1,
          authParam1: null,
          authParam2: null,
          authParam3: null,
          authParam4: null,
          notes: 'Envia um e-mail com o resumo da OS ao cliente',
          dateCreated: '2026-10-02T09:00:00.000+00:00',
          dateUpdated: '2026-10-02T09:00:00.000+00:00'
        }
      }
    ]
  },
  {
    id: 30,
    description: 'Avisar equipe quando o atendimento começar',
    status: 2,
    notes: null,
    dateCreated: '2026-10-22T19:20:27.000+00:00',
    dateUpdated: '2026-10-22T19:20:27.000+00:00',
    conditions: [
      {
        id: 30,
        type: 1,
        operator: 3,
        value1: '3',
        value2: null,
        field: {
          id: 1,
          objectType: 1,
          name: 'actstatus',
          type: 2,
          translationTag: 'field.serviceorder.status'
        }
      }
    ],
    actions: [
      {
        id: 30,
        type: 1,
        referredObjectId: 4,
        param1: '{\n  "text": "OS 12345 (Equipe Sul) mudou para Concluída. Técnico: João Lima."\n}',
        webhook: {
          id: 4,
          description: 'Avisar equipe no chat',
          status: 2,
          path: 'https://hooks.chat.empresa.com/services/equipes',
          method: 2,
          authType: 1,
          authParam1: null,
          authParam2: null,
          authParam3: null,
          authParam4: null,
          notes: 'Publica uma mensagem no canal da equipe responsável',
          dateCreated: '2026-10-04T09:00:00.000+00:00',
          dateUpdated: '2026-10-04T09:00:00.000+00:00'
        }
      }
    ]
  }
];
