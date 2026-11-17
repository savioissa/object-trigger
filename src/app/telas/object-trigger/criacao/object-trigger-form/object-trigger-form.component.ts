import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { finalize, forkJoin } from 'rxjs';

import { GrupoCategoria, GrupoPlaceholder, Webhook } from '../../object-trigger.model';
import { criarObjectTriggerForm, paraObjectTrigger, podeCriar } from '../../object-trigger-form.factory';
import { ObjectTriggerService } from '../../object-trigger.service';
import { ObjectTriggerFieldsComponent } from '../../compartilhado/object-trigger-fields/object-trigger-fields.component';

/** Página de criação de gatilho: cabeçalho com Cancelar e Criar, dados gerais, Condições e Ações. */
@Component({
  selector: 'app-object-trigger-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [TranslateModule, ButtonModule, ObjectTriggerFieldsComponent],
  templateUrl: './object-trigger-form.component.html',
  styleUrl: './object-trigger-form.component.css'
})
export class ObjectTriggerFormComponent implements OnInit {
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
  protected placeholders: GrupoPlaceholder[] = [];

  protected get podeCriar(): boolean {
    return !this.carregando && podeCriar(this.form);
  }

  ngOnInit(): void {
    forkJoin({
      categorias: this.service.listarCategorias(),
      webhooks: this.service.listarWebhooks(),
      placeholders: this.service.listarPlaceholders()
    })
      .pipe(
        finalize(() => (this.carregando = false)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: ({ categorias, webhooks, placeholders }) => {
          this.categorias = categorias;
          this.webhooks = webhooks;
          this.placeholders = placeholders;
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
      .criar(paraObjectTrigger(this.form))
      .pipe(finalize(() => (this.salvando = false)))
      .subscribe({
        next: criado => {
          this.messages.add({
            severity: 'success',
            summary: this.translate.instant('portal.generic.label.trigger-created'),
            detail: this.translate.instant('portal.generic.label.trigger-created-successfully')
          });
          this.router.navigate(['/object-trigger', criado.id]);
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
