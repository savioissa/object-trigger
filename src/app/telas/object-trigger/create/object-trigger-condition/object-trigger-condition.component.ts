import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';

import {
  CategoriaCondicao,
  GrupoCategoria,
  OPERADORES,
  Operador,
  TAG_OPERADOR,
  operadorExigeValor,
  operadorUsaIntervalo
} from '../../object-trigger.model';
import { CondicaoForm, exibirErro, sincronizarCamposCondicao } from '../../object-trigger-form.factory';
import { ObjectTriggerCategoryComponent } from '../object-trigger-category/object-trigger-category.component';

let proximoId = 0;

/**
 * Uma condição: Categoria (`app-object-trigger-category`), Operador e Valor, dentro do cartão.
 * Usada em cada linha do bloco de condições.
 */
@Component({
  selector: 'app-object-trigger-condition',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [
    NgTemplateOutlet,
    ReactiveFormsModule,
    TranslateModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    InputNumberModule,
    InputTextModule,
    ObjectTriggerCategoryComponent
  ],
  templateUrl: './object-trigger-condition.component.html',
  styleUrl: './object-trigger-condition.component.css'
})
export class ObjectTriggerConditionComponent {
  /** Linha do formulário; em somente leitura chega desabilitada. */
  @Input({ required: true }) condicao!: CondicaoForm;

  /** Categorias agrupadas, no formato do dropdown com grupos (cabeçalho + itens). */
  @Input()
  set gruposCategoria(grupos: GrupoCategoria[]) {
    this.grupos = grupos;
    this.categorias = grupos.flatMap(g => g.itens);
  }

  protected grupos: GrupoCategoria[] = [];
  private categorias: CategoriaCondicao[] = [];

  protected readonly operadores: Operador[] = [...OPERADORES];
  protected readonly tagOperador: Record<string, string> = TAG_OPERADOR;
  protected readonly uid = `condicao-${proximoId++}`;
  private readonly translate = inject(TranslateService);

  /** Idioma do usuário: define o formato do número (separador decimal e de milhar). */
  protected get idioma(): string {
    return this.translate.currentLang || this.translate.defaultLang;
  }
  protected readonly exibirErro = exibirErro;

  protected categoriaDe(condicao: CondicaoForm): CategoriaCondicao | undefined {
    const id = condicao.controls.categoriaId.value;
    return this.categorias.find(c => c.id === id);
  }

  /** Com o operador escolhido, o campo Valor não se aplica (Presente, Ausente). */
  protected valorNaoSeAplica(condicao: CondicaoForm): boolean {
    return condicao.controls.categoriaId.value != null && !operadorExigeValor(condicao.controls.operador.value);
  }

  /** "Entre" e "Entre ou igual": o Valor vira dois campos (de e até). */
  protected usaIntervalo(condicao: CondicaoForm): boolean {
    return condicao.controls.categoriaId.value != null && operadorUsaIntervalo(condicao.controls.operador.value);
  }

  /**
   * Placeholder do campo Valor: "Não se aplica" com operador sem valor; no intervalo, "De" ou "Até";
   * nos demais casos, o do tipo da categoria.
   */
  protected placeholderValor(condicao: CondicaoForm, doTipo: string, doIntervalo: string | null): string {
    if (this.valorNaoSeAplica(condicao)) {
      return 'portal.generic.placeholder.value-not-applicable';
    }
    return doIntervalo ?? doTipo;
  }

  /**
   * Ao trocar a categoria: os valores anteriores perdem o sentido e são limpos; o operador é mantido
   * (a lista é a mesma para todas as categorias) ou, se ainda não houver, começa em "Igual a".
   */
  protected aoMudarCategoria(condicao: CondicaoForm): void {
    const { categoriaId, operador, valor, valorFim } = condicao.controls;
    if (categoriaId.value != null && operador.value == null) {
      operador.setValue('IGUAL', { emitEvent: false });
    }
    valor.reset(null, { emitEvent: false });
    valorFim.reset(null, { emitEvent: false });
    sincronizarCamposCondicao(condicao);
  }

  /** Ao trocar o operador: libera ou bloqueia o campo Valor conforme o operador usa valor. */
  protected aoMudarOperador(condicao: CondicaoForm): void {
    sincronizarCamposCondicao(condicao);
  }
}
