# app-object-trigger-fields

### Aplicação
Corpo do formulário do gatilho: dados gerais (Descrição, Status e Observações) e as seções
Condições e Ações, com o painel de placeholders. É o mesmo na página de criação e na página
do gatilho; nesta, aparece em somente leitura até o usuário clicar em "Editar". É dono dos
dados gerais e da lista de ações.

### Componentização
| Componente                              | Tipo    | Onde é usado |
| --------------------------------------- | ------- | ------------ |
| `app-object-trigger-condition-group`    | Interno | Dois na seção Condições: bloco "Todas" e bloco "Qualquer" (`app-object-trigger-condition-group.md`) |
| `app-object-trigger-action`             | Interno | Um por ação na seção Ações (`app-object-trigger-action.md`) |
| `app-object-trigger-placeholders-panel` | Interno | À direita das ações, quando o painel está aberto e fora do somente leitura (`app-object-trigger-placeholders-panel.md`) |
| `p-button`                              | Externo | Botão "Adicionar ação" |
| `p-dropdown`                            | Externo | Campo Status |
| `pInputText`                            | Externo | Campo Descrição |
| `pInputTextarea`                        | Externo | Campo Observações |
| `p-skeleton`                            | Externo | Estado Carregando |

### Elementos

#### Rótulo "Descrição"
- **Tag:** `iclass.generic.label.description`
- **CSS:** `t-label-field required`; o `required` acrescenta o asterisco vermelho
  depois do texto.

#### Campo Descrição
- **Tag:** `portal.generic.placeholder.trigger-description` (placeholder)
- **Componente:** `pInputText`
- **CSS:** `ui-input w-full`; com erro, a borda vermelha padrão do PrimeNG, que aparece quando o valor foi alterado e está inválido.
- **Regras:** obrigatório; só espaços não vale; sem limite de caracteres. Vazio, exibe
  abaixo `portal.generic.label.required-field` (`caption restrictions-header-error m-0`), que descreve o
  campo para leitores de tela, depois que o usuário sai do campo. Em somente leitura,
  desabilitado.
- **Origem do dado:** `ObjectTriggerDTO.description`

#### Rótulo "Status"
- **Tag:** `portal.generic.label.status`
- **CSS:** `t-label-field`

#### Campo Status
- **Componente:** `p-dropdown`
- **CSS:** — (visual padrão do PrimeNG; largura toda pelo `.p-dropdown`)
- **Regras:** opções "Ativo" (`portal.generic.label.active`) e "Inativo"
  (`portal.generic.label.inactive`), nessa ordem; no cadastro, começa em "Ativo"; o texto
  selecionado e o da lista usam a mesma tag. Em somente leitura, desabilitado.
- **Origem do dado:** `ObjectTriggerDTO.status`

#### Rótulo "Observações"
- **Tag:** `portal.generic.label.notes`
- **CSS:** `t-label-field`

#### Campo Observações
- **Tag:** `portal.generic.placeholder.trigger-notes` (placeholder)
- **Componente:** `pInputTextarea`
- **CSS:** `ui-input w-full`; altura inicial de 3 linhas, redimensionável.
- **Regras:** opcional; sem limite de caracteres. Em somente leitura, desabilitado.
- **Origem do dado:** `ObjectTriggerDTO.notes`

#### Divisor
- **CSS:** `summary-divider`; separa os dados gerais da seção Condições e a seção
  Condições da seção Ações.

#### Título "Condições"
- **Tag:** `portal.generic.label.conditions`
- **CSS:** `t-title-sm`; `m-0` (PrimeFlex); h2; nomeia a seção para leitores de
  tela.

#### Subtítulo "Condições"
- **Tag:** `portal.generic.label.conditions-set-trigger-execution`
- **CSS:** `description-medium`; `m-0` (PrimeFlex)

#### Bloco "Todas"
- **Componente:** `app-object-trigger-condition-group`, com o título
  `portal.generic.label.all-conditions-satisfied`

#### Bloco "Qualquer"
- **Componente:** `app-object-trigger-condition-group`, com o título
  `portal.generic.label.any-condition-satisfied`

#### Título "Ações"
- **Tag:** `portal.generic.label.actions`
- **CSS:** `t-title-sm`; `m-0` (PrimeFlex); h2; nomeia a seção para leitores de
  tela.

#### Subtítulo "Ações"
- **Tag:** `portal.generic.label.define-trigger-actions`
- **CSS:** `description-medium`; `m-0` (PrimeFlex)

#### Lista de ações
- **Componente:** `app-object-trigger-action`, um por ação
- **CSS:** `flex-1 min-w-0 flex flex-column gap-3` (PrimeFlex); 1rem entre os itens.
- **Regras:** as ações aparecem na ordem em que foram adicionadas; sem limite de
  quantidade.

#### Botão "Adicionar ação"
- **Tag:** `portal.generic.label.add-action`
- **Componente:** `p-button`
- **Ícone:** `pi pi-plus`
- **CSS:** `customer-portal-button-positive-color` no elemento que envolve o botão; fundo branco, texto azul.
- **Comportamento:** ao clicar, adiciona uma ação vazia (sem webhook) ao fim da lista.
- **Regras:** não aparece em somente leitura.

#### Mensagem "Nenhuma ação"
- **Tag:** `portal.generic.label.no-actions`
- **CSS:** `description-medium`; `m-0` (PrimeFlex)
- **Regras:** só aparece em somente leitura, quando não há nenhuma ação; ocupa o lugar da
  lista.

#### Painel de placeholders
- **Componente:** `app-object-trigger-placeholders-panel`
- **CSS:** `sticky w-30rem flex-shrink-0` (PrimeFlex) e `.acoes__painel`
- **Regras:** só aparece quando está aberto (ver Fluxo no `README.md` da página) e nunca em
  somente leitura; tem 30rem de largura; ao rolar a página, fica fixo 16px abaixo do
  cabeçalho da página (a altura do cabeçalho é a de cada página: 65px na criação, 86px na
  página do gatilho).

### Layout
O componente ocupa a largura toda (`page-content`, com `pb-7`, PrimeFlex): margem
interna de 32px nas laterais, 16px no topo e 4rem embaixo, e é uma coluna com 16px entre os
blocos. As classes abaixo são do PrimeFlex, exceto `summary-divider`.

1. **Dados gerais (`grid`):** duas colunas de mesma largura (`col-6`): Descrição à esquerda
   e Status à direita; Observações embaixo, ocupando as duas (`col-12`). Cada campo é uma
   coluna `flex flex-column gap-2 min-w-0`: rótulo em cima, campo e mensagem de erro embaixo.
2. **Divisor** (`summary-divider`: 18px acima e abaixo, além dos 16px da coluna).
3. **Seção Condições (`flex flex-column gap-4`):** cabeçalho com título e subtítulo (`flex
   flex-column gap-2 mb-1`); bloco "Todas"; bloco "Qualquer".
4. **Divisor.**
5. **Seção Ações (`flex flex-column gap-4`):** cabeçalho igual ao da seção Condições;
   abaixo, uma linha `flex align-items-start gap-3` com a lista de ações seguida do botão
   "Adicionar ação" (ou da mensagem "Nenhuma ação", em somente leitura). Com o painel de
   placeholders aberto, ele aparece à direita da lista (30rem), alinhado pelo topo; a lista
   ocupa o espaço restante.

### Estados
| Estado          | Quando                                                                       | O que deve ser exibido |
| --------------- | ---------------------------------------------------------------------------- | ---------------------- |
| Carregando      | Enquanto as opções (e, na página do gatilho, o próprio gatilho) são buscadas | Com `aria-busy="true"`, todos os blocos viram `p-skeleton`, ocultos para leitores de tela: dados gerais com dois rótulos (96 × 14px) e campos (42px de altura, cantos de 6px) lado a lado e um rótulo com campo de 80px na largura toda; seção Condições com título (140 × 20px), subtítulo (320 × 14px) e dois blocos de 88px (cantos de 10px); seção Ações com título, subtítulo e um bloco de 88px; cada rótulo fica 8px acima do seu campo; os divisores continuam entre as seções |
| Edição          | Página de criação, ou página do gatilho depois de "Editar"                   | Campos habilitados conforme as regras de cada um; botões de adicionar e remover visíveis |
| Somente leitura | Página do gatilho fora do modo de edição                                     | Todos os campos desabilitados, com a aparência padrão do PrimeNG (opacidade de 60%); dropdowns sem a seta; sem "Adicionar ação", sem painel de placeholders; seções sem itens com as mensagens "Nenhuma condição" e "Nenhuma ação" |
| Campo com erro  | Em edição, um campo obrigatório ficou vazio ou inválido e o usuário saiu dele | Mensagem de erro abaixo do campo; dropdown com borda e texto vermelhos (`field-invalid`); input, número e data com a borda vermelha padrão do PrimeNG quando o valor foi alterado |

### Comportamentos
- **Dado** qualquer campo obrigatório, **quando** o usuário ainda não interagiu com ele,
  **então** nenhum erro é exibido, mesmo com o campo vazio; o erro só aparece depois que o
  usuário sai do campo com o valor inválido.
- **Dado** o foco em qualquer campo, **quando** o usuário pressiona Enter, **então** nada é
  salvo nem criado: isso só acontece pelos botões da página.
- **Dado** o painel de placeholders aberto, **quando** o componente passa para somente
  leitura, **então** o painel fecha.
- **Dado** qualquer estado, **quando** o idioma muda, **então** os textos internos do
  calendário e das listas sem resultado passam a usar as tags do idioma: nomes dos meses
  (`monthNames.0` a `monthNames.11`), meses abreviados (`monthNamesShort.0` a
  `monthNamesShort.11`), iniciais dos dias (`dayNamesMin.0` a `dayNamesMin.6`), primeiro dia
  da semana (`firstDayOfWeek`), formato de data (`dateFormat`) e lista sem resultado
  (`portal.generic.results-not-found`).

### CSS
| Classe                | Definição |
| --------------------- | --------- |
| :host                 | display: block; |
| .acoes__painel        | top: calc(var(--cabecalho-altura, 65px) + 16px); |
