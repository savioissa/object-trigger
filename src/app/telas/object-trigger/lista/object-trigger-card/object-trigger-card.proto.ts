import { ajustar } from '../../../../prototipador/teste/ajustar';
import { deObjectTriggerDTO } from '../../object-trigger.conversao';
import { OBJECT_TRIGGERS_MOCK } from '../../object-trigger.mock';
import { ObjectTriggerCardComponent } from './object-trigger-card.component';

/** Mocks da API no modelo da tela. */
const gatilho = (indice: number) => deObjectTriggerDTO(OBJECT_TRIGGERS_MOCK[indice]);

export default ajustar(ObjectTriggerCardComponent, {
  variacoes: {
    'Ativo': { gatilho: gatilho(0) },
    'Inativo': { gatilho: gatilho(1) },
    'Descrição longa': {
      gatilho: {
        ...gatilho(2),
        descricao:
          'Enviar e-mail de confirmação ao cliente e avisar a equipe responsável sempre que a ordem de serviço for agendada, reagendada ou tiver o técnico alterado'
      }
    }
  },
  // Valor da condição é texto ou número; o card não o exibe, então basta editá-lo como texto
  tipos: {
    'gatilho.condicoes.todas[].valor': { tipo: 'texto' },
    'gatilho.condicoes.qualquer[].valor': { tipo: 'texto' }
  },
  limites: {
    'gatilho.descricao': { min: 1, max: 100 }
  }
});
