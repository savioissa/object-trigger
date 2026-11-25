import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { finalize, forkJoin, map } from 'rxjs';

import { GrupoCategoria, Webhook } from '../../object-trigger.model';
import { criarObjectTriggerForm, paraObjectTrigger, podeCriar } from '../../object-trigger-form.factory';
import { ObjectTriggerService } from '../../object-trigger.service';
import { deCamposDTO, deWebhookDTO, paraObjectTriggerDTO } from '../../object-trigger.conversao';
import { ObjectTriggerFormComponent } from '../object-trigger-form/object-trigger-form.component';

/** Página de criação de gatilho: cabeçalho com Cancelar e Criar, e o formulário vazio. */
@Component({
  selector: 'app-object-trigger-create',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [TranslateModule, ButtonModule, ObjectTriggerFormComponent],
  templateUrl: './object-trigger-create.component.html',
  styleUrl: './object-trigger-create.component.css'
})
export class ObjectTriggerCreateComponent implements OnInit {
  private readonly service = inject(ObjectTriggerService);
  private readonly messages = inject(MessageService);
  private readonly translate = inject(TranslateService);
  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly form = criarObjectTriggerForm();

  protected carregando = true;
  protected salvando = false;

  protected categorias: GrupoCategoria[] = [];
  protected webhooks: Webhook[] = [];

  protected get podeCriar(): boolean {
    return !this.carregando && podeCriar(this.form);
  }

  /** Busca categorias e webhooks; se falhar, a página abre sem eles e avisa por toast. */
  ngOnInit(): void {
    forkJoin({
      categorias: this.service.listarCampos().pipe(map(deCamposDTO)),
      webhooks: this.service.listarWebhooks().pipe(map(lista => lista.map(deWebhookDTO)))
    })
      .pipe(
        finalize(() => (this.carregando = false)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: ({ categorias, webhooks }) => {
          this.categorias = categorias;
          this.webhooks = webhooks;
        },
        error: () =>
          this.messages.add({
            severity: 'error',
            summary: this.translate.instant('portal.generic.label.error-loading-data'),
            detail: this.translate.instant('portal.generic.label.unable-load-form-options')
          })
      });
  }

  /** Volta para a lista de gatilhos, sem confirmação e sem salvar. */
  protected cancelar(): void {
    this.router.navigate(['/object-trigger']);
  }

  protected criar(): void {
    if (!this.podeCriar || this.salvando) {
      return;
    }
    this.salvando = true;
    this.service
      .criar(paraObjectTriggerDTO(paraObjectTrigger(this.form)))
      .pipe(finalize(() => (this.salvando = false)))
      .subscribe({
        next: criado => {
          this.messages.add({
            severity: 'success',
            summary: this.translate.instant('portal.generic.label.trigger-created'),
            detail: this.translate.instant('portal.generic.label.trigger-created-successfully')
          });
          this.router.navigate(['/object-trigger', criado.id, 'home']);
        },
        error: () =>
          this.messages.add({
            severity: 'error',
            summary: this.translate.instant('portal.generic.label.error-creating-trigger'),
            detail: this.translate.instant('portal.generic.label.unable-create-trigger')
          })
      });
  }
}
