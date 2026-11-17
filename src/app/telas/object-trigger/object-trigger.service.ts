import { Injectable } from '@angular/core';
import { Observable, delay, of, tap, throwError } from 'rxjs';

import { GrupoCategoria, GrupoPlaceholder, ObjectTrigger, Webhook } from './object-trigger.model';
import { CATEGORIAS_MOCK, OBJECT_TRIGGERS_MOCK, PLACEHOLDERS_MOCK, WEBHOOKS_MOCK } from './object-trigger.mock';

/**
 * Acesso aos dados de gatilhos.
 * Hoje responde com dados mock e uma latência simulada; para integrar com a API,
 * troque cada `of(...)` por uma chamada `HttpClient` mantendo as mesmas assinaturas.
 */
@Injectable({ providedIn: 'root' })
export class ObjectTriggerService {
  private readonly latenciaMs = 300;
  private readonly gatilhos: ObjectTrigger[] = [...OBJECT_TRIGGERS_MOCK];

  listar(): Observable<ObjectTrigger[]> {
    return of([...this.gatilhos]).pipe(delay(this.latenciaMs));
  }

  listarCategorias(): Observable<GrupoCategoria[]> {
    return of(CATEGORIAS_MOCK).pipe(delay(this.latenciaMs));
  }

  listarWebhooks(): Observable<Webhook[]> {
    return of(WEBHOOKS_MOCK).pipe(delay(this.latenciaMs));
  }

  listarPlaceholders(): Observable<GrupoPlaceholder[]> {
    return of(PLACEHOLDERS_MOCK).pipe(delay(this.latenciaMs));
  }

  buscar(id: string): Observable<ObjectTrigger> {
    const gatilho = this.gatilhos.find(g => g.id === id);
    return gatilho
      ? of(gatilho).pipe(delay(this.latenciaMs))
      : throwError(() => new Error(`Gatilho ${id} não encontrado`));
  }

  atualizar(gatilho: ObjectTrigger): Observable<ObjectTrigger> {
    const indice = this.gatilhos.findIndex(g => g.id === gatilho.id);
    if (indice < 0) {
      return throwError(() => new Error(`Gatilho ${gatilho.id} não encontrado`));
    }
    return of(gatilho).pipe(
      delay(600),
      tap(() => (this.gatilhos[indice] = gatilho))
    );
  }

  criar(gatilho: ObjectTrigger): Observable<ObjectTrigger> {
    const criado: ObjectTrigger = { ...gatilho, id: crypto.randomUUID() };
    return of(criado).pipe(
      delay(600),
      tap(() => this.gatilhos.push(criado))
    );
  }
}
