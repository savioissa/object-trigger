import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { ObjectTrigger, TAG_STATUS } from '../../object-trigger.model';

/** Quantidade máxima de caracteres da descrição no card. */
const LIMITE_DESCRICAO = 50;

/** Card de um gatilho na lista: Status e Descrição. O card inteiro abre a página do gatilho. */
@Component({
  selector: 'app-object-trigger-card',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, TranslateModule],
  templateUrl: './object-trigger-card.component.html',
  styleUrl: './object-trigger-card.component.css'
})
export class ObjectTriggerCardComponent {
  @Input({ required: true }) gatilho!: ObjectTrigger;

  protected readonly tagStatus: Record<string, string> = TAG_STATUS;

  /** Acima de 50 caracteres, a descrição é cortada e termina com reticências. */
  protected get descricao(): string {
    const texto = this.gatilho.descricao;
    return texto.length > LIMITE_DESCRICAO ? `${texto.slice(0, LIMITE_DESCRICAO).trimEnd()}…` : texto;
  }
}
