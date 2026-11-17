import { ajustar } from '../../../../prototipador/teste/ajustar';
import { ObjectTriggerFilterComponent } from './object-trigger-filter.component';

export default ajustar(ObjectTriggerFilterComponent, {
  variacoes: {
    'Vazio': { filtro: { descricao: '', status: null } },
    'Com filtro ativo': { filtro: { descricao: 'cliente', status: 'ATIVO' } }
  },
  limites: {
    'filtro.descricao': { min: 0, max: 100 }
  }
});
