import { ajustar } from '../../../../prototipador/teste/ajustar';
import { OBJECT_TRIGGERS_MOCK } from '../../object-trigger.mock';
import { ObjectTriggerCardComponent } from './object-trigger-card.component';

export default ajustar(ObjectTriggerCardComponent, {
  variacoes: {
    'Ativo': { gatilho: OBJECT_TRIGGERS_MOCK[0] },
    'Inativo': { gatilho: OBJECT_TRIGGERS_MOCK[1] },
    'Descrição longa': {
      gatilho: {
        ...OBJECT_TRIGGERS_MOCK[2],
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
