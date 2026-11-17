import { ajustar, falhar, semResposta, simularServico } from '../../../../prototipador/teste/ajustar';
import { ObjectTriggerService } from '../../object-trigger.service';
import { ObjectTriggerFormComponent } from './object-trigger-form.component';

export default ajustar(ObjectTriggerFormComponent, {
  estados: {
    'Padrão': { descricao: 'Opções carregadas, nada preenchido: "Criar" desabilitado, com tooltip.' },
    'Carregando': {
      descricao: 'Enquanto as categorias, os webhooks e os placeholders são buscados: skeleton.',
      provedores: [simularServico(ObjectTriggerService, { listarCategorias: () => semResposta() })]
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
