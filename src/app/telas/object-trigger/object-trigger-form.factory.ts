import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

import {
  Acao,
  Condicao,
  ObjectTrigger,
  Operador,
  StatusObjectTrigger,
  TipoAcao,
  ValorCondicao,
  operadorExigeValor
} from './object-trigger.model';

/* Formulário reativo do gatilho: criação dos grupos, validações e conversão para o payload.
   Fica fora dos componentes porque o form, o bloco de condições e a ação o compartilham. */

/** Valor do campo Valor no formulário: o calendário trabalha com `Date`. */
export type ValorCondicaoForm = ValorCondicao | Date;

export type CondicaoForm = FormGroup<{
  categoriaId: FormControl<string | null>;
  operador: FormControl<Operador | null>;
  valor: FormControl<ValorCondicaoForm | null>;
}>;

export type AcaoForm = FormGroup<{
  tipo: FormControl<TipoAcao>;
  webhookId: FormControl<string | null>;
  corpo: FormControl<string>;
}>;

export type ObjectTriggerForm = FormGroup<{
  descricao: FormControl<string>;
  status: FormControl<StatusObjectTrigger>;
  observacoes: FormControl<string>;
  todas: FormArray<CondicaoForm>;
  qualquer: FormArray<CondicaoForm>;
  acoes: FormArray<AcaoForm>;
}>;

/** Obrigatório; texto só com espaços não vale. */
export const obrigatorio: ValidatorFn = (controle: AbstractControl): ValidationErrors | null => {
  const valor = controle.value;
  const vazio = valor == null || (typeof valor === 'string' && valor.trim() === '');
  return vazio ? { required: true } : null;
};

/** Obrigatório e JSON válido. */
export const jsonValido: ValidatorFn = (controle: AbstractControl): ValidationErrors | null => {
  const erroObrigatorio = obrigatorio(controle);
  if (erroObrigatorio) {
    return erroObrigatorio;
  }
  try {
    JSON.parse(controle.value);
    return null;
  } catch {
    return { json: true };
  }
};

/** Erro só aparece em campo habilitado, inválido e que o usuário já tocou. */
export function exibirErro(controle: AbstractControl): boolean {
  return controle.enabled && controle.invalid && controle.touched;
}

/** Linha nova: sem categoria, com Operador e Valor desabilitados. */
export function criarCondicaoForm(condicao?: Partial<Condicao>): CondicaoForm {
  const form: CondicaoForm = new FormGroup({
    categoriaId: new FormControl<string | null>(condicao?.categoriaId ?? null),
    operador: new FormControl<Operador | null>(condicao?.operador ?? null, obrigatorio),
    valor: new FormControl<ValorCondicaoForm | null>(condicao?.valor ?? null, obrigatorio)
  });
  sincronizarCamposCondicao(form);
  return form;
}

/**
 * Habilita ou desabilita Operador e Valor conforme a linha:
 * sem categoria, os dois ficam desabilitados; com operador que não usa valor, o Valor é limpo e desabilitado.
 */
export function sincronizarCamposCondicao(condicao: CondicaoForm): void {
  const { categoriaId, operador, valor } = condicao.controls;
  if (categoriaId.value == null) {
    operador.disable({ emitEvent: false });
    valor.disable({ emitEvent: false });
  } else {
    operador.enable({ emitEvent: false });
    if (operadorExigeValor(operador.value)) {
      valor.enable({ emitEvent: false });
    } else {
      valor.reset(null, { emitEvent: false });
      valor.disable({ emitEvent: false });
    }
  }
  condicao.updateValueAndValidity();
}

/** Ação nova: tipo "Chamar webhook", sem webhook; o corpo só vale (e só valida) com webhook escolhido. */
export function criarAcaoForm(acao?: Partial<Acao>): AcaoForm {
  const form: AcaoForm = new FormGroup({
    tipo: new FormControl<TipoAcao>(acao?.tipo ?? 'WEBHOOK', { nonNullable: true }),
    webhookId: new FormControl<string | null>(acao?.webhookId ?? null),
    corpo: new FormControl<string>(acao?.corpo ?? '', { nonNullable: true, validators: jsonValido })
  });
  sincronizarCorpoAcao(form);
  // Com o formulário travado (somente leitura), quem decide o estado dos campos é quem travou
  form.controls.webhookId.valueChanges.subscribe(() => {
    if (form.controls.webhookId.enabled) {
      sincronizarCorpoAcao(form);
    }
  });
  return form;
}

/** O corpo só fica habilitado (e só valida) com um webhook escolhido. */
export function sincronizarCorpoAcao(acao: AcaoForm): void {
  if (acao.controls.webhookId.value == null) {
    acao.controls.corpo.disable({ emitEvent: false });
  } else {
    acao.controls.corpo.enable({ emitEvent: false });
  }
  acao.updateValueAndValidity({ emitEvent: false });
}

export function criarObjectTriggerForm(): ObjectTriggerForm {
  return new FormGroup({
    descricao: new FormControl<string>('', { nonNullable: true, validators: obrigatorio }),
    status: new FormControl<StatusObjectTrigger>('ATIVO', { nonNullable: true }),
    observacoes: new FormControl<string>('', { nonNullable: true }),
    todas: new FormArray<CondicaoForm>([]),
    qualquer: new FormArray<CondicaoForm>([]),
    acoes: new FormArray<AcaoForm>([])
  });
}

/** Linhas com categoria, nos dois blocos. */
export function contarCondicoesComCategoria(form: ObjectTriggerForm): number {
  return [...form.controls.todas.controls, ...form.controls.qualquer.controls]
    .filter(c => c.controls.categoriaId.value != null).length;
}

/** "Criar" habilitado: descrição preenchida, ao menos uma condição com categoria e nenhum campo habilitado inválido. */
export function podeCriar(form: ObjectTriggerForm): boolean {
  return form.valid && contarCondicoesComCategoria(form) > 0;
}

/** Data do calendário no formato do payload: "AAAA-MM-DD". */
function formatarData(data: Date): string {
  const mes = String(data.getMonth() + 1).padStart(2, '0');
  const dia = String(data.getDate()).padStart(2, '0');
  return `${data.getFullYear()}-${mes}-${dia}`;
}

function paraCondicoes(linhas: FormArray<CondicaoForm>): Condicao[] {
  return linhas.controls
    .filter(c => c.controls.categoriaId.value != null)
    .map(c => {
      const operador = c.controls.operador.value as Operador;
      const bruto = c.controls.valor.value;
      let valor: ValorCondicao | null = null;
      if (operadorExigeValor(operador) && bruto != null) {
        valor = bruto instanceof Date ? formatarData(bruto) : typeof bruto === 'string' ? bruto.trim() : bruto;
      }
      return { categoriaId: c.controls.categoriaId.value as string, operador, valor };
    });
}

/** Payload: textos sem espaços nas pontas; linhas sem categoria e ações sem webhook são descartadas. */
export function paraObjectTrigger(form: ObjectTriggerForm): ObjectTrigger {
  const { descricao, status, observacoes, todas, qualquer, acoes } = form.controls;
  const notas = observacoes.value.trim();
  return {
    descricao: descricao.value.trim(),
    status: status.value,
    observacoes: notas === '' ? null : notas,
    condicoes: { todas: paraCondicoes(todas), qualquer: paraCondicoes(qualquer) },
    acoes: acoes.controls
      .filter(a => a.controls.webhookId.value != null)
      .map(a => ({ tipo: a.controls.tipo.value, webhookId: a.controls.webhookId.value as string, corpo: a.controls.corpo.value }))
  };
}

/** Preenche o formulário com um gatilho salvo (página do gatilho). */
export function preencherObjectTriggerForm(form: ObjectTriggerForm, gatilho: ObjectTrigger): void {
  const { descricao, status, observacoes, todas, qualquer, acoes } = form.controls;
  descricao.setValue(gatilho.descricao);
  status.setValue(gatilho.status);
  observacoes.setValue(gatilho.observacoes ?? '');
  todas.clear();
  gatilho.condicoes.todas.forEach(c => todas.push(criarCondicaoForm(c)));
  qualquer.clear();
  gatilho.condicoes.qualquer.forEach(c => qualquer.push(criarCondicaoForm(c)));
  acoes.clear();
  gatilho.acoes.forEach(a => acoes.push(criarAcaoForm(a)));
  form.markAsPristine();
  form.markAsUntouched();
}

/**
 * Trava ou libera todos os campos (modo somente leitura da página do gatilho).
 * Ao liberar, cada linha e cada ação voltam a seguir suas regras: Operador e Valor dependem da
 * categoria e do operador; o corpo depende do webhook.
 */
export function definirSomenteLeitura(form: ObjectTriggerForm, somenteLeitura: boolean): void {
  if (somenteLeitura) {
    form.disable({ emitEvent: false });
    return;
  }
  form.enable({ emitEvent: false });
  [...form.controls.todas.controls, ...form.controls.qualquer.controls].forEach(sincronizarCamposCondicao);
  form.controls.acoes.controls.forEach(sincronizarCorpoAcao);
  form.updateValueAndValidity({ emitEvent: false });
}

/** Retrato do que seria salvo; serve para saber se o usuário alterou algo em relação ao gatilho salvo. */
export function retratoObjectTrigger(form: ObjectTriggerForm): string {
  return JSON.stringify(paraObjectTrigger(form));
}
