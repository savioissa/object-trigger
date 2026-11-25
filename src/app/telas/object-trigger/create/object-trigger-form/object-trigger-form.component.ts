import { ChangeDetectionStrategy, Component, DestroyRef, Input, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SkeletonModule } from 'primeng/skeleton';

import { GrupoCategoria, STATUS_OBJECT_TRIGGER, TAG_STATUS, Webhook } from '../../object-trigger.model';
import { ObjectTriggerForm, exibirErro } from '../../object-trigger-form.factory';
import { ObjectTriggerActionGroupComponent } from '../object-trigger-action-group/object-trigger-action-group.component';
import { ObjectTriggerConditionGroupComponent } from '../object-trigger-condition-group/object-trigger-condition-group.component';

let proximoId = 0;

/**
 * Formulário do gatilho: dados gerais, Condições e Ações.
 * Usado pela página de criação (`app-object-trigger-create`) e pela página do gatilho
 * (`app-object-trigger-home`), que o mostra em somente leitura até o usuário clicar em "Editar".
 */
@Component({
  selector: 'app-object-trigger-form',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    SkeletonModule,
    ObjectTriggerActionGroupComponent,
    ObjectTriggerConditionGroupComponent
  ],
  templateUrl: './object-trigger-form.component.html',
  styleUrl: './object-trigger-form.component.css'
})
export class ObjectTriggerFormComponent implements OnInit {
  private readonly translate = inject(TranslateService);
  private readonly primengConfig = inject(PrimeNGConfig);
  private readonly destroyRef = inject(DestroyRef);

  @Input({ required: true }) form!: ObjectTriggerForm;
  @Input() categorias: GrupoCategoria[] = [];
  @Input() webhooks: Webhook[] = [];
  /** Enquanto as opções (e, na página do gatilho, o próprio gatilho) são buscadas: skeleton. */
  @Input() carregando = false;
  /** Campos travados e sem adicionar nem remover condições e ações. */
  @Input() somenteLeitura = false;

  protected readonly uid = `object-trigger-${proximoId++}`;
  protected readonly statusOpcoes = STATUS_OBJECT_TRIGGER;
  protected readonly tagStatus: Record<string, string> = TAG_STATUS;
  protected readonly exibirErro = exibirErro;

  ngOnInit(): void {
    this.aplicarTraducaoPrimeng();
    this.translate.onLangChange
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.aplicarTraducaoPrimeng());
  }

  /** Textos internos do PrimeNG (calendário e listas sem resultado) vêm das tags da planilha. */
  private aplicarTraducaoPrimeng(): void {
    const t = (tag: string): string => this.translate.instant(tag);
    if (t('dateFormat') === 'dateFormat') {
      return; // traduções ainda não carregadas, ou "Exibir tags" ligado
    }
    const lista = (prefixo: string, quantidade: number): string[] =>
      Array.from({ length: quantidade }, (_, i) => t(`${prefixo}.${i}`));
    const semResultado = t('portal.generic.results-not-found');
    this.primengConfig.setTranslation({
      monthNames: lista('monthNames', 12),
      monthNamesShort: lista('monthNamesShort', 12),
      dayNamesMin: lista('dayNamesMin', 7),
      firstDayOfWeek: Number(t('firstDayOfWeek')),
      dateFormat: t('dateFormat'),
      emptyMessage: semResultado,
      emptyFilterMessage: semResultado
    });
  }
}
