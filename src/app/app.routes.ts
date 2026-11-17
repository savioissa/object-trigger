import { Routes } from '@angular/router';

import { comPrototipador } from './prototipador/rotas';

/**
 * Rotas das telas do protótipo. Cada tela nova entra aqui.
 * Exemplo:
 *   { path: 'filial', loadComponent: () => import('./telas/filial/filial-lista.component').then((m) => m.FilialListaComponent) },
 */
export const rotasDasTelas: Routes = [];

export const routes: Routes = comPrototipador(rotasDasTelas);
