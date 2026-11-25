import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

import { STATUS_OBJECT_TRIGGER, StatusObjectTrigger, TAG_STATUS } from '../../object-trigger.model';

/** Critérios do filtro da lista de gatilhos. */
export interface FiltroObjectTrigger {
  /** Trecho da descrição; vazio, não filtra. */
  descricao: string;
  /** Status escolhido; nulo, todos os status. */
  status: StatusObjectTrigger | null;
}

/* Sem anotação de tipo (só satisfies): o filtro não é dado da API e fica fora da aba Dados. */
export const FILTRO_VAZIO = { descricao: '', status: null } satisfies FiltroObjectTrigger;

/** Há algum campo do filtro preenchido (é o que vira chip em "Filtros selecionados"). */
export function filtroPreenchido(filtro: FiltroObjectTrigger): boolean {
  return filtro.descricao.trim() !== '' || filtro.status != null;
}

/** Um chip de "Filtros selecionados": "<rótulo>: <valor>". */
interface ChipFiltro {
  campo: keyof FiltroObjectTrigger;
  /** Tag do nome do filtro. */
  rotulo: string;
  valor: string;
  /** O valor é uma tag (ex.: status) e precisa ser traduzido. */
  valorTraduzivel: boolean;
}

let proximoId = 0;

/**
 * Painel de filtro da lista de gatilhos. Os campos preenchidos viram chips em "Filtros
 * selecionados"; preencher não aplica o filtro (isso é feito pelo "Atualizar" da lista).
 * Remover um chip ou "Limpar filtros" aplica na hora.
 */
@Component({
  selector: 'app-object-trigger-filter',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, TranslateModule, ButtonModule, ChipModule, DropdownModule, InputTextModule],
  templateUrl: './object-trigger-filter.component.html'
})
export class ObjectTriggerFilterComponent {
  /** Filtro preenchido nos campos (ainda não necessariamente aplicado). */
  @Input() filtro: FiltroObjectTrigger = FILTRO_VAZIO;
  /** Com o painel fechado, só a linha de "Filtros selecionados" aparece. */
  @Input() aberto = true;
  /** Emite o filtro inteiro a cada alteração de Descrição ou Status (sem aplicar). */
  @Output() filtroChange = new EventEmitter<FiltroObjectTrigger>();
  /** Emite o filtro a aplicar na hora: depois de remover um chip ou limpar todos. */
  @Output() aplicar = new EventEmitter<FiltroObjectTrigger>();

  protected readonly uid = `object-trigger-filtro-${proximoId++}`;
  protected readonly statusOpcoes: StatusObjectTrigger[] = STATUS_OBJECT_TRIGGER;
  protected readonly tagStatus: Record<string, string> = TAG_STATUS;

  /** Um chip por campo preenchido, na ordem dos campos. */
  protected get chips(): ChipFiltro[] {
    const chips: ChipFiltro[] = [];
    const descricao = this.filtro.descricao.trim();
    if (descricao) {
      chips.push({ campo: 'descricao', rotulo: 'iclass.generic.label.description', valor: descricao, valorTraduzivel: false });
    }
    if (this.filtro.status) {
      chips.push({ campo: 'status', rotulo: 'portal.generic.label.status', valor: TAG_STATUS[this.filtro.status], valorTraduzivel: true });
    }
    return chips;
  }

  protected aoMudarDescricao(descricao: string): void {
    this.filtroChange.emit({ ...this.filtro, descricao });
  }

  protected aoMudarStatus(status: StatusObjectTrigger | null): void {
    this.filtroChange.emit({ ...this.filtro, status });
  }

  protected remover(campo: keyof FiltroObjectTrigger): void {
    this.aplicar.emit({ ...this.filtro, [campo]: FILTRO_VAZIO[campo] });
  }

  protected limpar(): void {
    this.aplicar.emit(FILTRO_VAZIO);
  }
}
