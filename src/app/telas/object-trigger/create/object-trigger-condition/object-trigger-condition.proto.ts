import { ajustar } from '../../../../prototipador/teste/ajustar';
import { CondicaoForm, criarCondicaoForm } from '../../object-trigger-form.factory';
import { deCamposDTO } from '../../object-trigger.conversao';
import { OBJECT_TRIGGER_FIELDS_MOCK } from '../../object-trigger.mock';
import { ObjectTriggerConditionComponent } from './object-trigger-condition.component';

/** Mocks da API no modelo da tela. */
const categorias = () => deCamposDTO(OBJECT_TRIGGER_FIELDS_MOCK);

/** Cada estado recebe um FormGroup novo. */
function linha(condicao: CondicaoForm) {
  return { gruposCategoria: categorias(), condicao };
}

function tocada(condicao: CondicaoForm): CondicaoForm {
  condicao.markAllAsTouched();
  return condicao;
}

function desabilitada(condicao: CondicaoForm): CondicaoForm {
  condicao.disable();
  return condicao;
}

export default ajustar(ObjectTriggerConditionComponent, {
  estados: {
    'Sem categoria': {
      descricao: 'Condição recém-adicionada: Operador e Valor desabilitados.',
      inputs: () => linha(criarCondicaoForm())
    },
    'Com categoria': {
      descricao: 'Categoria escolhida e operador que usa valor.',
      inputs: () => linha(criarCondicaoForm({ categoriaId: '1', operador: 'IGUAL', valor: '7' }))
    },
    'Operador sem valor': {
      descricao: 'Operador Presente: Valor vazio, desabilitado e "Não se aplica a este operador".',
      inputs: () => linha(criarCondicaoForm({ categoriaId: '1', operador: 'PRESENTE' }))
    },
    'Operador de intervalo': {
      descricao: 'Operador Entre: o Valor vira dois campos, "De" e "Até".',
      inputs: () => linha(criarCondicaoForm({ categoriaId: '1', operador: 'ENTRE', valor: '2' }))
    },
    'Campo obrigatório vazio': {
      descricao: 'Valor habilitado e vazio depois que o usuário saiu do campo.',
      inputs: () => linha(tocada(criarCondicaoForm({ categoriaId: '1', operador: 'IGUAL' })))
    },
    'Somente leitura': {
      descricao: 'Página do gatilho fora da edição: todos os campos desabilitados.',
      inputs: () => linha(desabilitada(criarCondicaoForm({ categoriaId: '1', operador: 'IGUAL', valor: '7' })))
    }
  }
});
