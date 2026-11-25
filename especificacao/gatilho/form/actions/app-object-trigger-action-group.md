# app-object-trigger-action-group

### Aplicação
Lista de ações do gatilho, dentro da seção Ações. Mostra as ações, uma por linha, e permite
adicionar e remover ações, sem limite de quantidade. Cada ação é um
`app-object-trigger-action`; o botão de remover fica neste componente, ao lado dela. O título
e o subtítulo da seção ficam em `app-object-trigger-form`.

### Componentização
| Componente                  | Tipo    | Onde é usado |
| --------------------------- | ------- | ------------ |
| `app-object-trigger-action` | Interno | Uma por ação da lista (`app-object-trigger-action.md`) |
| `p-button`                  | Externo | Botões "Remover ação" e "Adicionar ação" |

### Entradas e saídas
| Nome             | Tipo    | Descrição |
| ---------------- | ------- | --------- |
| `acoes`          | Entrada | Lista de ações do gatilho. |
| `webhooks`       | Entrada | Webhooks cadastrados, repassados a cada ação. |
| `somenteLeitura` | Entrada | Página do gatilho fora do modo de edição: sem adicionar nem remover ações. |

### Elementos

#### Lista de ações
- **Componente:** `app-object-trigger-action`, um por ação, recebendo a ação e os webhooks.
- **CSS:** `flex flex-column gap-3` (PrimeFlex); 1rem entre as linhas.
- **Regras:** as ações aparecem na ordem em que foram adicionadas; sem limite de
  quantidade; sem nenhuma ação, a lista não aparece. Em somente leitura, cada
  `app-object-trigger-action` recebe a ação com os campos desabilitados.

#### Botão "Remover ação"
- **Tag:** — (só ícone, sem tooltip nem `aria-label`, por decisão do time)
- **Componente:** `p-button`
- **Ícone:** `pi pi-trash`
- **CSS:** `btn--md btn--neutral`; `flex-shrink-0` (PrimeFlex); ícone cinza, sem fundo; 48 × 32px, com a
  largura padrão do PrimeNG para botão só com ícone.
- **Comportamento:** ao clicar, remove a ação imediatamente, sem confirmação.
- **Regras:** não aparece em somente leitura.

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

### Layout
O grupo é uma coluna, com 1rem entre os itens (`flex flex-column gap-3`, PrimeFlex):

1. **Lista de ações:** cada linha tem duas partes, alinhadas ao centro e com 16px entre elas
   (`flex align-items-center gap-3`, PrimeFlex):
   1. **Esquerda (ocupa o espaço restante):** `app-object-trigger-action` (`flex-1 min-w-0`,
      PrimeFlex), com o card da ação (layout interno em `app-object-trigger-action.md`).
   2. **Direita (largura do botão, 48px):** botão "Remover ação", centralizado na altura do
      card. Em somente leitura, essa coluna não existe e o card ocupa a largura toda.
2. **Botão "Adicionar ação" (embaixo, alinhado à esquerda).** Em somente leitura, não
   aparece; sem ações, a mensagem "Nenhuma ação" fica no lugar da lista.

### Estados
| Estado                     | Quando                                   | O que deve ser exibido |
| -------------------------- | ---------------------------------------- | ---------------------- |
| Sem ações                  | Nenhuma ação na lista                    | Só o botão "Adicionar ação" |
| Com ações                  | Uma ou mais ações                        | Uma `app-object-trigger-action` por ação, cada uma com a lixeira ao lado; "Adicionar ação" embaixo |
| Somente leitura            | Página do gatilho fora do modo de edição | Ações com os campos desabilitados (estados em `app-object-trigger-action.md`); sem "Remover ação" nem "Adicionar ação" |
| Somente leitura sem ações  | Somente leitura e nenhuma ação           | `portal.generic.label.no-actions` |

### Comportamentos
- **Dado** o grupo em edição, **quando** o usuário clica em "Adicionar ação", **então** uma
  nova `app-object-trigger-action` vazia aparece no fim da lista.
- **Dado** o grupo em edição, **quando** o usuário clica na lixeira de uma ação, **então**
  aquela `app-object-trigger-action` sai da lista, sem confirmação.
- Os comportamentos dos campos (troca de webhook, validação do corpo etc.) estão em
  `app-object-trigger-action.md`.

### CSS
| Classe | Definição       |
| ------ | --------------- |
| :host  | display: block; |
