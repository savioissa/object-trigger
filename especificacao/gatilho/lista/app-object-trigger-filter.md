# app-object-trigger-filter

### Aplicação
Painel de filtro da lista de gatilhos. Permite ao usuário restringir os gatilhos exibidos
pela descrição e pelo status. 

### Componentização
| Componente   | Tipo    | Onde é usado |
| ------------ | ------- | ------------ |
| `pInputText` | Externo | Campo Descrição |
| `p-dropdown` | Externo | Campo Status |

### Elementos

#### Rótulo "Descrição"
- **Tag:** `iclass.generic.label.description`
- **CSS:** `filter-panel__label`; associado ao campo Descrição.

#### Campo Descrição
- **Tag:** `portal.generic.placeholder.search` (placeholder)
- **Componente:** `pInputText`
- **CSS:** `filter-panel__input w-full`
-
#### Rótulo "Status"
- **Tag:** `portal.generic.label.status`
- **CSS:** `filter-panel__label`; associado ao campo Status.

#### Campo Status
- **Tag:** `portal.generic.label.select` (placeholder)
- **Componente:** `p-dropdown`, com o botão de limpar
- **CSS:** `filter-panel__operator` no `p-dropdown` e, no painel da lista,
  `filter-panel__operator-panel`
- **Regras:** opções "Ativo" (`portal.generic.label.active`) e "Inativo"
  (`portal.generic.label.inactive`), nessa ordem; começa vazio (todos os status); o texto
  selecionado e o da lista usam a mesma tag.

### Layout
Painel com fundo cinza-claro (`div-filter`) e, dentro dele, uma grade em que os campos
dividem a largura disponível em partes iguais. Com os dois filtros atuais, cada um ocupa
metade (`grid` com `col-6` em cada campo, PrimeFlex): Descrição à esquerda e Status à
direita, sem coluna vazia. Cada campo é uma coluna
com 4px entre o rótulo, em cima, e o campo, embaixo (`flex flex-column gap-1`, PrimeFlex).

### Estados
| Estado           | Quando                                                  | O que deve ser exibido |
| ---------------- | ------------------------------------------------------- | ---------------------- |
| Fechado          | Estado inicial, ou o usuário fechou o painel            | Painel oculto |
| Aberto           | O usuário abriu o painel                                | Campos Descrição e Status com os valores atuais |
| Com filtro ativo | Descrição ou Status preenchido                          | Com o painel aberto, os campos preenchidos. Com o painel fechado, nada indica que há filtro ativo (decisão do time); o filtro continua aplicado |


