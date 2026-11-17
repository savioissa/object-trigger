import { ajustar } from '../../../../prototipador/teste/ajustar';
import { PLACEHOLDERS_MOCK } from '../../object-trigger.mock';
import { ObjectTriggerPlaceholdersPanelComponent } from './object-trigger-placeholders-panel.component';

export default ajustar(ObjectTriggerPlaceholdersPanelComponent, {
  largura: 450,
  variacoes: {
    'Padrão': { grupos: PLACEHOLDERS_MOCK }
  },
  limites: {
    'grupos[].label': { min: 1, max: 30 },
    'grupos[].itens[].label': { min: 1, max: 40 }
  }
});
