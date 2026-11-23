# app-object-trigger-condition-group

### Aplicação
Bloco de condições de um tipo de combinação. A página usa dois: "Todas as condições devem
ser atendidas" (todas precisam ser verdadeiras) e "Qualquer condição deve ser atendida"
(basta uma ser verdadeira). Cada bloco lista as condições, uma por linha, com Categoria,
Operador e Valor, e permite adicionar e remover linhas. A linha de condição faz parte deste
componente.

### Componentização
| Componente      | Tipo    | Onde é usado                                                      |
| --------------- | ------- | ----------------------------------------------------------------- |
| `p-dropdown`    | Externo | Categoria, Operador, Valor do tipo Lista e Valor sem categoria    |
| `p-inputNumber` | Externo | Valor do tipo Número                                              |
| `p-calendar`    | Externo | Valor do tipo Data                                                |
| `pInputText`    | Externo | Valor do tipo Texto                                               |
| `p-button`      | Externo | Botões "Remover condição" e "Adicionar condição"                  |

### Elementos

#### Título do bloco
- **Tag:** recebido de `app-object-trigger-fields`: `portal.generic.label.all-conditions-satisfied`
  no bloco "Todas" e `portal.generic.label.any-condition-satisfied` no bloco "Qualquer"
- **CSS:** `medium`; `m-0` (PrimeFlex); h3;

#### Lista de condições
- **CSS:** `flex flex-column gap-3` (PrimeFlex); 1rem entre as linhas.
- **Regras:** uma linha por condição, na ordem em que foram adicionadas; sem limite de
  quantidade; sem nenhuma linha, a lista não aparece. Em somente leitura, Categoria, Operador
  e Valor ficam desabilitados (ver Estados).

#### Rótulo "Categoria"
- **Tag:** `portal.generic.label.category`
- **CSS:** `equipment-event-label`; associado ao campo Categoria da linha.

#### Campo Categoria
- **Tag:** `portal.createso.placeholder.find-category` (placeholder)
- **Componente:** `p-dropdown`, com grupos
- **CSS:** — (visual padrão do PrimeNG); com erro, `field-invalid` no `p-dropdown`.
- **Comportamento:** ao abrir, lista as categorias agrupadas: o nome do grupo aparece como
  cabeçalho não selecionável (visual padrão do PrimeNG) e as categorias do grupo logo abaixo. Ao
  escolher uma categoria, o campo mostra "Grupo > Categoria" (ex.: "Ordem de serviço >
  Status"); o Operador é habilitado.
- **Regras:** hoje há um único grupo, "Ordem de serviço", com uma única categoria,
  "Status". Uma linha sem categoria é ignorada: não bloqueia o botão "Criar" e não é salva.
  Depois de escolhida, a categoria não pode voltar a ficar vazia.
- **Origem do dado:** opções em `ObjectTriggerFieldDTO.objectType` e
  `ObjectTriggerFieldDTO.objectTranslationTag`; valor exibido em
  `ObjectTriggerConditionDTO.field.objectType

#### Rótulo "Operador"
- **Tag:** `iclass.generic.label.select-operator`
- **CSS:** `equipment-event-label`; associado ao campo Operador da linha.

#### Campo Operador
- **Tag:** `portal.generic.label.select` (placeholder)
- **Componente:** `p-dropdown`
- **CSS:** — (visual padrão do PrimeNG); a lista mostra até 480px de altura, o suficiente
  para as 12 opções sem rolagem.
- **Comportamento:** ao escolher um operador que não usa valor, o Valor é limpo e
  desabilitado; ao escolher um operador que usa valor, o Valor é habilitado e mantém o
  valor que já estava escolhido.
- **Origem do dado:** `ObjectTriggerConditionDTO.operator`
- **Regras:** desabilitado enquanto a linha não tem categoria. Com categoria, é
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
- **CSS:** `equipment-event-label`; associado ao campo Valor da linha.

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
- **Origem do dado:** `ObjectTriggerConditionDTO.value1` caso necessário `ObjectTriggerConditionDTO.value2`;

#### Botão "Remover condição"
- **Tag:** — (só ícone, sem tooltip nem `aria-label`, por decisão do time)
- **Componente:** `p-button`
- **Ícone:** `pi pi-trash`
- **CSS:** `btn--md btn--neutral`; `flex-shrink-0` (PrimeFlex); ícone cinza, sem fundo; 48 × 32px, com a
  largura padrão do PrimeNG para botão só com ícone.
- **Comportamento:** ao clicar, remove a linha imediatamente, sem confirmação.
- **Regras:** não aparece em somente leitura.

#### Botão "Adicionar condição"
- **Tag:** `portal.generic.label.add-condition`
- **Componente:** `p-button`
- **Ícone:** `pi pi-plus`
- **CSS:** `customer-portal-button-positive-color` no elemento que envolve o botão; fundo branco, texto azul.
- **Comportamento:** ao clicar, adiciona uma linha vazia ao fim do bloco, com Operador e
  Valor desabilitados.
- **Regras:** não aparece em somente leitura.

#### Mensagem "Nenhuma condição"
- **Tag:** `portal.generic.label.no-conditions`
- **CSS:** `description-medium`; `m-0` (PrimeFlex)
- **Regras:** só aparece em somente leitura, quando o bloco não tem nenhuma linha; ocupa o
  lugar da lista.

### Layout
O bloco é uma coluna, com 1rem entre os itens (`flex flex-column gap-3`, PrimeFlex):

1. **Título do bloco (topo).**
2. **Lista de condições:** cada linha tem duas partes, alinhadas ao centro e com 16px entre elas (`flex align-items-center gap-3`, PrimeFlex):
   1. **Esquerda (ocupa o espaço restante):** card (`div-filter`, com `flex-1 min-w-0
      flex align-items-start gap-3`, PrimeFlex) com Categoria, Operador e Valor lado a lado,
      com 1rem entre eles: Categoria com 5/12 da largura (`w-5 flex-shrink-0`), Operador e
      Valor dividindo o restante em partes iguais (`flex-1`). Cada um é uma coluna `flex
      flex-column gap-2 min-w-0` (PrimeFlex): rótulo em cima, campo e mensagem de erro embaixo.
      Com operador de intervalo, o Valor tem os dois campos ("de" e "até") lado a lado, com a
      mesma largura e 8px entre eles (`flex gap-2`, cada um `flex-1 min-w-0`, PrimeFlex).
   2. **Direita (largura do botão, 48px):** botão "Remover condição", centralizado na altura do card. Em
      somente leitura, essa coluna não existe e o card ocupa a largura toda.
3. **Botão "Adicionar condição" (embaixo, alinhado à esquerda).** Em somente leitura, não
   aparece; sem linhas, a mensagem "Nenhuma condição" fica logo abaixo do título.

### Estados
| Estado                   | Quando                                               | O que deve ser exibido                                                                           |
| ------------------------ | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Sem condições            | O bloco não tem nenhuma linha                        | Só o título e o botão "Adicionar condição"                                                      |
| Linha sem categoria      | Linha recém-adicionada                               | Categoria com placeholder; Operador e Valor desabilitados, com seus placeholders                 |
| Linha com categoria      | Categoria escolhida e operador que usa valor         | Operador preenchido; Valor habilitado no controle do tipo da categoria                           |
| Operador sem valor       | Operador Presente ou Ausente                         | Valor vazio e desabilitado, com `portal.generic.placeholder.value-not-applicable`                |
| Operador de intervalo    | Operador Entre ou Entre ou igual                     | Valor com dois campos lado a lado, do tipo da categoria, com os placeholders `iclass.generic.label.from` e `iclass.generic.label.to` |
| Campo obrigatório vazio  | Operador ou Valor habilitado e vazio, depois que o usuário saiu do campo | `portal.generic.label.required-field` abaixo do campo; borda vermelha no dropdown (`field-invalid`) e, nos campos de digitação, a borda vermelha padrão do PrimeNG quando o valor foi alterado |
| Somente leitura          | Página do gatilho fora do modo de edição             | Campos desabilitados com a aparência padrão do PrimeNG (opacidade de 60%); dropdowns sem a seta; sem "Remover condição" nem "Adicionar condição" |
| Somente leitura sem condições | Somente leitura e o bloco sem nenhuma linha     | Título do bloco e `portal.generic.label.no-conditions` |

### Comportamentos
- **Dado** uma linha com categoria, operador e valor escolhidos, **quando** o usuário troca
  a categoria, **então** o operador é mantido e o valor é limpo (no intervalo, os dois), no
  controle do tipo da nova categoria.

### CSS
| Classe                          | Definição |
| ------------------------------- | --------- |
| :host                           | display: block; |
