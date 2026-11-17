# Gatilho — home

### Propósito
Página de um gatilho específico, aberta a partir da lista ou depois de criar um gatilho.
Permite ao usuário consultar o gatilho, com o mesmo formulário da criação em somente
leitura, e editá-lo.

### Componentização
| Componente                              | Tipo    | Papel na página |
| --------------------------------------- | ------- | --------------- |
| `app-object-trigger-home`               | Interno | Contêiner da página: cabeçalho com voltar e identificação, barra de ações (Editar, Cancelar e Salvar). |
| `app-object-trigger-fields`             | Interno | Corpo do formulário, em somente leitura ou em edição (`../criacao/app-object-trigger-fields.md`). |
| `app-object-trigger-condition-group`    | Interno | Blocos "Todas" e "Qualquer" (`../criacao/app-object-trigger-condition-group.md`). |
| `app-object-trigger-action`             | Interno | Uma por ação (`../criacao/app-object-trigger-action.md`). |
| `app-object-trigger-json-editor`        | Interno | Corpo da requisição de cada ação (`../criacao/app-object-trigger-json-editor.md`). |
| `app-object-trigger-placeholders-panel` | Interno | Painel de placeholders, só em edição (`../criacao/app-object-trigger-placeholders-panel.md`). |
| `p-toast`                               | Externo | Mensagens de sucesso e erro. |

### Layout
A página é dividida em três partes:

1. **Cabeçalho (topo, fixo ao rolar):** voltar, nome do objeto e título
   (`app-object-trigger-home`).
2. **Barra de ações (abaixo do cabeçalho, à direita):** "Editar", ou "Cancelar" e "Salvar"
   (`app-object-trigger-home`).
3. **Conteúdo (abaixo, rolável):** `app-object-trigger-fields`, com o mesmo layout da
   criação (ver `../criacao/README.md` › Layout).

### Fluxo entre os componentes
- **Dado** a página aberta, **quando** o gatilho e as opções terminam de carregar,
  **então** `app-object-trigger-home` preenche `app-object-trigger-fields` com o gatilho
  salvo, em somente leitura, e entrega as opções como na criação.
- **Dado** somente leitura, **quando** o usuário clica em "Editar" em
  `app-object-trigger-home`, **então** `app-object-trigger-fields` passa para edição:
  campos liberados conforme as regras de cada um, botões de adicionar e remover e o link de
  placeholders visíveis.
- **Dado** edição, **quando** o usuário altera qualquer campo em
  `app-object-trigger-fields`, `app-object-trigger-condition-group` ou
  `app-object-trigger-action`, **então** `app-object-trigger-home` reavalia se o botão
  "Salvar" fica habilitado.
- **Dado** edição, **quando** o usuário clica em "Cancelar" ou o gatilho é salvo com
  sucesso, **então** `app-object-trigger-fields` volta para somente leitura, com os dados
  salvos, e o painel de placeholders fecha.
- Os fluxos internos do formulário (painel de placeholders, remover ação, validação do
  corpo) são os mesmos da criação (ver `../criacao/README.md` › Fluxo entre os
  componentes), trocando "Criar" por "Salvar".

### Referências visuais
— (não se aplica: o time optou por não anexar prints a esta especificação)
