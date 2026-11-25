import { ajustar } from '../../../../prototipador/teste/ajustar';
import { criarObjectTriggerForm, definirSomenteLeitura, preencherObjectTriggerForm } from '../../object-trigger-form.factory';
import { deCamposDTO, deObjectTriggerDTO, deWebhookDTO } from '../../object-trigger.conversao';
import { OBJECT_TRIGGERS_MOCK, OBJECT_TRIGGER_FIELDS_MOCK, WEBHOOKS_MOCK } from '../../object-trigger.mock';
import { ObjectTriggerFormComponent } from './object-trigger-form.component';

/** Mocks da API no modelo da tela. */
const categorias = () => deCamposDTO(OBJECT_TRIGGER_FIELDS_MOCK);
const gatilho = (indice: number) => deObjectTriggerDTO(OBJECT_TRIGGERS_MOCK[indice]);
const webhooks = () => WEBHOOKS_MOCK.map(deWebhookDTO);

const opcoes = { categorias: categorias(), webhooks: webhooks() };

function preenchido(somenteLeitura: boolean) {
  const form = criarObjectTriggerForm();
  preencherObjectTriggerForm(form, gatilho(1));
  definirSomenteLeitura(form, somenteLeitura);
  return form;
}

export default ajustar(ObjectTriggerFormComponent, {
  estados: {
    'Vazio': { descricao: 'Como na página de criação.', inputs: () => ({ ...opcoes, form: criarObjectTriggerForm() }) },
    'Somente leitura': { inputs: () => ({ ...opcoes, form: preenchido(true), somenteLeitura: true }) },
    'Somente leitura, blocos vazios': {
      descricao: 'Bloco e seção sem itens mostram "Nenhuma condição" e "Nenhuma ação".',
      inputs: () => {
        const form = criarObjectTriggerForm();
        preencherObjectTriggerForm(form, { ...gatilho(0), acoes: [] });
        definirSomenteLeitura(form, true);
        return { ...opcoes, form, somenteLeitura: true };
      }
    },
    'Em edição': { inputs: () => ({ ...opcoes, form: preenchido(false) }) },
    'Carregando': { inputs: () => ({ ...opcoes, form: criarObjectTriggerForm(), carregando: true }) }
  }
});
