import { ajustar, falhar, semResposta, simularServico } from '../../../../prototipador/teste/ajustar';
import { ObjectTriggerService } from '../../object-trigger.service';
import { ObjectTriggerCreateComponent } from './object-trigger-create.component';

export default ajustar(ObjectTriggerCreateComponent, {
  estados: {
    'Padrão': { descricao: 'Opções carregadas, nada preenchido: "Criar" desabilitado.' },
    'Carregando': {
      descricao: 'Enquanto as categorias e os webhooks são buscados: skeleton.',
      provedores: [simularServico(ObjectTriggerService, { listarCampos: () => semResposta() })]
    },
    'Erro ao carregar opções': {
      descricao: 'Toast de erro; a página continua aberta, sem opções nos campos que dependem delas.',
      provedores: [simularServico(ObjectTriggerService, { listarWebhooks: () => falhar() })]
    },
    'Erro ao salvar': {
      descricao: 'Preencha a descrição e uma condição e clique em "Criar": toast de erro, dados mantidos.',
      provedores: [simularServico(ObjectTriggerService, { criar: () => falhar() })]
    }
  }
});
