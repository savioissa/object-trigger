import { ajustar, falhar, semResposta, simularRota, simularServico } from '../../../../prototipador/teste/ajustar';
import { ObjectTriggerService } from '../../object-trigger.service';
import { ObjectTriggerHomeComponent } from './object-trigger-home.component';

export default ajustar(ObjectTriggerHomeComponent, {
  estados: {
    'Somente leitura': {
      descricao: 'Campos travados; no topo, "Gatilho" e a descrição; abaixo, o botão "Editar".',
      provedores: [simularRota({ id: 'ot-001' })]
    },
    'Em edição': {
      descricao: 'Campos liberados; "Salvar" só habilita depois de uma alteração válida.',
      provedores: [simularRota({ id: 'ot-001' })],
      acao: async componente => {
        await new Promise(r => setTimeout(r, 800));
        componente.editar();
      }
    },
    'Inativo, com ações': {
      provedores: [simularRota({ id: 'ot-002' })]
    },
    'Carregando': {
      provedores: [simularRota({ id: 'ot-001' }), simularServico(ObjectTriggerService, { buscar: () => semResposta() })]
    },
    'Erro ao salvar': {
      descricao: 'Edite um campo e clique em "Salvar": toast de erro, continua em edição com os dados.',
      provedores: [simularRota({ id: 'ot-001' }), simularServico(ObjectTriggerService, { atualizar: () => falhar() })]
    },
    'Gatilho não encontrado': { provedores: [simularRota({ id: 'inexistente' })] }
  }
});
