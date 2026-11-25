# app-object-trigger-filter

### Aplicação
Painel de filtro da lista de gatilhos. Permite ao usuário restringir os gatilhos exibidos
pela descrição e pelo status. Cada filtro preenchido vira um chip em "Filtros
selecionados"; preencher não aplica o filtro: ele só passa a valer na lista quando o usuário
clica em "Atualizar" (ver `../README.md` › Lista › Fluxo entre os componentes). Remover um chip ou "Limpar
Filtros" aplica na hora.

### Componentização
| Componente   | Tipo    | Onde é usado |
| ------------ | ------- | ------------ |
| `pInputText` | Externo | Campo Descrição |
| `p-dropdown` | Externo | Campo Status |
| `p-chip`     | Externo | Um chip por filtro preenchido, em "Filtros selecionados" |
| `p-button`   | Externo | Botão "Limpar Filtros" |

### Elementos

#### Rótulo "Descrição"
- **Tag:** `iclass.generic.label.description`
- **CSS:** `filter-panel__label`; associado ao campo Descrição.

#### Campo Descrição
- **Tag:** `portal.generic.placeholder.search` (placeholder)
- **Componente:** `pInputText`
- **CSS:** `filter-panel__input w-full`
- **Comportamento:** a cada caractere digitado, o chip de Descrição é criado ou atualizado;
  o filtro não é aplicado.
- **Regras:** busca por "contém", sem diferenciar maiúsculas e minúsculas nem acentos;
  espaços nas pontas são ignorados; vazio (ou só espaços), não gera chip.
- **Filtro:** `description`

#### Rótulo "Status"
- **Tag:** `portal.generic.label.status`
- **CSS:** `filter-panel__label`; associado ao campo Status.

#### Campo Status
- **Tag:** `portal.generic.label.select` (placeholder)
- **Componente:** `p-dropdown`, com o botão de limpar
- **CSS:** `filter-panel__operator` no `p-dropdown` e, no painel da lista,
  `filter-panel__operator-panel`
- **Comportamento:** ao escolher uma opção, o chip de Status é criado ou atualizado; ao limpar
  (ícone de limpar do dropdown), o chip some. Em nenhum dos casos o filtro é aplicado.
- **Regras:** opções "Em edição" (`portal.generic.label.in-edit`), "Ativo"
  (`portal.generic.label.active`) e "Inativo" (`portal.generic.label.inactive`), nessa
  ordem (a do enum `ObjectTriggerStatus`); começa vazio (todos os status); o texto selecionado e o da lista usam a
  mesma tag.
- **Filtro:** `status`

#### Rótulo "Filtros selecionados"
- **Tag:** `portal.generic.label.selected-filters`
- **CSS:** `filter-label`
- **Regras:** só aparece com ao menos um filtro preenchido.

#### Chip de filtro
- **Componente:** `p-chip`, removível, um por filtro preenchido, na ordem dos campos
  (Descrição, depois Status)
- **Ícone:** `pi pi-times-circle` (remover)
- **CSS:** `chips-container`
- **Comportamento:** ao clicar no ícone de remover, o campo correspondente é esvaziado e o
  filtro é aplicado na hora, com o que continua preenchido nos outros campos (ver Fluxo no
  `../README.md` › Lista).
- **Regras:** o texto é "<nome do filtro>: <valor>", com o nome pela tag do rótulo do campo
  (`iclass.generic.label.description` ou `portal.generic.label.status`) e o valor como foi
  digitado (Descrição, sem espaços nas pontas) ou pela tag da opção (Status, ex.:
  "Status: Ativo").

#### Botão "Limpar Filtros"
- **Tag:** `portal.generic.label.clean-filters`
- **Componente:** `p-button`
- **CSS:** `customer-portal-button-negative`; `flex-shrink-0` (PrimeFlex); texto vermelho,
  sem fundo nem borda.
- **Comportamento:** ao clicar, esvazia todos os campos, remove todos os chips e aplica na
  hora (a lista volta a mostrar todos os gatilhos; ver `../README.md` › Lista › Fluxo entre os componentes).
- **Regras:** só aparece com ao menos um filtro preenchido.

### Layout
Painel com fundo cinza-claro (`div-filter`) e, dentro dele, uma grade em que os campos
dividem a largura disponível em partes iguais. Com os dois filtros atuais, cada um ocupa
metade (`grid` com `col-6` em cada campo, PrimeFlex): Descrição à esquerda e Status à
direita, sem coluna vazia. Cada campo é uma coluna
com 4px entre o rótulo, em cima, e o campo, embaixo (`flex flex-column gap-1`, PrimeFlex).

Abaixo dos campos, com 8px de distância (`flex flex-column gap-2`), fica a linha de "Filtros
selecionados" (`flex align-items-center justify-content-between gap-3`, PrimeFlex): à
esquerda, o rótulo seguido dos chips, com 8px entre eles e quebrando linha se não couberem
(`flex align-items-center flex-wrap gap-2 min-w-0`); à direita, o botão "Limpar Filtros".
Com o painel fechado e algum filtro preenchido, o painel mostra só essa linha, sem os
campos.

### Estados
| Estado           | Quando                                                  | O que deve ser exibido |
| ---------------- | ------------------------------------------------------- | ---------------------- |
| Fechado                     | Estado inicial, ou o usuário fechou o painel, sem filtro preenchido | Painel oculto |
| Aberto                      | O usuário abriu o painel, sem filtro preenchido          | Campos Descrição e Status vazios; sem a linha de "Filtros selecionados" |
| Com filtros selecionados    | Painel aberto e Descrição ou Status preenchido           | Campos preenchidos e, abaixo, a linha de "Filtros selecionados" com um chip por filtro e o botão "Limpar Filtros" |
| Fechado, com filtros        | Painel fechado e Descrição ou Status preenchido          | Só a linha de "Filtros selecionados", com os chips e o botão "Limpar Filtros" |
| Preenchido, não aplicado    | O usuário preencheu ou mudou um filtro e ainda não clicou em "Atualizar" | Os chips já mostram o novo valor; a lista continua com o filtro anterior até o "Atualizar" |

### Comportamentos
- **Dado** um filtro preenchido, **quando** o usuário fecha o painel, **então** os campos
  somem, mas a linha de "Filtros selecionados" continua visível, com os chips.

### CSS
— (não se aplica: só classes globais e do PrimeFlex)
