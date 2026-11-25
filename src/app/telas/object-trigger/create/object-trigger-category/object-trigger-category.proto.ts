import { FormControl } from '@angular/forms';

import { ajustar } from '../../../../prototipador/teste/ajustar';
import { deCamposDTO } from '../../object-trigger.conversao';
import { OBJECT_TRIGGER_FIELDS_MOCK } from '../../object-trigger.mock';
import { ObjectTriggerCategoryComponent } from './object-trigger-category.component';

/** Mocks da API no modelo da tela. */
const categorias = () => deCamposDTO(OBJECT_TRIGGER_FIELDS_MOCK);

function campo(valor: string | null, desabilitado = false) {
  const controle = new FormControl<string | null>({ value: valor, disabled: desabilitado });
  return { controle, grupos: categorias() };
}

export default ajustar(ObjectTriggerCategoryComponent, {
  estados: {
    'Vazio': { descricao: 'Placeholder "Buscar categoria".', inputs: () => campo(null) },
    'Selecionada': { descricao: 'Mostra "Grupo > Categoria".', inputs: () => campo('1') },
    'Somente leitura': { descricao: 'Desabilitado, sem a seta.', inputs: () => campo('1', true) }
  }
});
