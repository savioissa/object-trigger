import { ChangeDetectionStrategy, Component, DestroyRef, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SkeletonModule } from 'primeng/skeleton';

import { GrupoCategoria, GrupoPlaceholder, STATUS_OBJECT_TRIGGER, TAG_STATUS, Webhook } from '../../object-trigger.model';
import { ObjectTriggerForm, criarAcaoForm, exibirErro } from '../../object-trigger-form.factory';
import { ObjectTriggerActionComponent } from '../../criacao/object-trigger-action/object-trigger-action.component';
import { ObjectTriggerConditionGroupComponent } from '../../criacao/object-trigger-condition-group/object-trigger-condition-group.component';
import { ObjectTriggerPlaceholdersPanelComponent } from '../../criacao/object-trigger-placeholders-panel/object-trigger-placeholders-panel.component';

let proximoId = 0;

/**
 * Corpo do formulário do gatilho: dados gerais, Condições e Ações, com o painel de placeholders.
 * Usado no cadastro e na página do gatilho (que o mostra em somente leitura até o usuário clicar em "Editar").
 */
@Component({
  selector: 'app-object-trigger-fields',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [
    ReactiveFormsModule,
    TranslateModule,
    ButtonModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    SkeletonModule,
    ObjectTriggerActionComponent,
    ObjectTriggerConditionGroupComponent,
    ObjectTriggerPlaceholdersPanelComponent
  ],
  templateUrl: './object-trigger-fields.component.html',
  styleUrl: './object-trigger-fields.component.css'
})
export class ObjectTriggerFieldsComponent implements OnInit, OnChanges {
  private readonly translate = inject(TranslateService);
  private readonly primengConfig = inject(PrimeNGConfig);
  private readonly destroyRef = inject(DestroyRef);

  @Input({ required: true }) form!: ObjectTriggerForm;
  @Input() categorias: GrupoCategoria[] = [];
  @Input() webhooks: Webhook[] = [];
  @Input() placeholders: GrupoPlaceholder[] = [];
  /** Enquanto as opções (e, na página do gatilho, o próprio gatilho) são buscadas: skeleton. */
  @Input() carregando = false;
  /** Campos travados e sem adicionar, remover ou abrir o painel de placeholders. */
  @Input() somenteLeitura = false;

  protected readonly uid = `object-trigger-${proximoId++}`;
  protected readonly statusOpcoes = STATUS_OBJECT_TRIGGER;
  protected readonly tagStatus: Record<string, string> = TAG_STATUS;
  protected readonly exibirErro = exibirErro;

  protected painelAberto = false;

  ngOnInit(): void {
    this.aplicarTraducaoPrimeng();
    this.translate.onLangChange
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.aplicarTraducaoPrimeng());
  }

  ngOnChanges(mudancas: SimpleChanges): void {
    // Ao sair da edição, o painel de placeholders fecha
    if (mudancas['somenteLeitura'] && this.somenteLeitura) {
      this.painelAberto = false;
    }
  }

  protected adicionarAcao(): void {
    this.form.controls.acoes.push(criarAcaoForm());
  }

  protected removerAcao(indice: number): void {
    this.form.controls.acoes.removeAt(indice);
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
