# app-object-trigger-card

### Aplicação
Card que representa um gatilho na lista de gatilhos. Mostra o status e a descrição do
gatilho e dá acesso à página do gatilho pelo botão "Abrir".

### Componentização
| Componente | Tipo    | Onde é usado |
| ---------- | ------- | ------------ |
| `p-chip`   | Externo | Chip do status (Em edição, Ativo ou Inativo) |

### Elementos

#### Chip do status
- **Tag:** `portal.generic.label.in-edit` (Em edição), `portal.generic.label.active` (Ativo) ou
  `portal.generic.label.inactive` (Inativo)
- **Componente:** `p-chip`
- **CSS:** `chips-container-yellow`, `chips-container` ou `chips-container-gray` no `p-chip`
- **Regras:** "Em edição" em amarelo (`chips-container-yellow`); "Ativo" em azul-claro
  (`chips-container`); "Inativo" em cinza (`chips-container-gray`). O texto do chip sempre
  acompanha a cor.
- **Origem do dado:** `ObjectTriggerDTO.status` (enum `ObjectTriggerStatus`)

| Enum | Valor    | Significado | Tag exibida                     | Cor do chip                        |
| ---- | -------- | ----------- | ------------------------------- | ---------------------------------- |
| 1    | EDITING  | Em edição   | `portal.generic.label.in-edit`  | Amarelo (`chips-container-yellow`) |
| 2    | ACTIVE   | Ativo       | `portal.generic.label.active`   | Azul-claro (`chips-container`)     |
| 3    | INACTIVE | Inativo     | `portal.generic.label.inactive` | Cinza (`chips-container-gray`)     |


#### Rótulo "Descrição"
- **Tag:** `iclass.generic.label.description`
- **CSS:** `card-label`

#### Descrição do gatilho
- **CSS:** `card-input`; `overflow-hidden text-overflow-ellipsis
  white-space-nowrap` (PrimeFlex)
- **Regras:** com mais de 50 caracteres, mostra os 50 primeiros (sem espaços no fim)
  seguidos de "…"; até 50 caracteres, mostra o texto inteiro. Não há tooltip com o texto
  completo.
- **Origem do dado:** `ObjectTriggerDTO.description`

#### Botão "Abrir"
- **Tag:** — (só ícone, sem tooltip, por decisão do time); o nome para leitores de tela é a
  própria descrição do gatilho.
- **Ícone:** `pi pi-window-maximize`
- **CSS:** `flex flex-shrink-0 align-items-center justify-content-center w-2rem h-2rem
  border-round-sm text-base no-underline cursor-pointer` (PrimeFlex) e `.cartao__abrir`
- **Comportamento:** ao clicar, abre a página do gatilho (`/object-trigger/<id do gatilho>/home`;
  ver `../README.md` › Home). Ao passar o mouse, o cursor vira a mãozinha (pointer).
- **Regras:** é o único ponto clicável do card.

### Layout
O card é uma linha única em grade de 12 colunas sem calhas (`reg-card`, com `grid
grid-nogutter gap-0 align-items-center px-3 py-2`, PrimeFlex; `gap-0` anula o
`column-gap` do `reg-card`, que faria a última coluna quebrar de linha), dividida em três
colunas:

1. **Esquerda (`col-3 flex pr-3`, 3 de 12):** só o chip do status, do tamanho do texto,
   centralizado na altura do card; 1rem de espaço à direita.
2. **Centro (`col-8 min-w-0`, 8 de 12):** rótulo "Descrição" em cima e a descrição embaixo
   (`flex flex-column gap-1`).
3. **Direita (`col-1 flex justify-content-end`, 1 de 12):** botão "Abrir" (2rem), encostado
   à direita.

As colunas ficam alinhadas verticalmente ao centro; o card tem 1rem de margem interna nas
laterais e 0,5rem em cima e embaixo. As classes deste parágrafo são do PrimeFlex.

### Estados
| Estado     | Quando                                        | O que deve ser exibido |
| ---------- | --------------------------------------------- | ---------------------- |
| Padrão     | Card exibido                                  | Chip do status, descrição e botão "Abrir" |
| Hover/foco | Cursor sobre o card ou foco pelo teclado      | O card não muda (sem hover) e o cursor fica normal; só sobre o botão "Abrir" o cursor vira a mãozinha. Com foco pelo teclado, o botão "Abrir" recebe contorno `#3B82F655` de 2px |
| Em edição  | Gatilho com status Em edição                  | Chip amarelo (`chips-container-yellow`) com `portal.generic.label.in-edit` |
| Ativo      | Gatilho com status Ativo                      | Chip azul-claro (`chips-container`) com `portal.generic.label.active` |
| Inativo    | Gatilho com status Inativo                    | Chip cinza (`chips-container-gray`) com `portal.generic.label.inactive` |


### CSS
| Classe                       | Definição |
| ---------------------------- | --------- |
| :host                        | display: block; |
| .cartao__abrir               | color: #1F2937; |
| .cartao__abrir:focus-visible | outline: 2px solid #3B82F655;<br>outline-offset: 2px; |

Classe global nova, no CSS global do projeto, junto das outras `chips-container-*`:

| Classe                         | Definição |
| ------------------------------ | --------- |
| .chips-container-yellow .p-chip | font-size: 12px;<br>background-color: #FEF3C7;<br>color: #92400E; |

