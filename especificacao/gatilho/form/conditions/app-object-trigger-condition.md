# app-object-trigger-condition

### Aplicação
Uma condição do gatilho: Categoria, Operador e Valor, dentro de um card. É usada por
`app-object-trigger-condition-group`, uma vez para cada condição do bloco. O tipo da
condição (AND ou OR) não aparece aqui: é dado pelo bloco em que ela está (ver
`app-object-trigger-condition-group.md` › Tipo da condição). O botão de
remover a condição não faz parte deste componente: fica no bloco, ao lado do card.

### Componentização
| Componente      | Tipo    | Onde é usado                                                   |
| --------------- | ------- | -------------------------------------------------------------- |
| `app-object-trigger-category` | Interno | Campo Categoria (`app-object-trigger-category.md`) |
| `p-dropdown`    | Externo | Operador, Valor do tipo Lista e Valor sem categoria |
| `p-inputNumber` | Externo | Valor do tipo Número                                           |
| `p-calendar`    | Externo | Valor do tipo Data                                             |
| `pInputText`    | Externo | Valor do tipo Texto                                            |

### Entradas e saídas
| Nome              | Tipo     | Descrição |
| ----------------- | -------- | --------- |
| `condicao`        | Entrada  | A condição a exibir e editar. Em somente leitura, chega com os campos desabilitados. |
| `gruposCategoria` | Entrada  | Categorias agrupadas, para as opções do campo Categoria e os valores do tipo Lista. |

### Elementos

#### Card
- **CSS:** `div-filter`
- **Regras:** envolve os três campos; ocupa toda a largura que o bloco der a ele.

#### Categoria
- **Componente:** `app-object-trigger-category` (`app-object-trigger-category.md`), com
  rótulo, select e mensagem de erro; recebe a categoria da condição e as categorias
  agrupadas.
- **Comportamento:** quando o usuário escolhe uma categoria (saída `categoriaChange`), a
  condição habilita o Operador (começando em "Igual a", se ainda não houver) e limpa o Valor.

#### Rótulo "Operador"
- **Tag:** `iclass.generic.label.select-operator`
- **CSS:** `equipment-event-label`; associado ao campo Operador.

#### Campo Operador
- **Tag:** `portal.generic.label.select` (placeholder)
- **Componente:** `p-dropdown`
- **CSS:** — (visual padrão do PrimeNG); a lista mostra até 480px de altura, o suficiente
  para as 12 opções sem rolagem.
- **Comportamento:** ao escolher um operador que não usa valor, o Valor é limpo e
  desabilitado; ao escolher um operador que usa valor, o Valor é habilitado e mantém o
  valor que já estava escolhido.
- **Origem do dado:** `ObjectTriggerDTO.conditions[].operator` (enum `ObjectTriggerConditionOperator`)
- **Regras:** desabilitado enquanto a condição não tem categoria. Com categoria, é
  obrigatório; sem operador, exibe `portal.generic.label.required-field` (`caption restrictions-header-error m-0`) e
  borda e texto vermelhos (`field-invalid`, no `p-dropdown`) depois que
  o usuário sai do campo. As opções são as mesmas para qualquer categoria, na ordem do enum:

  | Enum | Opção                                       | Tag                                                   | Usa valor          |
  | ---- | ------------------------------------------- | ----------------------------------------------------- | ------------------ |
  | 1    | Presente                                    | `portal.generic.label.operator-present`               | não                |
  | 2    | Ausente                                     | `portal.generic.label.operator-absent`                | não                |
  | 3    | Igual a                                     | `portal.generic.label.equal`                          | sim                |
  | 4    | Diferente                                   | `portal.generic.label.operator-different`             | sim                |
  | 5    | Maior que                                   | `portal.generic.label.greater-than`                   | sim                |
  | 6    | Maior que ou igual a                        | `iclass.generic.label.greater-than-or-equal-to`       | sim                |
  | 7    | Menor que                                   | `portal.generic.label.less-than`                      | sim                |
  | 8    | Menor que ou igual a                        | `iclass.generic.label.less-than-or-equal-to`          | sim                |
  | 9    | Entre                                       | `iclass.generic.label.between`                        | sim, dois (de e até) |
  | 10   | Entre ou igual                              | `portal.generic.label.operator-between-or-equal`      | sim, dois (de e até) |
  | 11   | É igual a (sem diferenciar maiúsculas)      | `portal.generic.label.operator-equal-ignore-case`     | sim                |
  | 12   | É diferente de (sem diferenciar maiúsculas) | `portal.generic.label.operator-not-equal-ignore-case` | sim                |

#### Rótulo "Valor"
- **Tag:** `portal.generic.label.value`
- **CSS:** `equipment-event-label`; associado ao campo Valor.

#### Campo Valor
- **Tag:** placeholder conforme o caso (ver Regras)
- **Componente:** depende do tipo da categoria: `p-dropdown` (Lista), `p-inputNumber`
  (Número), `p-calendar` (Data) ou `pInputText` (Texto); sem categoria, `p-dropdown`
  desabilitado.
- **CSS:** tipo Lista e sem categoria, visual padrão do PrimeNG; tipo Número, `w-full` no
  componente e `ui-input w-full` no campo de digitação; tipo Data, `w-full` no
  componente e `ui-input` no campo de digitação; tipo Texto, `ui-input w-full`.
- **Comportamento:**
  - **Lista:** ao abrir, mostra os valores da categoria (até 480px de altura, com rolagem
    além disso); ao escolher, o campo mostra o valor.
  - **Número:** aceita número decimal com até 2 casas decimais, no formato de número do
    idioma do usuário.
  - **Data:** abre um calendário pelo ícone de calendário dentro do campo e aceita a data
    digitada no formato de data do idioma do usuário. No calendário, o nome do mês usa
    `monthNames.0` a `monthNames.11`, a escolha do mês usa `monthNamesShort.0` a
    `monthNamesShort.11`, as iniciais dos dias da semana usam `dayNamesMin.0` a
    `dayNamesMin.6` e a semana começa no dia indicado por `firstDayOfWeek`.
  - **Texto:** aceita texto livre; espaços nas pontas não são salvos.
- **Regras:**
  - Sem categoria: desabilitado, com o placeholder
    `portal.generic.placeholder.select-category-first`.
  - Com operador que não usa valor (Presente, Ausente): vazio,
    desabilitado, com o placeholder `portal.generic.placeholder.value-not-applicable`; a
    condição é salva sem valor.
  - Com operador de intervalo (Entre, Entre ou igual): o Valor vira dois campos lado a lado,
    do mesmo tipo (ver Layout), os dois habilitados e obrigatórios: o início, com o placeholder
    `iclass.generic.label.from`, e o fim, com o placeholder `iclass.generic.label.to`, que
    também é o nome do campo para leitores de tela (o início usa o rótulo "Valor"). Não há
    validação de o início ser menor que o fim. Ao trocar para um operador que não é de
    intervalo, o fim é limpo e some, e o início continua como Valor.
  - Nos demais casos: um campo, habilitado e obrigatório (no tipo Texto, só espaços não
    vale), com o placeholder do tipo: Lista `portal.generic.placeholder.select-value`, Número
    `portal.generic.placeholder.number-value` e Texto `portal.generic.placeholder.type-value`;
    o tipo Data fica sem placeholder.
  - Sem valor, exibe `portal.generic.label.required-field` (`caption restrictions-header-error m-0`)
    depois que o usuário sai do campo; no intervalo, uma única mensagem abaixo dos dois
    campos, se qualquer um deles estiver vazio. No tipo Lista, o dropdown fica com borda e texto
    vermelhos (`field-invalid`); nos tipos Número, Data e Texto, vale a borda
    vermelha padrão do PrimeNG, que aparece quando o valor foi alterado e está inválido.
  - Desabilitado, tem a aparência padrão do PrimeNG para campo desabilitado; o dropdown
    desabilitado não mostra a seta (`.p-dropdown.p-disabled`).
  - Hoje só a categoria "Status" existe e é do tipo Lista, com os valores Aberta, Agendada,
    Atendimento, Aprovação, Fila técnico, Deslocamento, Despachada, Vinculada credenciada,
    Em análise, Concluída, Encerrada, Paralisada, Pré-aberta e Suporte, nessa ordem.
- **Origem do dado:** valor único, ou o "De" no intervalo, em `ObjectTriggerDTO.conditions[].value1`;
  o "Até" do intervalo em `ObjectTriggerDTO.conditions[].value2`; com Presente e Ausente, os
  dois ficam vazios.

### Layout
Card (`div-filter`) com uma grade de 12 colunas por dentro (`grid`, PrimeFlex; 1rem entre
as colunas):

1. **Categoria (esquerda):** `app-object-trigger-category`, em `col-5` (5 de 12).
2. **Operador (meio):** `col-3` (3 de 12).
3. **Valor (direita):** `col-4` (4 de 12).

Cada um é também uma coluna `flex flex-column gap-2 min-w-0` (PrimeFlex): rótulo em cima,
campo e mensagem de erro embaixo. Com operador de intervalo, o Valor tem os dois campos ("de"
e "até") lado a lado, com a mesma largura e 8px entre eles (`flex gap-2`, cada um
`flex-1 min-w-0`, PrimeFlex).

### Estados
| Estado                  | Quando                                       | O que deve ser exibido |
| ----------------------- | -------------------------------------------- | ---------------------- |
| Sem categoria           | Condição recém-adicionada                    | Categoria com placeholder; Operador e Valor desabilitados, com seus placeholders |
| Com categoria           | Categoria escolhida e operador que usa valor | Operador preenchido; Valor habilitado no controle do tipo da categoria |
| Operador sem valor      | Operador Presente ou Ausente                 | Valor vazio e desabilitado, com `portal.generic.placeholder.value-not-applicable` |
| Operador de intervalo   | Operador Entre ou Entre ou igual             | Valor com dois campos lado a lado, do tipo da categoria, com os placeholders `iclass.generic.label.from` e `iclass.generic.label.to` |
| Campo obrigatório vazio | Operador ou Valor habilitado e vazio, depois que o usuário saiu do campo | `portal.generic.label.required-field` abaixo do campo; borda vermelha no dropdown (`field-invalid`) e, nos campos de digitação, a borda vermelha padrão do PrimeNG quando o valor foi alterado |
| Somente leitura         | Página do gatilho fora do modo de edição     | Campos desabilitados com a aparência padrão do PrimeNG (opacidade de 60%); dropdowns sem a seta |

### Comportamentos
- **Dado** uma condição com categoria, operador e valor escolhidos, **quando** o usuário troca
  a categoria, **então** o operador é mantido e o valor é limpo (no intervalo, os dois), no
  controle do tipo da nova categoria.

### CSS
| Classe | Definição       |
| ------ | --------------- |
| :host  | display: block; |
