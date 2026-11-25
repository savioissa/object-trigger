import { FormArray } from '@angular/forms';

import { ajustar } from '../../../../prototipador/teste/ajustar';
import { CondicaoForm, criarCondicaoForm } from '../../object-trigger-form.factory';
import { deCamposDTO } from '../../object-trigger.conversao';
import { OBJECT_TRIGGER_FIELDS_MOCK } from '../../object-trigger.mock';
import { ObjectTriggerConditionGroupComponent } from './object-trigger-condition-group.component';

/** Mocks da API no modelo da tela. */
const categorias = () => deCamposDTO(OBJECT_TRIGGER_FIELDS_MOCK);

/** Bloco "Todas" com as condições informadas; cada estado recebe um FormArray novo. */
function bloco(somenteLeitura: boolean, ...condicoes: CondicaoForm[]) {
  const lista = new FormArray<CondicaoForm>(condicoes);
  if (somenteLeitura) {
    lista.disable();
  }
  return {
    titulo: 'Todas as condições devem ser atendidas',
    gruposCategoria: categorias(),
    somenteLeitura,
    condicoes: lista
  };
}

/* Os estados de uma condição sozinha (sem categoria, intervalo, erro...) ficam em
   object-trigger-condition.proto.ts. */
export default ajustar(ObjectTriggerConditionGroupComponent, {
  estados: {
    'Sem condições': { descricao: 'Só o título e o botão "Adicionar condição".', inputs: () => bloco(false) },
    'Várias condições': {
      inputs: () =>
        bloco(
          false,
          criarCondicaoForm({ categoriaId: '1', operador: 'IGUAL', valor: '7' }),
          criarCondicaoForm({ categoriaId: '1', operador: 'AUSENTE' }),
          criarCondicaoForm()
        )
    },
    'Somente leitura': {
      descricao: 'Sem lixeira e sem "Adicionar condição"; campos desabilitados.',
      inputs: () => bloco(true, criarCondicaoForm({ categoriaId: '1', operador: 'IGUAL', valor: '7' }))
    },
    'Somente leitura, sem condições': {
      descricao: 'Mostra "Nenhuma condição".',
      inputs: () => bloco(true)
    }
  }
});
