import { FormArray } from '@angular/forms';

import { ajustar } from '../../../../prototipador/teste/ajustar';
import { CondicaoForm, criarCondicaoForm } from '../../object-trigger-form.factory';
import { CATEGORIAS_MOCK } from '../../object-trigger.mock';
import { ObjectTriggerConditionGroupComponent } from './object-trigger-condition-group.component';

/** Bloco "Todas" com as linhas informadas; cada estado recebe um FormArray novo. */
function bloco(...linhas: CondicaoForm[]) {
  return () => ({
    titulo: 'Todas as condições devem ser atendidas',
    gruposCategoria: CATEGORIAS_MOCK,
    condicoes: new FormArray<CondicaoForm>(linhas.length ? linhas : [])
  });
}

function tocada(linha: CondicaoForm): CondicaoForm {
  linha.markAllAsTouched();
  return linha;
}

export default ajustar(ObjectTriggerConditionGroupComponent, {
  estados: {
    'Sem condições': { descricao: 'Só o título e o botão "Adicionar condição".', inputs: () => bloco()() },
    'Linha sem categoria': {
      descricao: 'Linha recém-adicionada: Operador e Valor desabilitados.',
      inputs: () => bloco(criarCondicaoForm())()
    },
    'Linha com categoria': {
      descricao: 'Categoria escolhida e operador que usa valor.',
      inputs: () => bloco(criarCondicaoForm({ categoriaId: 'os.status', operador: 'IGUAL', valor: 'CONCLUIDA' }))()
    },
    'Operador sem valor': {
      descricao: 'Operador Presente: Valor vazio, desabilitado e "Não se aplica a este operador".',
      inputs: () => bloco(criarCondicaoForm({ categoriaId: 'os.status', operador: 'PRESENTE' }))()
    },
    'Campo obrigatório vazio': {
      descricao: 'Valor habilitado e vazio depois que o usuário saiu do campo.',
      inputs: () => bloco(tocada(criarCondicaoForm({ categoriaId: 'os.status', operador: 'ALTERADO_PARA' })))()
    },
    'Várias linhas': {
      inputs: () =>
        bloco(
          criarCondicaoForm({ categoriaId: 'os.status', operador: 'ALTERADO_PARA', valor: 'CONCLUIDA' }),
          criarCondicaoForm({ categoriaId: 'os.status', operador: 'AUSENTE' }),
          criarCondicaoForm()
        )()
    }
  }
});
