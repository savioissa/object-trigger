import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/dropdown';

import { TAG_TIPO_ACAO, TIPOS_ACAO, Webhook } from '../../object-trigger.model';
import { AcaoForm, exibirErro } from '../../object-trigger-form.factory';
import { ObjectTriggerJsonEditorComponent } from '../object-trigger-json-editor/object-trigger-json-editor.component';

let proximoId = 0;

/**
 * Card de uma ação do tipo "Chamar webhook": escolha do webhook, detalhes e corpo da requisição.
 * Usado em cada linha de `app-object-trigger-action-group`, que traz a lixeira ao lado.
 */
@Component({
  selector: 'app-object-trigger-action',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [ReactiveFormsModule, TranslateModule, DropdownModule, ObjectTriggerJsonEditorComponent],
  templateUrl: './object-trigger-action.component.html',
  styleUrl: './object-trigger-action.component.css'
})
export class ObjectTriggerActionComponent {
  @Input({ required: true }) form!: AcaoForm;
  @Input() webhooks: Webhook[] = [];

  protected readonly uid = `acao-${proximoId++}`;
  protected readonly tiposAcao = TIPOS_ACAO;
  protected readonly tagTipoAcao: Record<string, string> = TAG_TIPO_ACAO;
  protected readonly exibirErro = exibirErro;

  protected get webhook(): Webhook | undefined {
    const id = this.form.controls.webhookId.value;
    return this.webhooks.find(w => w.id === id);
  }

  /** Ao escolher outro webhook, o corpo é substituído pelo modelo sugerido dele. */
  protected aoMudarWebhook(): void {
    this.form.controls.corpo.setValue(this.webhook?.corpoPadrao ?? '');
  }
}
