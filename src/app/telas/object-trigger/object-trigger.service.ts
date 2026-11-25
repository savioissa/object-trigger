import { Injectable } from '@angular/core';
import { Observable, delay, of, tap, throwError } from 'rxjs';

import { ObjectTriggerDTO, ObjectTriggerFieldDTO, WebhookDTO } from './object-trigger.dto';
import { OBJECT_TRIGGERS_MOCK, OBJECT_TRIGGER_FIELDS_MOCK, WEBHOOKS_MOCK } from './object-trigger.mock';

/**
 * Acesso aos dados de gatilhos, no formato dos DTOs da API.
 * Hoje responde com dados mock e uma latência simulada; para integrar com a API,
 * troque cada `of(...)` por uma chamada `HttpClient` mantendo as mesmas assinaturas.
 * A conversão para o modelo das telas fica em object-trigger.conversao.ts.
 */
@Injectable({ providedIn: 'root' })
export class ObjectTriggerService {
  private readonly latenciaMs = 300;
  private readonly gatilhos: ObjectTriggerDTO[] = [...OBJECT_TRIGGERS_MOCK];

  listar(): Observable<ObjectTriggerDTO[]> {
    return of([...this.gatilhos]).pipe(delay(this.latenciaMs));
  }

  /** GET ../portal/objecttriggerfields */
  listarCampos(): Observable<ObjectTriggerFieldDTO[]> {
    return of(OBJECT_TRIGGER_FIELDS_MOCK).pipe(delay(this.latenciaMs));
  }

  /** GET /portal/webhooks */
  listarWebhooks(): Observable<WebhookDTO[]> {
    return of(WEBHOOKS_MOCK).pipe(delay(this.latenciaMs));
  }

  /** GET ../portal/objecttrigger/:id, com includeConditions e includeActions. */
  buscar(id: number): Observable<ObjectTriggerDTO> {
    const gatilho = this.gatilhos.find(g => g.id === id);
    return gatilho
      ? of(gatilho).pipe(delay(this.latenciaMs))
      : throwError(() => new Error(`Gatilho ${id} não encontrado`));
  }

  /** PATCH ../portal/objecttrigger/{id}. A API recebe um ObjectTriggerIn; o protótipo simplifica e recebe o gatilho. */
  atualizar(gatilho: ObjectTriggerDTO): Observable<ObjectTriggerDTO> {
    const indice = this.gatilhos.findIndex(g => g.id === gatilho.id);
    if (indice < 0) {
      return throwError(() => new Error(`Gatilho ${gatilho.id} não encontrado`));
    }
    const salvo = this.completar({ ...gatilho, dateCreated: this.gatilhos[indice].dateCreated });
    return of(salvo).pipe(
      delay(600),
      tap(() => (this.gatilhos[indice] = salvo))
    );
  }

  /** Criação: endpoint ainda não documentado (⚠ P4). */
  criar(gatilho: ObjectTriggerDTO): Observable<ObjectTriggerDTO> {
    const id = Math.max(0, ...this.gatilhos.map(g => g.id ?? 0)) + 1;
    const criado = this.completar({ ...gatilho, id, dateCreated: new Date().toISOString() });
    return of(criado).pipe(
      delay(600),
      tap(() => this.gatilhos.push(criado))
    );
  }

  /** Como a API faria: data de atualização e campo e webhook completos em condições e ações. */
  private completar(gatilho: ObjectTriggerDTO): ObjectTriggerDTO {
    return {
      ...gatilho,
      dateUpdated: new Date().toISOString(),
      conditions: gatilho.conditions?.map(c => {
        const campo = OBJECT_TRIGGER_FIELDS_MOCK.find(f => f.id === c.field.id);
        return { ...c, field: campo ? { id: campo.id, objectType: campo.objectType, name: campo.name, type: campo.type, translationTag: campo.translationTag } : c.field };
      }),
      actions: gatilho.actions?.map(a => ({ ...a, webhook: WEBHOOKS_MOCK.find(w => w.id === a.referredObjectId) }))
    };
  }
}
