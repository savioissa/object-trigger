import { ajustar } from '../../../../prototipador/teste/ajustar';
import { criarAcaoForm } from '../../object-trigger-form.factory';
import { WEBHOOKS_MOCK } from '../../object-trigger.mock';
import { ObjectTriggerActionComponent } from './object-trigger-action.component';

function comCorpo(corpo: string) {
  const form = criarAcaoForm({ webhookId: 'wh-sms-cliente', corpo });
  form.markAllAsTouched();
  return form;
}

export default ajustar(ObjectTriggerActionComponent, {
  estados: {
    'Sem webhook': {
      descricao: 'Só Tipo e Valor, com o placeholder "Selecione o webhook".',
      inputs: () => ({ form: criarAcaoForm(), webhooks: WEBHOOKS_MOCK })
    },
    'Com webhook': {
      descricao: 'Bloco de detalhes com URL, descrição, método e o corpo modelo.',
      inputs: () => ({ form: criarAcaoForm({ webhookId: 'wh-sms-cliente', corpo: WEBHOOKS_MOCK[0].corpoPadrao }), webhooks: WEBHOOKS_MOCK })
    },
    'Método PUT': {
      inputs: () => ({ form: criarAcaoForm({ webhookId: 'wh-erp-os', corpo: WEBHOOKS_MOCK[2].corpoPadrao }), webhooks: WEBHOOKS_MOCK })
    },
    'Corpo vazio': {
      descricao: 'Com webhook, o corpo ficou vazio e o usuário saiu do campo.',
      inputs: () => ({ form: comCorpo(''), webhooks: WEBHOOKS_MOCK })
    },
    'JSON inválido': {
      descricao: 'Com webhook, o corpo não é JSON válido e o usuário saiu do campo.',
      inputs: () => ({ form: comCorpo('{\n  "to": "{{os.cliente.telefone}}",\n}'), webhooks: WEBHOOKS_MOCK })
    },
    'Sem webhooks cadastrados': {
      descricao: 'A lista mostra "Nenhum resultado encontrado".',
      inputs: () => ({ form: criarAcaoForm(), webhooks: [] })
    }
  }
});
