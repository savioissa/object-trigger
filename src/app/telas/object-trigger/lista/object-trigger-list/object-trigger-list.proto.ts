import { ajustar, responder, semResposta, simularServico } from '../../../../prototipador/teste/ajustar';
import { OBJECT_TRIGGERS_MOCK } from '../../object-trigger.mock';
import { ObjectTriggerService } from '../../object-trigger.service';
import { ObjectTriggerListComponent } from './object-trigger-list.component';

export default ajustar(ObjectTriggerListComponent, {
  estados: {
    'Padrão': { descricao: '30 gatilhos, 7 por página, ordenados pela descrição (crescente).' },
    'Uma página': {
      descricao: 'Poucos gatilhos: o paginador mostra só a página 1.',
      provedores: [simularServico(ObjectTriggerService, { listar: () => responder(OBJECT_TRIGGERS_MOCK.slice(0, 4)) })]
    },
    'Carregando': {
      descricao: 'Enquanto a lista é buscada: 7 cards em skeleton e "Atualizar" com indicador.',
      provedores: [simularServico(ObjectTriggerService, { listar: () => semResposta() })]
    },
    'Sem gatilhos': {
      descricao: 'Nenhum gatilho cadastrado.',
      provedores: [simularServico(ObjectTriggerService, { listar: () => responder([]) })]
    }
  }
});
