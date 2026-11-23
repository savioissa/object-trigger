# app-object-trigger-placeholders-panel

### Aplicação
Painel lateral que lista os placeholders que podem ser usados no corpo da requisição de uma
ação, agrupados por abas (por exemplo, Ordem de serviço, Cliente e Técnico). Permite ao
usuário consultar o nome e o código de cada placeholder e copiar o código para colá-lo no
corpo.

### Componentização

| Componente    | Tipo    | Onde é usado                                     |
| ------------- | ------- | ------------------------------------------------ |
| `p-button`    | Externo | Botão "Fechar" e botão "Copiar" de cada item     |
| `p-tabView`   | Externo | Abas dos grupos de placeholders                  |
| `p-tabPanel`  | Externo | Uma aba por grupo                                |

### Elementos

#### Título do painel
- **Tag:** `portal.generic.label.available-placeholders`
- **CSS:** `medium`; `m-0` (PrimeFlex); h3.

#### Botão "Fechar"
- **Tag:** — (só ícone, sem tooltip nem `aria-label`, por decisão do time)
- **Componente:** `p-button`
- **Ícone:** `pi pi-times`
- **CSS:** `btn--md btn--neutral`; `flex-shrink-0` (PrimeFlex); ícone cinza, sem fundo; 48 × 32px, com a
  largura padrão do PrimeNG para botão só com ícone.
- **Comportamento:** ao clicar, fecha o painel (ver Fluxo no `README.md` da página).

#### Abas dos grupos
- **Componente:** `p-tabView`, com um `p-tabPanel` por grupo
- **CSS:** `req-tabs`
- **Comportamento:** ao clicar numa aba, exibe os placeholders daquele grupo.
- **Regras:** os grupos aparecem na ordem em que chegam; a primeira aba fica selecionada
  sempre que o painel é aberto; o nome da aba é o nome do grupo.
- **Origem do dado:** `--`

#### Nome do placeholder
- **CSS:** `card-input`; `overflow-hidden text-overflow-ellipsis white-space-nowrap`
  (PrimeFlex); truncado com reticências em uma linha.
- **Regras:** um por placeholder do grupo selecionado, na ordem em que chegam.
- **Origem do dado:** `--`

#### Código do placeholder
- **CSS:** `overflow-hidden text-overflow-ellipsis white-space-nowrap select-all` (PrimeFlex) e
  `.painel__token`; fonte monoespaçada; truncado com reticências em uma linha.
- **Regras:** exibido no formato `{{caminho.do.dado}}` (ex.: `{{os.id}}`); um clique
  seleciona o código inteiro.
- **Origem do dado:** `--`

#### Botão "Copiar"
- **Tag:** — (só ícone, sem tooltip nem `aria-label`, por decisão do time)
- **Componente:** `p-button`
- **Ícone:** `pi pi-copy`
- **CSS:** `btn--md btn--neutral`; `flex-shrink-0` (PrimeFlex); ícone cinza, sem fundo; 48 × 32px, com a
  largura padrão do PrimeNG para botão só com ícone.
- **Comportamento:** ao clicar, copia o código do placeholder para a área de transferência
  e exibe um toast de sucesso por 2,5 segundos, com o título `portal.generic.label.copied`
  e o texto `iclass.generic.label.copied-to-clipboard`. Se a cópia falhar, exibe um toast de
  aviso com o título `portal.generic.label.unable-to-copy` e o texto
  `portal.generic.label.copy-placeholder-manually`. Os textos dos toasts são fixos, sem o
  código do placeholder.

### Layout
Card branco com borda e cantos arredondados (`card-container-default-basic-layout`,
com `overflow-hidden`, PrimeFlex), organizado em uma coluna. As classes abaixo são do
PrimeFlex.

1. **Cabeçalho (topo, `flex align-items-center justify-content-between gap-3 px-3 pt-3
   pb-1`):** título à esquerda e botão "Fechar" à direita, alinhados ao centro.
2. **Abas (abaixo do cabeçalho, largura toda):** nomes dos grupos lado a lado, com uma linha
   inferior de largura total.
3. **Lista (abaixo das abas, `list-none m-0 p-0 pb-2`):** um item por placeholder. Cada
   item é uma linha (`flex align-items-center justify-content-between gap-3 px-3 py-2`) com
   o nome em cima e o código embaixo, à esquerda (`flex flex-column gap-1 min-w-0`), e o
   botão "Copiar" à direita, alinhado ao centro.

### Estados
| Estado          | Quando                                  | O que deve ser exibido                                          |
| --------------- | --------------------------------------- | --------------------------------------------------------------- |
| Padrão          | Painel aberto                           | Primeira aba selecionada e seus placeholders                    |
| Aba selecionada | O usuário clicou em uma aba             | Aba com o destaque padrão do PrimeNG (texto e linha inferior azuis); itens dela |
| Hover no item   | Cursor sobre um item da lista           | Fundo do item na cor `surface-50` do tema (`hover:surface-50`, PrimeFlex) |

### Comportamentos
- **Dado** o painel aberto em uma aba que não é a primeira, **quando** o usuário fecha e
  abre o painel de novo, **então** o painel volta a abrir na primeira aba.

### CSS
| Classe              | Definição |
| ------------------- | --------- |
| :host               | display: block; |
| .painel__token      | font: 400 12px/16px ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;<br>color: #6B7280; |
