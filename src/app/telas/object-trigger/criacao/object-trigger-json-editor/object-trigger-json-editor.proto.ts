import { ajustar } from '../../../../prototipador/teste/ajustar';
import { ObjectTriggerJsonEditorComponent } from './object-trigger-json-editor.component';

export default ajustar(ObjectTriggerJsonEditorComponent, {
  largura: 520,
  variacoes: {
    'Padrão': {},
    'Inválido': { invalido: true }
  }
});
