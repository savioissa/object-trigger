import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormArray } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';

import { Webhook } from '../../object-trigger.model';
import { AcaoForm, criarAcaoForm } from '../../object-trigger-form.factory';
import { ObjectTriggerActionComponent } from '../object-trigger-action/object-trigger-action.component';

/**
 * Lista de ações do gatilho: uma `app-object-trigger-action` por ação, com a lixeira ao lado,
 * e o botão de adicionar. Pode ter qualquer quantidade de ações.
 */
@Component({
  selector: 'app-object-trigger-action-group',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [TranslateModule, ButtonModule, ObjectTriggerActionComponent],
  templateUrl: './object-trigger-action-group.component.html',
  styleUrl: './object-trigger-action-group.component.css'
})
export class ObjectTriggerActionGroupComponent {
  @Input({ required: true }) acoes!: FormArray<AcaoForm>;
  /** Webhooks cadastrados, repassados a cada ação. */
  @Input() webhooks: Webhook[] = [];
  /** Página do gatilho fora do modo de edição: sem adicionar nem remover ações. */
  @Input() somenteLeitura = false;

  protected adicionar(): void {
    this.acoes.push(criarAcaoForm());
  }

  protected remover(indice: number): void {
    this.acoes.removeAt(indice);
  }
}
