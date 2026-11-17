import { GrupoCategoria, GrupoPlaceholder, ObjectTrigger, Webhook } from './object-trigger.model';

/* Dados fictícios usados pelo ObjectTriggerService enquanto a API não existe.
   Os textos aqui simulam o que a API devolveria, por isso não passam pelo arquivo de tradução.
   Só valores fixos (sem funções nem constantes): a aba Dados do prototipador lê este arquivo. */

export const CATEGORIAS_MOCK: GrupoCategoria[] = [
  {
    label: 'Ordem de serviço',
    itens: [
      {
        id: 'os.status',
        label: 'Status',
        grupo: 'Ordem de serviço',
        tipo: 'LISTA',
        valores: [
          {
            id: 'ABERTA',
            label: 'Aberta'
          },
          {
            id: 'AGENDADA',
            label: 'Agendada'
          },
          {
            id: 'ATENDIMENTO',
            label: 'Atendimento'
          },
          {
            id: 'APROVACAO',
            label: 'Aprovação'
          },
          {
            id: 'FILA_TECNICO',
            label: 'Fila técnico'
          },
          {
            id: 'DESLOCAMENTO',
            label: 'Deslocamento'
          },
          {
            id: 'DESPACHADA',
            label: 'Despachada'
          },
          {
            id: 'VINCULADA_CREDENCIADA',
            label: 'Vinculada credenciada'
          },
          {
            id: 'EM_ANALISE',
            label: 'Em análise'
          },
          {
            id: 'CONCLUIDA',
            label: 'Concluída'
          },
          {
            id: 'ENCERRADA',
            label: 'Encerrada'
          },
          {
            id: 'PARALISADA',
            label: 'Paralisada'
          },
          {
            id: 'PRE_ABERTA',
            label: 'Pré-aberta'
          },
          {
            id: 'SUPORTE',
            label: 'Suporte'
          }
        ]
      }
    ]
  }
];

export const WEBHOOKS_MOCK: Webhook[] = [
  {
    id: 'wh-sms-cliente',
    nome: 'Enviar SMS ao cliente',
    url: 'https://api.empresa.com/rest/v1/notify/sms',
    descricao: 'Dispara um SMS de atualização ao cliente',
    metodo: 'POST',
    corpoPadrao: '{\n  "to": "{{os.cliente.telefone}}",\n  "message": "Sua OS {{os.id}} está {{os.status}}."\n}'
  },
  {
    id: 'wh-email-cliente',
    nome: 'Enviar e-mail ao cliente',
    url: 'https://api.empresa.com/rest/v1/notify/email',
    descricao: 'Envia um e-mail com o resumo da OS ao cliente',
    metodo: 'POST',
    corpoPadrao: '{\n  "to": "{{os.cliente.email}}",\n  "subject": "Atualização da OS {{os.id}}",\n  "body": "Olá, {{os.cliente.nome}}. Sua OS está {{os.status}}."\n}'
  },
  {
    id: 'wh-erp-os',
    nome: 'Atualizar OS no ERP',
    url: 'https://erp.empresa.com/api/ordens',
    descricao: 'Sincroniza status e valor da OS com o ERP',
    metodo: 'PUT',
    corpoPadrao: '{\n  "id": "{{os.id}}",\n  "status": "{{os.status}}",\n  "valor": "{{os.valor_total}}"\n}'
  },
  {
    id: 'wh-chat-equipe',
    nome: 'Avisar equipe no chat',
    url: 'https://hooks.chat.empresa.com/services/equipes',
    descricao: 'Publica uma mensagem no canal da equipe responsável',
    metodo: 'POST',
    corpoPadrao: '{\n  "text": "OS {{os.id}} ({{os.equipe}}) mudou para {{os.status}}. Técnico: {{os.tecnico.nome}}."\n}'
  }
];

export const PLACEHOLDERS_MOCK: GrupoPlaceholder[] = [
  {
    id: 'os',
    label: 'Ordem de serviço',
    itens: [
      {
        label: 'ID da OS',
        chave: 'os.id',
        token: '{{os.id}}'
      },
      {
        label: 'Status',
        chave: 'os.status',
        token: '{{os.status}}'
      },
      {
        label: 'Equipe',
        chave: 'os.equipe',
        token: '{{os.equipe}}'
      },
      {
        label: 'Data de abertura',
        chave: 'os.data_abertura',
        token: '{{os.data_abertura}}'
      },
      {
        label: 'Data de conclusão',
        chave: 'os.data_conclusao',
        token: '{{os.data_conclusao}}'
      },
      {
        label: 'Valor total',
        chave: 'os.valor_total',
        token: '{{os.valor_total}}'
      }
    ]
  },
  {
    id: 'cliente',
    label: 'Cliente',
    itens: [
      {
        label: 'Nome',
        chave: 'os.cliente.nome',
        token: '{{os.cliente.nome}}'
      },
      {
        label: 'Telefone',
        chave: 'os.cliente.telefone',
        token: '{{os.cliente.telefone}}'
      },
      {
        label: 'E-mail',
        chave: 'os.cliente.email',
        token: '{{os.cliente.email}}'
      },
      {
        label: 'Endereço',
        chave: 'os.cliente.endereco',
        token: '{{os.cliente.endereco}}'
      },
      {
        label: 'Cidade',
        chave: 'os.cliente.cidade',
        token: '{{os.cliente.cidade}}'
      }
    ]
  },
  {
    id: 'tecnico',
    label: 'Técnico',
    itens: [
      {
        label: 'Nome',
        chave: 'os.tecnico.nome',
        token: '{{os.tecnico.nome}}'
      },
      {
        label: 'Telefone',
        chave: 'os.tecnico.telefone',
        token: '{{os.tecnico.telefone}}'
      },
      {
        label: 'E-mail',
        chave: 'os.tecnico.email',
        token: '{{os.tecnico.email}}'
      }
    ]
  }
];

/** Gatilhos já cadastrados: lista de gatilhos, página do gatilho e relacionamentos na aba Dados. */
export const OBJECT_TRIGGERS_MOCK: ObjectTrigger[] = [
  {
    id: 'ot-001',
    descricao: 'Avisar cliente quando a OS for concluída',
    status: 'ATIVO',
    observacoes: 'Usado pelo time de atendimento.',
    condicoes: {
      todas: [
        {
          categoriaId: 'os.status',
          operador: 'ALTERADO_PARA',
          valor: 'CONCLUIDA'
        }
      ],
      qualquer: []
    },
    acoes: [
      {
        tipo: 'WEBHOOK',
        webhookId: 'wh-sms-cliente',
        corpo: '{\n  "to": "{{os.cliente.telefone}}",\n  "message": "Sua OS {{os.id}} está {{os.status}}."\n}'
      }
    ]
  },
  {
    id: 'ot-002',
    descricao: 'Sincronizar OS encerrada ou paralisada com o ERP',
    status: 'INATIVO',
    observacoes: null,
    condicoes: {
      todas: [
        {
          categoriaId: 'os.status',
          operador: 'ALTERADO_PARA',
          valor: 'ENCERRADA'
        }
      ],
      qualquer: []
    },
    acoes: [
      {
        tipo: 'WEBHOOK',
        webhookId: 'wh-erp-os',
        corpo: '{\n  "id": "{{os.id}}",\n  "status": "{{os.status}}",\n  "valor": "{{os.valor_total}}"\n}'
      }
    ]
  },
  {
    id: 'ot-003',
    descricao: 'Enviar e-mail de confirmação no agendamento',
    status: 'ATIVO',
    observacoes: null,
    condicoes: {
      todas: [
        {
          categoriaId: 'os.status',
          operador: 'ALTERADO_PARA',
          valor: 'AGENDADA'
        }
      ],
      qualquer: []
    },
    acoes: [
      {
        tipo: 'WEBHOOK',
        webhookId: 'wh-email-cliente',
        corpo: '{\n  "to": "{{os.cliente.email}}",\n  "subject": "Atualização da OS {{os.id}}",\n  "body": "Olá, {{os.cliente.nome}}. Sua OS está {{os.status}}."\n}'
      }
    ]
  },
  {
    id: 'ot-004',
    descricao: 'Avisar equipe quando a OS entrar em aprovação',
    status: 'ATIVO',
    observacoes: 'Usado pelo time de atendimento.',
    condicoes: {
      todas: [
        {
          categoriaId: 'os.status',
          operador: 'ALTERADO_PARA',
          valor: 'APROVACAO'
        }
      ],
      qualquer: []
    },
    acoes: [
      {
        tipo: 'WEBHOOK',
        webhookId: 'wh-chat-equipe',
        corpo: '{\n  "text": "OS {{os.id}} ({{os.equipe}}) mudou para {{os.status}}. Técnico: {{os.tecnico.nome}}."\n}'
      }
    ]
  },
  {
    id: 'ot-005',
    descricao: 'Notificar cliente sobre técnico a caminho',
    status: 'ATIVO',
    observacoes: null,
    condicoes: {
      todas: [
        {
          categoriaId: 'os.status',
          operador: 'ALTERADO_PARA',
          valor: 'DESLOCAMENTO'
        }
      ],
      qualquer: []
    },
    acoes: [
      {
        tipo: 'WEBHOOK',
        webhookId: 'wh-sms-cliente',
        corpo: '{\n  "to": "{{os.cliente.telefone}}",\n  "message": "Sua OS {{os.id}} está {{os.status}}."\n}'
      }
    ]
  },
  {
    id: 'ot-006',
    descricao: 'Atualizar ERP quando a OS for despachada',
    status: 'ATIVO',
    observacoes: null,
    condicoes: {
      todas: [
        {
          categoriaId: 'os.status',
          operador: 'ALTERADO_PARA',
          valor: 'DESPACHADA'
        }
      ],
      qualquer: []
    },
    acoes: [
      {
        tipo: 'WEBHOOK',
        webhookId: 'wh-erp-os',
        corpo: '{\n  "id": "{{os.id}}",\n  "status": "{{os.status}}",\n  "valor": "{{os.valor_total}}"\n}'
      }
    ]
  },
  {
    id: 'ot-007',
    descricao: 'Alertar supervisão sobre OS paralisada',
    status: 'ATIVO',
    observacoes: 'Usado pelo time de atendimento.',
    condicoes: {
      todas: [
        {
          categoriaId: 'os.status',
          operador: 'ALTERADO_PARA',
          valor: 'PARALISADA'
        }
      ],
      qualquer: []
    },
    acoes: [
      {
        tipo: 'WEBHOOK',
        webhookId: 'wh-chat-equipe',
        corpo: '{\n  "text": "OS {{os.id}} ({{os.equipe}}) mudou para {{os.status}}. Técnico: {{os.tecnico.nome}}."\n}'
      }
    ]
  },
  {
    id: 'ot-008',
    descricao: 'Enviar pesquisa de satisfação após encerramento',
    status: 'INATIVO',
    observacoes: null,
    condicoes: {
      todas: [
        {
          categoriaId: 'os.status',
          operador: 'ALTERADO_PARA',
          valor: 'ENCERRADA'
        }
      ],
      qualquer: []
    },
    acoes: [
      {
        tipo: 'WEBHOOK',
        webhookId: 'wh-email-cliente',
        corpo: '{\n  "to": "{{os.cliente.email}}",\n  "subject": "Atualização da OS {{os.id}}",\n  "body": "Olá, {{os.cliente.nome}}. Sua OS está {{os.status}}."\n}'
      }
    ]
  },
  {
    id: 'ot-009',
    descricao: 'Avisar cliente sobre início do atendimento',
    status: 'ATIVO',
    observacoes: null,
    condicoes: {
      todas: [
        {
          categoriaId: 'os.status',
          operador: 'ALTERADO_PARA',
          valor: 'ATENDIMENTO'
        }
      ],
      qualquer: []
    },
    acoes: [
      {
        tipo: 'WEBHOOK',
        webhookId: 'wh-sms-cliente',
        corpo: '{\n  "to": "{{os.cliente.telefone}}",\n  "message": "Sua OS {{os.id}} está {{os.status}}."\n}'
      }
    ]
  },
  {
    id: 'ot-010',
    descricao: 'Registrar no ERP a abertura de nova OS',
    status: 'ATIVO',
    observacoes: 'Usado pelo time de atendimento.',
    condicoes: {
      todas: [
        {
          categoriaId: 'os.status',
          operador: 'ALTERADO_PARA',
          valor: 'ABERTA'
        }
      ],
      qualquer: []
    },
    acoes: [
      {
        tipo: 'WEBHOOK',
        webhookId: 'wh-erp-os',
        corpo: '{\n  "id": "{{os.id}}",\n  "status": "{{os.status}}",\n  "valor": "{{os.valor_total}}"\n}'
      }
    ]
  },
  {
    id: 'ot-011',
    descricao: 'Notificar credenciada sobre OS vinculada',
    status: 'ATIVO',
    observacoes: null,
    condicoes: {
      todas: [
        {
          categoriaId: 'os.status',
          operador: 'ALTERADO_PARA',
          valor: 'VINCULADA_CREDENCIADA'
        }
      ],
      qualquer: []
    },
    acoes: [
      {
        tipo: 'WEBHOOK',
        webhookId: 'wh-email-cliente',
        corpo: '{\n  "to": "{{os.cliente.email}}",\n  "subject": "Atualização da OS {{os.id}}",\n  "body": "Olá, {{os.cliente.nome}}. Sua OS está {{os.status}}."\n}'
      }
    ]
  },
  {
    id: 'ot-012',
    descricao: 'Avisar equipe de suporte sobre OS em suporte',
    status: 'INATIVO',
    observacoes: null,
    condicoes: {
      todas: [
        {
          categoriaId: 'os.status',
          operador: 'ALTERADO_PARA',
          valor: 'SUPORTE'
        }
      ],
      qualquer: []
    },
    acoes: [
      {
        tipo: 'WEBHOOK',
        webhookId: 'wh-chat-equipe',
        corpo: '{\n  "text": "OS {{os.id}} ({{os.equipe}}) mudou para {{os.status}}. Técnico: {{os.tecnico.nome}}."\n}'
      }
    ]
  },
  {
    id: 'ot-013',
    descricao: 'Confirmar recebimento de OS pré-aberta',
    status: 'ATIVO',
    observacoes: 'Usado pelo time de atendimento.',
    condicoes: {
      todas: [
        {
          categoriaId: 'os.status',
          operador: 'ALTERADO_PARA',
          valor: 'PRE_ABERTA'
        }
      ],
      qualquer: []
    },
    acoes: [
      {
        tipo: 'WEBHOOK',
        webhookId: 'wh-email-cliente',
        corpo: '{\n  "to": "{{os.cliente.email}}",\n  "subject": "Atualização da OS {{os.id}}",\n  "body": "Olá, {{os.cliente.nome}}. Sua OS está {{os.status}}."\n}'
      }
    ]
  },
  {
    id: 'ot-014',
    descricao: 'Alertar fila técnica sobre nova OS aberta fora do horário comercial e sem técnico disponível',
    status: 'ATIVO',
    observacoes: null,
    condicoes: {
      todas: [
        {
          categoriaId: 'os.status',
          operador: 'ALTERADO_PARA',
          valor: 'FILA_TECNICO'
        }
      ],
      qualquer: []
    },
    acoes: [
      {
        tipo: 'WEBHOOK',
        webhookId: 'wh-chat-equipe',
        corpo: '{\n  "text": "OS {{os.id}} ({{os.equipe}}) mudou para {{os.status}}. Técnico: {{os.tecnico.nome}}."\n}'
      }
    ]
  },
  {
    id: 'ot-015',
    descricao: 'Enviar resumo da OS em análise ao gestor',
    status: 'INATIVO',
    observacoes: null,
    condicoes: {
      todas: [
        {
          categoriaId: 'os.status',
          operador: 'ALTERADO_PARA',
          valor: 'EM_ANALISE'
        }
      ],
      qualquer: []
    },
    acoes: [
      {
        tipo: 'WEBHOOK',
        webhookId: 'wh-email-cliente',
        corpo: '{\n  "to": "{{os.cliente.email}}",\n  "subject": "Atualização da OS {{os.id}}",\n  "body": "Olá, {{os.cliente.nome}}. Sua OS está {{os.status}}."\n}'
      }
    ]
  },
  {
    id: 'ot-016',
    descricao: 'Notificar cliente sobre reagendamento',
    status: 'ATIVO',
    observacoes: 'Usado pelo time de atendimento.',
    condicoes: {
      todas: [
        {
          categoriaId: 'os.status',
          operador: 'ALTERADO_PARA',
          valor: 'AGENDADA'
        }
      ],
      qualquer: []
    },
    acoes: [
      {
        tipo: 'WEBHOOK',
        webhookId: 'wh-sms-cliente',
        corpo: '{\n  "to": "{{os.cliente.telefone}}",\n  "message": "Sua OS {{os.id}} está {{os.status}}."\n}'
      }
    ]
  },
  {
    id: 'ot-017',
    descricao: 'Sincronizar valor total com o ERP na conclusão',
    status: 'ATIVO',
    observacoes: null,
    condicoes: {
      todas: [
        {
          categoriaId: 'os.status',
          operador: 'ALTERADO_PARA',
          valor: 'CONCLUIDA'
        }
      ],
      qualquer: []
    },
    acoes: [
      {
        tipo: 'WEBHOOK',
        webhookId: 'wh-erp-os',
        corpo: '{\n  "id": "{{os.id}}",\n  "status": "{{os.status}}",\n  "valor": "{{os.valor_total}}"\n}'
      }
    ]
  },
  {
    id: 'ot-018',
    descricao: 'Avisar equipe sobre OS reaberta',
    status: 'INATIVO',
    observacoes: null,
    condicoes: {
      todas: [
        {
          categoriaId: 'os.status',
          operador: 'ALTERADO_PARA',
          valor: 'ABERTA'
        }
      ],
      qualquer: []
    },
    acoes: [
      {
        tipo: 'WEBHOOK',
        webhookId: 'wh-chat-equipe',
        corpo: '{\n  "text": "OS {{os.id}} ({{os.equipe}}) mudou para {{os.status}}. Técnico: {{os.tecnico.nome}}."\n}'
      }
    ]
  },
  {
    id: 'ot-019',
    descricao: 'Enviar SMS de lembrete na véspera da visita',
    status: 'ATIVO',
    observacoes: 'Usado pelo time de atendimento.',
    condicoes: {
      todas: [
        {
          categoriaId: 'os.status',
          operador: 'ALTERADO_PARA',
          valor: 'AGENDADA'
        }
      ],
      qualquer: []
    },
    acoes: [
      {
        tipo: 'WEBHOOK',
        webhookId: 'wh-sms-cliente',
        corpo: '{\n  "to": "{{os.cliente.telefone}}",\n  "message": "Sua OS {{os.id}} está {{os.status}}."\n}'
      }
    ]
  },
  {
    id: 'ot-020',
    descricao: 'Enviar e-mail com relatório de atendimento, fotos do serviço e assinatura do cliente',
    status: 'ATIVO',
    observacoes: null,
    condicoes: {
      todas: [
        {
          categoriaId: 'os.status',
          operador: 'ALTERADO_PARA',
          valor: 'CONCLUIDA'
        }
      ],
      qualquer: []
    },
    acoes: [
      {
        tipo: 'WEBHOOK',
        webhookId: 'wh-email-cliente',
        corpo: '{\n  "to": "{{os.cliente.email}}",\n  "subject": "Atualização da OS {{os.id}}",\n  "body": "Olá, {{os.cliente.nome}}. Sua OS está {{os.status}}."\n}'
      }
    ]
  },
  {
    id: 'ot-021',
    descricao: 'Alertar gestor sobre OS aguardando aprovação',
    status: 'INATIVO',
    observacoes: null,
    condicoes: {
      todas: [
        {
          categoriaId: 'os.status',
          operador: 'ALTERADO_PARA',
          valor: 'APROVACAO'
        }
      ],
      qualquer: []
    },
    acoes: [
      {
        tipo: 'WEBHOOK',
        webhookId: 'wh-email-cliente',
        corpo: '{\n  "to": "{{os.cliente.email}}",\n  "subject": "Atualização da OS {{os.id}}",\n  "body": "Olá, {{os.cliente.nome}}. Sua OS está {{os.status}}."\n}'
      }
    ]
  },
  {
    id: 'ot-022',
    descricao: 'Atualizar status no ERP durante o deslocamento',
    status: 'INATIVO',
    observacoes: 'Usado pelo time de atendimento.',
    condicoes: {
      todas: [
        {
          categoriaId: 'os.status',
          operador: 'ALTERADO_PARA',
          valor: 'DESLOCAMENTO'
        }
      ],
      qualquer: []
    },
    acoes: [
      {
        tipo: 'WEBHOOK',
        webhookId: 'wh-erp-os',
        corpo: '{\n  "id": "{{os.id}}",\n  "status": "{{os.status}}",\n  "valor": "{{os.valor_total}}"\n}'
      }
    ]
  },
  {
    id: 'ot-023',
    descricao: 'Avisar canal da equipe sobre OS concluída',
    status: 'ATIVO',
    observacoes: null,
    condicoes: {
      todas: [
        {
          categoriaId: 'os.status',
          operador: 'ALTERADO_PARA',
          valor: 'CONCLUIDA'
        }
      ],
      qualquer: []
    },
    acoes: [
      {
        tipo: 'WEBHOOK',
        webhookId: 'wh-chat-equipe',
        corpo: '{\n  "text": "OS {{os.id}} ({{os.equipe}}) mudou para {{os.status}}. Técnico: {{os.tecnico.nome}}."\n}'
      }
    ]
  },
  {
    id: 'ot-024',
    descricao: 'Notificar cliente sobre OS em análise',
    status: 'ATIVO',
    observacoes: null,
    condicoes: {
      todas: [
        {
          categoriaId: 'os.status',
          operador: 'ALTERADO_PARA',
          valor: 'EM_ANALISE'
        }
      ],
      qualquer: []
    },
    acoes: [
      {
        tipo: 'WEBHOOK',
        webhookId: 'wh-sms-cliente',
        corpo: '{\n  "to": "{{os.cliente.telefone}}",\n  "message": "Sua OS {{os.id}} está {{os.status}}."\n}'
      }
    ]
  },
  {
    id: 'ot-025',
    descricao: 'Registrar encerramento da OS no ERP',
    status: 'ATIVO',
    observacoes: 'Usado pelo time de atendimento.',
    condicoes: {
      todas: [
        {
          categoriaId: 'os.status',
          operador: 'ALTERADO_PARA',
          valor: 'ENCERRADA'
        }
      ],
      qualquer: []
    },
    acoes: [
      {
        tipo: 'WEBHOOK',
        webhookId: 'wh-erp-os',
        corpo: '{\n  "id": "{{os.id}}",\n  "status": "{{os.status}}",\n  "valor": "{{os.valor_total}}"\n}'
      }
    ]
  },
  {
    id: 'ot-026',
    descricao: 'Avisar cliente sobre paralisação do serviço',
    status: 'ATIVO',
    observacoes: null,
    condicoes: {
      todas: [
        {
          categoriaId: 'os.status',
          operador: 'ALTERADO_PARA',
          valor: 'PARALISADA'
        }
      ],
      qualquer: []
    },
    acoes: [
      {
        tipo: 'WEBHOOK',
        webhookId: 'wh-sms-cliente',
        corpo: '{\n  "to": "{{os.cliente.telefone}}",\n  "message": "Sua OS {{os.id}} está {{os.status}}."\n}'
      }
    ]
  },
  {
    id: 'ot-027',
    descricao: 'Enviar e-mail ao cliente quando a OS for aberta',
    status: 'ATIVO',
    observacoes: null,
    condicoes: {
      todas: [
        {
          categoriaId: 'os.status',
          operador: 'ALTERADO_PARA',
          valor: 'ABERTA'
        }
      ],
      qualquer: []
    },
    acoes: [
      {
        tipo: 'WEBHOOK',
        webhookId: 'wh-email-cliente',
        corpo: '{\n  "to": "{{os.cliente.email}}",\n  "subject": "Atualização da OS {{os.id}}",\n  "body": "Olá, {{os.cliente.nome}}. Sua OS está {{os.status}}."\n}'
      }
    ]
  },
  {
    id: 'ot-028',
    descricao: 'Alertar suporte sobre OS despachada sem técnico',
    status: 'INATIVO',
    observacoes: 'Usado pelo time de atendimento.',
    condicoes: {
      todas: [
        {
          categoriaId: 'os.status',
          operador: 'ALTERADO_PARA',
          valor: 'DESPACHADA'
        }
      ],
      qualquer: []
    },
    acoes: [
      {
        tipo: 'WEBHOOK',
        webhookId: 'wh-chat-equipe',
        corpo: '{\n  "text": "OS {{os.id}} ({{os.equipe}}) mudou para {{os.status}}. Técnico: {{os.tecnico.nome}}."\n}'
      }
    ]
  },
  {
    id: 'ot-029',
    descricao: 'Notificar credenciada sobre conclusão da OS',
    status: 'INATIVO',
    observacoes: null,
    condicoes: {
      todas: [
        {
          categoriaId: 'os.status',
          operador: 'ALTERADO_PARA',
          valor: 'CONCLUIDA'
        }
      ],
      qualquer: []
    },
    acoes: [
      {
        tipo: 'WEBHOOK',
        webhookId: 'wh-email-cliente',
        corpo: '{\n  "to": "{{os.cliente.email}}",\n  "subject": "Atualização da OS {{os.id}}",\n  "body": "Olá, {{os.cliente.nome}}. Sua OS está {{os.status}}."\n}'
      }
    ]
  },
  {
    id: 'ot-030',
    descricao: 'Avisar equipe quando o atendimento começar',
    status: 'ATIVO',
    observacoes: null,
    condicoes: {
      todas: [
        {
          categoriaId: 'os.status',
          operador: 'ALTERADO_PARA',
          valor: 'ATENDIMENTO'
        }
      ],
      qualquer: []
    },
    acoes: [
      {
        tipo: 'WEBHOOK',
        webhookId: 'wh-chat-equipe',
        corpo: '{\n  "text": "OS {{os.id}} ({{os.equipe}}) mudou para {{os.status}}. Técnico: {{os.tecnico.nome}}."\n}'
      }
    ]
  }
];
