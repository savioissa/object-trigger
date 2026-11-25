import { ajustar } from '../../../../prototipador/teste/ajustar';
import { criarAcaoForm } from '../../object-trigger-form.factory';
import { deWebhookDTO } from '../../object-trigger.conversao';
import { WEBHOOKS_MOCK } from '../../object-trigger.mock';
import { ObjectTriggerActionComponent } from './object-trigger-action.component';

/** Mocks da API no modelo da tela. */
const webhooks = () => WEBHOOKS_MOCK.map(deWebhookDTO);

function comCorpo(corpo: string) {
  const form = criarAcaoForm({ webhookId: '1', corpo });
  form.markAllAsTouched();
  return form;
}

export default ajustar(ObjectTriggerActionComponent, {
  estados: {
    'Sem webhook': {
      descricao: 'Só Tipo e Valor, com o placeholder "Selecione o webhook".',
      inputs: () => ({ form: criarAcaoForm(), webhooks: webhooks() })
    },
    'Com webhook': {
      descricao: 'Bloco de detalhes com URL, descrição, método e o corpo modelo.',
      inputs: () => ({ form: criarAcaoForm({ webhookId: '1', corpo: webhooks()[0].corpoPadrao }), webhooks: webhooks() })
    },
    'Método PUT': {
      inputs: () => ({ form: criarAcaoForm({ webhookId: '3', corpo: webhooks()[2].corpoPadrao }), webhooks: webhooks() })
    },
    'Corpo vazio': {
      descricao: 'Com webhook, o corpo ficou vazio e o usuário saiu do campo.',
      inputs: () => ({ form: comCorpo(''), webhooks: webhooks() })
    },
    'JSON inválido': {
      descricao: 'Com webhook, o corpo não é JSON válido e o usuário saiu do campo.',
      inputs: () => ({ form: comCorpo('{\n  "to": "+55 11 99999-0000",\n}'), webhooks: webhooks() })
    },
    'Somente leitura': {
      descricao: 'Página do gatilho fora da edição: campos desabilitados.',
      inputs: () => {
        const form = criarAcaoForm({ webhookId: '1', corpo: webhooks()[0].corpoPadrao });
        form.disable();
        return { form, webhooks: webhooks() };
      }
    },
    'Sem webhooks cadastrados': {
      descricao: 'A lista mostra "Nenhum resultado encontrado".',
      inputs: () => ({ form: criarAcaoForm(), webhooks: [] })
    }
  }
});
