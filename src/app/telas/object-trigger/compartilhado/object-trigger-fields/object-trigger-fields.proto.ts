import { ajustar } from '../../../../prototipador/teste/ajustar';
import { criarObjectTriggerForm, definirSomenteLeitura, preencherObjectTriggerForm } from '../../object-trigger-form.factory';
import { CATEGORIAS_MOCK, OBJECT_TRIGGERS_MOCK, PLACEHOLDERS_MOCK, WEBHOOKS_MOCK } from '../../object-trigger.mock';
import { ObjectTriggerFieldsComponent } from './object-trigger-fields.component';

const opcoes = { categorias: CATEGORIAS_MOCK, webhooks: WEBHOOKS_MOCK, placeholders: PLACEHOLDERS_MOCK };

function preenchido(somenteLeitura: boolean) {
  const form = criarObjectTriggerForm();
  preencherObjectTriggerForm(form, OBJECT_TRIGGERS_MOCK[1]);
  definirSomenteLeitura(form, somenteLeitura);
  return form;
}

export default ajustar(ObjectTriggerFieldsComponent, {
  estados: {
    'Cadastro vazio': { inputs: () => ({ ...opcoes, form: criarObjectTriggerForm() }) },
    'Somente leitura': { inputs: () => ({ ...opcoes, form: preenchido(true), somenteLeitura: true }) },
    'Somente leitura, blocos vazios': {
      descricao: 'Bloco e seção sem itens mostram "Nenhuma condição" e "Nenhuma ação".',
      inputs: () => {
        const form = criarObjectTriggerForm();
        preencherObjectTriggerForm(form, { ...OBJECT_TRIGGERS_MOCK[0], acoes: [] });
        definirSomenteLeitura(form, true);
        return { ...opcoes, form, somenteLeitura: true };
      }
    },
    'Em edição': { inputs: () => ({ ...opcoes, form: preenchido(false) }) },
    'Carregando': { inputs: () => ({ ...opcoes, form: criarObjectTriggerForm(), carregando: true }) }
  }
});
