import { Routes } from '@angular/router';

import { comPrototipador } from './prototipador/rotas';
import { alteracoesNaoSalvasGuard } from './telas/compartilhado/alteracoes-nao-salvas/alteracoes-nao-salvas.guard';

/**
 * Rotas das telas do protótipo. Cada tela nova entra aqui.
 * Exemplo:
 *   { path: 'filial', loadComponent: () => import('./telas/filial/filial-lista.component').then((m) => m.FilialListaComponent) },
 */
export const rotasDasTelas: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'object-trigger' },
  {
    path: 'object-trigger',
    pathMatch: 'full',
    loadComponent: () =>
      import('./telas/object-trigger/lista/object-trigger-list/object-trigger-list.component').then(
        (m) => m.ObjectTriggerListComponent,
      ),
  },
  {
    path: 'object-trigger/novo',
    loadComponent: () =>
      import('./telas/object-trigger/criacao/object-trigger-form/object-trigger-form.component').then(
        (m) => m.ObjectTriggerFormComponent,
      ),
  },
  {
    path: 'object-trigger/:id',
    canDeactivate: [alteracoesNaoSalvasGuard],
    loadComponent: () =>
      import('./telas/object-trigger/home/object-trigger-home/object-trigger-home.component').then(
        (m) => m.ObjectTriggerHomeComponent,
      ),
  },
];

export const routes: Routes = comPrototipador(rotasDasTelas);
