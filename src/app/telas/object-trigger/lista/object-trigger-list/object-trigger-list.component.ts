import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { SkeletonModule } from 'primeng/skeleton';
import { finalize } from 'rxjs';

import { ObjectTrigger } from '../../object-trigger.model';
import { ObjectTriggerService } from '../../object-trigger.service';
import { ObjectTriggerCardComponent } from '../object-trigger-card/object-trigger-card.component';
import { FILTRO_VAZIO, FiltroObjectTrigger, ObjectTriggerFilterComponent } from '../object-trigger-filter/object-trigger-filter.component';

export type CampoOrdenacao = 'descricao' | 'status';
export type DirecaoOrdenacao = 'asc' | 'desc';

/** Tag de tradução de cada campo de ordenação. */
const TAG_CAMPO: Record<CampoOrdenacao, string> = {
  descricao: 'iclass.generic.label.description',
  status: 'portal.generic.label.status'
};

/** Tag de tradução de cada direção de ordenação. */
const TAG_DIRECAO: Record<DirecaoOrdenacao, string> = {
  asc: 'portal.generic.label.ascending',
  desc: 'portal.generic.label.descending'
};

/** Texto sem acentos e em minúsculas, para a busca da descrição. */
function normalizar(texto: string): string {
  return texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

/** Lista de gatilhos: cabeçalho com Novo, Filtros, Ordenação e Atualizar; cards paginados. */
@Component({
  selector: 'app-object-trigger-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [
    FormsModule,
    RouterLink,
    TranslateModule,
    ButtonModule,
    DropdownModule,
    PaginatorModule,
    SkeletonModule,
    ObjectTriggerCardComponent,
    ObjectTriggerFilterComponent
  ],
  templateUrl: './object-trigger-list.component.html',
  styleUrl: './object-trigger-list.component.css'
})
export class ObjectTriggerListComponent implements OnInit {
  private readonly service = inject(ObjectTriggerService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly messages = inject(MessageService);
  private readonly translate = inject(TranslateService);

  /** Cards por página. */
  protected readonly porPagina = 7;
  protected readonly esqueletos = Array.from({ length: 7 }, (_, i) => i);

  protected readonly camposOrdenacao: CampoOrdenacao[] = ['descricao', 'status'];
  protected readonly direcoes: DirecaoOrdenacao[] = ['asc', 'desc'];
  protected readonly tagCampo: Record<string, string> = TAG_CAMPO;
  protected readonly tagDirecao: Record<string, string> = TAG_DIRECAO;

  protected gatilhos: ObjectTrigger[] = [];
  protected carregando = true;
  /** Falso enquanto nenhuma busca deu certo: sem lista, a página não afirma que não há gatilhos. */
  protected carregou = false;

  protected filtrosAbertos = false;
  protected ordenacaoAberta = false;

  protected filtro: FiltroObjectTrigger = FILTRO_VAZIO;
  protected campoOrdenacao: CampoOrdenacao = 'descricao';
  protected direcaoOrdenacao: DirecaoOrdenacao = 'asc';

  /** Índice do primeiro card da página atual. */
  protected primeiro = 0;

  ngOnInit(): void {
    this.carregar();
  }

  /** Busca a lista; também usado pelo botão "Atualizar". */
  protected carregar(): void {
    this.carregando = true;
    this.service
      .listar()
      .pipe(
        finalize(() => (this.carregando = false)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe({
        next: gatilhos => {
          this.gatilhos = gatilhos;
          this.carregou = true;
          this.ajustarPagina();
        },
        // Falha: toast de erro; a lista que já estava na tela é mantida
        error: () =>
          this.messages.add({
            severity: 'error',
            summary: this.translate.instant('portal.generic.label.error-loading-data'),
            detail: this.translate.instant('portal.generic.label.unable-load-triggers')
          })
      });
  }

  /** Gatilhos que passam pelos filtros, na ordem escolhida. */
  protected get filtrados(): ObjectTrigger[] {
    const busca = normalizar(this.filtro.descricao.trim());
    const sinal = this.direcaoOrdenacao === 'asc' ? 1 : -1;
    return this.gatilhos
      .filter(g => !busca || normalizar(g.descricao).includes(busca))
      .filter(g => this.filtro.status == null || g.status === this.filtro.status)
      .sort((a, b) => sinal * a[this.campoOrdenacao].localeCompare(b[this.campoOrdenacao], 'pt'));
  }

  /** Cards da página atual. */
  protected get pagina(): ObjectTrigger[] {
    return this.filtrados.slice(this.primeiro, this.primeiro + this.porPagina);
  }

  protected get temFiltro(): boolean {
    return this.filtro.descricao.trim() !== '' || this.filtro.status != null;
  }

  protected alternarFiltros(): void {
    this.filtrosAbertos = !this.filtrosAbertos;
  }

  protected alternarOrdenacao(): void {
    this.ordenacaoAberta = !this.ordenacaoAberta;
  }

  /** O painel de filtro emitiu um novo filtro: aplica e volta para a primeira página. */
  protected aoMudarFiltro(filtro: FiltroObjectTrigger): void {
    this.filtro = filtro;
    this.primeiro = 0;
  }

  /** Ordenação mudou: volta para a primeira página. */
  protected aoMudarCriterio(): void {
    this.primeiro = 0;
  }

  protected aoMudarPagina(evento: PaginatorState): void {
    this.primeiro = evento.first ?? 0;
  }

  /** Depois de recarregar, a página atual pode não existir mais. */
  private ajustarPagina(): void {
    if (this.primeiro >= this.filtrados.length) {
      this.primeiro = 0;
    }
  }
}
