# app-object-trigger-card

### Aplicação
Card que representa um gatilho na lista de gatilhos. Mostra o status e a descrição do
gatilho e dá acesso à página do gatilho pelo botão "Abrir".

### Componentização
— (não se aplica)

### Elementos

#### Rótulo "Status"
- **Tag:** `portal.generic.label.status`
- **CSS:** `kv-k` (globais)

#### Selo do status
- **Tag:** `portal.generic.label.active` (Ativo) ou `portal.generic.label.inactive` (Inativo)
- **CSS:** `selo-status` com `selo-status--ativo` ou `selo-status--inativo` (globais)
- **Regras:** "Ativo" em azul (`selo-status--ativo`); "Inativo" em cinza
  (`selo-status--inativo`). O texto do selo sempre acompanha a cor.
- **Origem do dado:** `--`

#### Rótulo "Descrição"
- **Tag:** `iclass.generic.label.description`
- **CSS:** `kv-k` (globais)

#### Descrição do gatilho
- **CSS:** `kv-v` (globais)
- **Regras:** com mais de 50 caracteres, mostra os 50 primeiros (sem espaços no fim)
  seguidos de "…"; até 50 caracteres, mostra o texto inteiro. Não há tooltip com o texto
  completo.
- **Origem do dado:** `--`

#### Botão "Abrir"
- **Tag:** — (só ícone, sem tooltip, por decisão do time); o nome para leitores de tela é a
  própria descrição do gatilho.
- **Ícone:** `pi pi-window-maximize`
- **CSS:** `.card__abrir`
- **Comportamento:** ao clicar, abre a página do gatilho (`/object-trigger/<id do gatilho>`;
  ver `../home/README.md`). Ao passar o mouse, o cursor vira a mãozinha (pointer).
- **Regras:** é o único ponto clicável do card.

### Layout
O card é uma linha única (`reg-card`, globais) dividida em três colunas:

1. **Esquerda (260px):** rótulo "Status" em cima e o selo do status embaixo.
2. **Centro (ocupa o espaço restante):** rótulo "Descrição" em cima e a descrição embaixo.
3. **Direita (32px):** botão "Abrir".

As colunas ficam alinhadas verticalmente ao centro.

### Estados
| Estado     | Quando                                        | O que deve ser exibido |
| ---------- | --------------------------------------------- | ---------------------- |
| Padrão     | Card exibido                                  | Status, descrição e botão "Abrir" |
| Hover/foco | Cursor sobre o card ou foco pelo teclado      | O card não muda (sem hover) e o cursor fica normal; só sobre o botão "Abrir" o cursor vira a mãozinha. Com foco pelo teclado, o botão "Abrir" recebe contorno `#3B82F655` de 2px |
| Ativo      | Gatilho com status Ativo                      | Selo azul com `portal.generic.label.active` |
| Inativo    | Gatilho com status Inativo                    | Selo cinza com `portal.generic.label.inactive` |

### Comportamentos
- **Dado** um card, **quando** o usuário clica em qualquer ponto fora do botão "Abrir",
  **então** nada acontece.

### CSS
| Classe                     | Definição |
| -------------------------- | --------- |
| :host                      | display: block; |
| .card                      | grid-template-columns: 260px minmax(0, 1fr) 32px; |
| .card__abrir:focus-visible | outline: 2px solid #3B82F655;<br>outline-offset: 2px; |
| .card__abrir               | display: flex;<br>align-items: center;<br>justify-content: center;<br>width: 32px;<br>height: 32px;<br>border-radius: 4px;<br>font-size: 16px;<br>color: #1F2937;<br>text-decoration: none;<br>cursor: pointer; |
