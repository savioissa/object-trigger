import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
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

export const FILTRO_VAZIO: FiltroObjectTrigger = { descricao: '', status: null };

let proximoId = 0;

/** Painel de filtro da lista de gatilhos: Descrição e Status, aplicados a cada alteração. */
@Component({
  selector: 'app-object-trigger-filter',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, TranslateModule, DropdownModule, InputTextModule],
  templateUrl: './object-trigger-filter.component.html'
})
export class ObjectTriggerFilterComponent {
  @Input() filtro: FiltroObjectTrigger = FILTRO_VAZIO;
  /** Emite o filtro inteiro a cada alteração de Descrição ou Status. */
  @Output() filtroChange = new EventEmitter<FiltroObjectTrigger>();

  protected readonly uid = `object-trigger-filtro-${proximoId++}`;
  protected readonly statusOpcoes: StatusObjectTrigger[] = STATUS_OBJECT_TRIGGER;
  protected readonly tagStatus: Record<string, string> = TAG_STATUS;

  protected aoMudarDescricao(descricao: string): void {
    this.filtroChange.emit({ ...this.filtro, descricao });
  }

  protected aoMudarStatus(status: StatusObjectTrigger | null): void {
    this.filtroChange.emit({ ...this.filtro, status });
  }
}
