import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormArray } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';

import { GrupoCategoria } from '../../object-trigger.model';
import { CondicaoForm, criarCondicaoForm } from '../../object-trigger-form.factory';
import { ObjectTriggerConditionComponent } from '../object-trigger-condition/object-trigger-condition.component';

let proximoId = 0;

/**
 * Um bloco de condições ("Todas..." ou "Qualquer..."): título, uma `app-object-trigger-condition`
 * por linha com a lixeira ao lado, e o botão de adicionar.
 */
@Component({
  selector: 'app-object-trigger-condition-group',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [TranslateModule, ButtonModule, ObjectTriggerConditionComponent],
  templateUrl: './object-trigger-condition-group.component.html',
  styleUrl: './object-trigger-condition-group.component.css'
})
export class ObjectTriggerConditionGroupComponent {
  @Input({ required: true }) titulo = '';
  @Input({ required: true }) condicoes!: FormArray<CondicaoForm>;
  /** Página do gatilho fora do modo de edição: sem adicionar nem remover linhas. */
  @Input() somenteLeitura = false;
  /** Categorias agrupadas, repassadas a cada condição. */
  @Input() gruposCategoria: GrupoCategoria[] = [];

  protected readonly uid = `grupo-condicoes-${proximoId++}`;

  protected adicionar(): void {
    this.condicoes.push(criarCondicaoForm());
  }

  protected remover(indice: number): void {
    this.condicoes.removeAt(indice);
  }
}
