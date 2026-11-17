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

### Elementos

#### Rótulo "Descrição"
- **Tag:** `iclass.generic.label.description`
- **CSS:** `form-label` (globais); seguido de um asterisco vermelho (`form-label__required`,
  globais), oculto para leitores de tela.

#### Campo Descrição
- **Tag:** `portal.generic.placeholder.trigger-description` (placeholder)
- **Componente:** `pInputText`
- **CSS:** `campo` (globais); com erro, `campo--invalido` (globais).
- **Regras:** obrigatório; só espaços não vale; sem limite de caracteres. Vazio, exibe
  abaixo `portal.generic.label.required-field` (`form-error`, globais), que descreve o
  campo para leitores de tela, depois que o usuário sai do campo. Em somente leitura,
  desabilitado.
- **Origem do dado:** `--`

#### Rótulo "Status"
- **Tag:** `portal.generic.label.status`
- **CSS:** `form-label` (globais)

#### Campo Status
- **Componente:** `p-dropdown`
- **CSS:** `campo` e `campo-painel` (globais)
- **Regras:** opções "Ativo" (`portal.generic.label.active`) e "Inativo"
  (`portal.generic.label.inactive`), nessa ordem; no cadastro, começa em "Ativo"; o texto
  selecionado e o da lista usam a mesma tag. Em somente leitura, desabilitado.
- **Origem do dado:** `--`

#### Rótulo "Observações"
- **Tag:** `portal.generic.label.notes`
- **CSS:** `form-label` (globais)

#### Campo Observações
- **Tag:** `portal.generic.placeholder.trigger-notes` (placeholder)
- **Componente:** `pInputTextarea`
- **CSS:** `campo-textarea` (globais); altura inicial de 3 linhas, redimensionável na
  vertical.
- **Regras:** opcional; sem limite de caracteres. Em somente leitura, desabilitado.
- **Origem do dado:** `--`

#### Divisor
- **CSS:** `.divisor`; separa os dados gerais da seção Condições e a seção Condições da
  seção Ações.

#### Título "Condições"
- **Tag:** `portal.generic.label.conditions`
- **CSS:** `t-title-sm` (globais) e `.secao__titulo`; h2; nomeia a seção para leitores de
  tela.

#### Subtítulo "Condições"
- **Tag:** `portal.generic.label.conditions-set-trigger-execution`
- **CSS:** `.secao__subtitulo`

#### Bloco "Todas"
- **Componente:** `app-object-trigger-condition-group`, com o título
  `portal.generic.label.all-conditions-satisfied`

#### Bloco "Qualquer"
- **Componente:** `app-object-trigger-condition-group`, com o título
  `portal.generic.label.any-condition-satisfied`

#### Título "Ações"
- **Tag:** `portal.generic.label.actions`
- **CSS:** `t-title-sm` (globais) e `.secao__titulo`; h2; nomeia a seção para leitores de
  tela.

#### Subtítulo "Ações"
- **Tag:** `portal.generic.label.define-trigger-actions`
- **CSS:** `.secao__subtitulo`

#### Lista de ações
- **Componente:** `app-object-trigger-action`, um por ação
- **CSS:** `.acoes__lista`; 12px entre os itens.
- **Regras:** as ações aparecem na ordem em que foram adicionadas; sem limite de
  quantidade.

#### Botão "Adicionar ação"
- **Tag:** `portal.generic.label.add-action`
- **Componente:** `p-button`
- **Ícone:** `pi pi-plus`
- **CSS:** `btn--dashed` (globais)
- **Comportamento:** ao clicar, adiciona uma ação vazia (sem webhook) ao fim da lista.
- **Regras:** não aparece em somente leitura.

#### Mensagem "Nenhuma ação"
- **Tag:** `portal.generic.label.no-actions`
- **CSS:** `.acoes__vazio`
- **Regras:** só aparece em somente leitura, quando não há nenhuma ação; ocupa o lugar da
  lista.

#### Painel de placeholders
- **Componente:** `app-object-trigger-placeholders-panel`
- **CSS:** `.acoes__painel`
- **Regras:** só aparece quando está aberto (ver Fluxo no `README.md` da página) e nunca em
  somente leitura; tem 450px de largura; ao rolar a página, fica fixo 16px abaixo do
  cabeçalho da página (a altura do cabeçalho é a de cada página: 68px na criação, 72px na
  página do gatilho).

### Layout
O componente ocupa a largura toda, com margem interna de 28px nas laterais e no topo e
64px embaixo, e é uma coluna:

1. **Dados gerais:** grade de duas colunas de mesma largura, com 20px entre colunas e
   18px entre linhas: Descrição à esquerda e Status à direita; Observações embaixo,
   ocupando as duas colunas. Cada campo é um `form-field` (globais): rótulo em cima, campo
   e mensagem de erro embaixo.
2. **Divisor.**
3. **Seção Condições:** título e subtítulo; bloco "Todas"; bloco "Qualquer". 28px entre
   esses itens.
4. **Divisor.**
5. **Seção Ações:** título e subtítulo; abaixo, a lista de ações seguida do botão
   "Adicionar ação" (ou da mensagem "Nenhuma ação", em somente leitura). Com o painel de
   placeholders aberto, essa área vira duas colunas: a lista à esquerda (ocupa o espaço
   restante) e o painel à direita (450px), com 20px entre elas, alinhados pelo topo.

### Estados
| Estado          | Quando                                                                       | O que deve ser exibido |
| --------------- | ---------------------------------------------------------------------------- | ---------------------- |
| Carregando      | Enquanto as opções (e, na página do gatilho, o próprio gatilho) são buscadas | Com `aria-busy="true"`, todos os blocos viram skeleton (`skeleton`, globais), ocultos para leitores de tela: dados gerais com dois rótulos e campos lado a lado e um rótulo com campo de 80px na largura toda; seção Condições com título, subtítulo e dois blocos de 88px; seção Ações com título, subtítulo e um bloco de 88px; os divisores continuam entre as seções |
| Edição          | Página de criação, ou página do gatilho depois de "Editar"                   | Campos habilitados conforme as regras de cada um; botões de adicionar e remover visíveis |
| Somente leitura | Página do gatilho fora do modo de edição                                     | Todos os campos desabilitados, com fundo `#F3F4F6` e o valor em `#374151` (`modo-leitura`, globais); sem "Adicionar ação", sem painel de placeholders; seções sem itens com as mensagens "Nenhuma condição" e "Nenhuma ação" |
| Campo com erro  | Em edição, um campo obrigatório ficou vazio ou inválido e o usuário saiu dele | Borda vermelha e mensagem de erro abaixo do campo |

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
| .pagina__conteudo     | padding: 28px 28px 64px; |
| .dados                | display: grid;<br>grid-template-columns: repeat(2, minmax(0, 1fr));<br>gap: 18px 20px; |
| .dados__largo         | grid-column: 1 / -1; |
| .divisor              | margin: 40px 0 32px;<br>border: 0;<br>border-top: 1px solid #EEF0F3; |
| .secao                | display: flex;<br>flex-direction: column;<br>gap: 28px; |
| .secao__cabecalho     | display: flex;<br>flex-direction: column;<br>gap: 6px;<br>margin-bottom: 4px; |
| .secao__titulo        | margin: 0;<br>color: #1E293B; |
| .secao__subtitulo     | margin: 0;<br>font: var(--secondary-md);<br>color: #4B5563; |
| .acoes                | display: grid;<br>grid-template-columns: minmax(0, 1fr);<br>align-items: start;<br>gap: 20px; |
| .acoes--com-painel    | grid-template-columns: minmax(0, 1fr) 450px; |
| .acoes__lista         | display: flex;<br>flex-direction: column;<br>gap: 12px; |
| .acoes__vazio         | margin: 0;<br>font: var(--secondary-md);<br>color: #6B7280; |
| .acoes__painel        | position: sticky;<br>top: calc(var(--cabecalho-altura, 68px) + 16px); |
| .esqueleto__campo     | display: flex;<br>flex-direction: column;<br>gap: 6px; |
| .esqueleto__rotulo    | width: 96px;<br>height: 14px; |
| .esqueleto__input     | height: 40px;<br>border-radius: 6px; |
| .esqueleto__textarea  | height: 80px;<br>border-radius: 6px; |
| .esqueleto__titulo    | width: 140px;<br>height: 20px; |
| .esqueleto__subtitulo | width: 320px;<br>height: 14px; |
| .esqueleto__bloco     | height: 88px;<br>border-radius: 8px; |
