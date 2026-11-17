import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';

import { TAG_TIPO_ACAO, TIPOS_ACAO, Webhook } from '../../object-trigger.model';
import { AcaoForm, exibirErro } from '../../object-trigger-form.factory';
import { ObjectTriggerJsonEditorComponent } from '../object-trigger-json-editor/object-trigger-json-editor.component';

let proximoId = 0;

/** Card de uma ação do tipo "Chamar webhook": escolha do webhook, detalhes e corpo da requisição. */
@Component({
  selector: 'app-object-trigger-action',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [ReactiveFormsModule, TranslateModule, ButtonModule, DropdownModule, ObjectTriggerJsonEditorComponent],
  templateUrl: './object-trigger-action.component.html',
  styleUrl: './object-trigger-action.component.css'
})
export class ObjectTriggerActionComponent {
  @Input({ required: true }) form!: AcaoForm;
  @Input() webhooks: Webhook[] = [];
  /** Página do gatilho fora do modo de edição: sem remover a ação nem abrir o painel de placeholders. */
  @Input() somenteLeitura = false;

  @Output() remover = new EventEmitter<void>();
  @Output() verPlaceholders = new EventEmitter<void>();

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
