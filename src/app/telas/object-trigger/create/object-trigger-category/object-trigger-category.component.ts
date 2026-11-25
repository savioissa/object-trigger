import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/dropdown';

import { GrupoCategoria } from '../../object-trigger.model';
import { exibirErro } from '../../object-trigger-form.factory';

let proximoId = 0;

/** Campo Categoria de uma condição: rótulo, select com as categorias agrupadas e mensagem de erro. */
@Component({
  selector: 'app-object-trigger-category',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Default,
  imports: [ReactiveFormsModule, TranslateModule, DropdownModule],
  templateUrl: './object-trigger-category.component.html',
  styleUrl: './object-trigger-category.component.css'
})
export class ObjectTriggerCategoryComponent {
  /** Categoria escolhida (id); em somente leitura, chega desabilitado. */
  @Input({ required: true }) controle!: FormControl<string | null>;
  /** Categorias agrupadas, no formato do dropdown com grupos (cabeçalho + itens). */
  @Input() grupos: GrupoCategoria[] = [];

  /** O usuário escolheu outra categoria. */
  @Output() categoriaChange = new EventEmitter<void>();

  protected readonly uid = `categoria-${proximoId++}`;
  protected readonly exibirErro = exibirErro;
}
