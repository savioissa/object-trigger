import { ajustar } from '../../../../prototipador/teste/ajustar';
import { ObjectTriggerFilterComponent } from './object-trigger-filter.component';

export default ajustar(ObjectTriggerFilterComponent, {
  variacoes: {
    'Vazio (painel aberto)': { filtro: { descricao: '', status: null } },
    'Com filtros selecionados': { filtro: { descricao: 'cliente', status: 'ATIVO' } },
    'Painel fechado, com filtros': { filtro: { descricao: 'cliente', status: 'ATIVO' }, aberto: false }
  },
  limites: {
    'filtro.descricao': { min: 0, max: 100 }
  }
});
