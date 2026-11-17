# app-object-trigger-filter

### Aplicação
Painel de filtro da lista de gatilhos. Permite ao usuário restringir os gatilhos exibidos
pela descrição e pelo status. Recebe o filtro atual e devolve o filtro inteiro a cada
alteração; quem aplica o filtro é `app-object-trigger-list`.

### Componentização
| Componente   | Tipo    | Onde é usado |
| ------------ | ------- | ------------ |
| `pInputText` | Externo | Campo Descrição |
| `p-dropdown` | Externo | Campo Status |

### Elementos

#### Rótulo "Descrição"
- **Tag:** `iclass.generic.label.description`
- **CSS:** `filter-panel__label` (globais); associado ao campo Descrição.

#### Campo Descrição
- **Tag:** `portal.generic.placeholder.search` (placeholder)
- **Componente:** `pInputText`
- **CSS:** `filter-panel__input` (globais), dentro de `filter-panel__control` (globais)
- **Comportamento:** a cada caractere digitado, o filtro é aplicado (ver Fluxo no
  `README.md` da página).
- **Regras:** busca por "contém", sem diferenciar maiúsculas e minúsculas nem acentos;
  espaços nas pontas são ignorados; vazio, não filtra.

#### Rótulo "Status"
- **Tag:** `portal.generic.label.status`
- **CSS:** `filter-panel__label` (globais); associado ao campo Status.

#### Campo Status
- **Tag:** `portal.generic.label.select` (placeholder)
- **Componente:** `p-dropdown`, com o botão de limpar
- **CSS:** `sort-panel__select` e, no painel da lista, `sort-panel__select-panel` (globais)
- **Comportamento:** ao escolher uma opção, o filtro é aplicado (ver Fluxo no `README.md`
  da página); ao limpar (ícone de limpar do dropdown), volta a mostrar todos os status.
- **Regras:** opções "Ativo" (`portal.generic.label.active`) e "Inativo"
  (`portal.generic.label.inactive`), nessa ordem; começa vazio (todos os status); o texto
  selecionado e o da lista usam a mesma tag.

### Layout
Painel com fundo cinza (`filter-panel`, globais), em grade de quatro colunas de mesma
largura com 16px entre elas. Descrição ocupa a primeira coluna e Status a segunda; as duas
últimas ficam vazias. Cada campo é um `filter-panel__field` (globais): rótulo em cima e
campo embaixo.

### Estados
| Estado           | Quando                                                  | O que deve ser exibido |
| ---------------- | ------------------------------------------------------- | ---------------------- |
| Fechado          | Estado inicial, ou o usuário fechou o painel            | Painel oculto |
| Aberto           | O usuário abriu o painel                                | Campos Descrição e Status com os valores atuais |
| Com filtro ativo | Descrição ou Status preenchido                          | Com o painel aberto, os campos preenchidos. Com o painel fechado, nada indica que há filtro ativo (decisão do time); o filtro continua aplicado |

### Comportamentos
- **Dado** um filtro preenchido, **quando** o usuário fecha o painel, **então** o filtro
  continua aplicado e é mostrado de novo ao reabrir.

### CSS
— (usa só classes globais)
