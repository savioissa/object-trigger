import { FormArray } from '@angular/forms';

import { ajustar } from '../../../../prototipador/teste/ajustar';
import { AcaoForm, criarAcaoForm } from '../../object-trigger-form.factory';
import { deWebhookDTO } from '../../object-trigger.conversao';
import { WEBHOOKS_MOCK } from '../../object-trigger.mock';
import { ObjectTriggerActionGroupComponent } from './object-trigger-action-group.component';

/** Mocks da API no modelo da tela. */
const webhooks = () => WEBHOOKS_MOCK.map(deWebhookDTO);

/** Lista com as ações informadas; cada estado recebe um FormArray novo. */
function lista(somenteLeitura: boolean, ...acoes: AcaoForm[]) {
  const array = new FormArray<AcaoForm>(acoes);
  if (somenteLeitura) {
    array.disable();
  }
  return { acoes: array, webhooks: webhooks(), somenteLeitura };
}

/* Os estados de uma ação sozinha (sem webhook, corpo vazio, JSON inválido...) ficam em
   object-trigger-action.proto.ts. */
export default ajustar(ObjectTriggerActionGroupComponent, {
  estados: {
    'Sem ações': { descricao: 'Só o botão "Adicionar ação".', inputs: () => lista(false) },
    'Várias ações': {
      inputs: () =>
        lista(
          false,
          criarAcaoForm({ webhookId: '1', corpo: webhooks()[0].corpoPadrao }),
          criarAcaoForm({ webhookId: '3', corpo: webhooks()[2].corpoPadrao }),
          criarAcaoForm()
        )
    },
    'Somente leitura': {
      descricao: 'Sem lixeira e sem "Adicionar ação"; campos desabilitados.',
      inputs: () => lista(true, criarAcaoForm({ webhookId: '1', corpo: webhooks()[0].corpoPadrao }))
    },
    'Somente leitura, sem ações': { descricao: 'Mostra "Nenhuma ação".', inputs: () => lista(true) }
  }
});
