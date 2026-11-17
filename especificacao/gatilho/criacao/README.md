# Gatilho — criação

### Propósito
Cadastra um novo gatilho. Permite ao usuário descrever o gatilho, definir as condições que
fazem ele ser executado (todas precisam ser atendidas, ou basta uma) e as ações que ele
executa (hoje, chamar um webhook com um corpo de requisição que pode usar placeholders).

### Componentização
| Componente                              | Tipo    | Papel na página |
| --------------------------------------- | ------- | --------------- |
| `app-object-trigger-form`               | Interno | Contêiner da página: cabeçalho com Cancelar e Criar. |
| `app-object-trigger-fields`             | Interno | Corpo do formulário: dados gerais e seções Condições e Ações. Também usado na página do gatilho. |
| `app-object-trigger-condition-group`    | Interno | Bloco de condições. Aparece duas vezes: "Todas" e "Qualquer". |
| `app-object-trigger-action`             | Interno | Configura uma ação (webhook e corpo). Repete-se para cada ação. |
| `app-object-trigger-json-editor`        | Interno | Campo do corpo da requisição, dentro de cada ação com webhook. |
| `app-object-trigger-placeholders-panel` | Interno | Painel opcional à direita das ações. Lista e copia os placeholders. |
| `p-toast`                               | Externo | Mensagens de sucesso e erro da página e do painel. |

### Layout
A página é dividida em duas partes:

1. **Cabeçalho (topo, fixo ao rolar):** título da página e os botões "Cancelar" e "Criar"
   (`app-object-trigger-form`).
2. **Conteúdo (abaixo, rolável):** `app-object-trigger-fields`, com os dados gerais; a
   seção Condições, com os dois `app-object-trigger-condition-group` empilhados ("Todas"
   acima de "Qualquer"); e a seção Ações, com os `app-object-trigger-action` empilhados e o
   botão "Adicionar ação". As seções são separadas por divisores.

Quando aberto, o `app-object-trigger-placeholders-panel` fica à direita dos
`app-object-trigger-action`, alinhado ao topo da primeira ação, e acompanha a rolagem logo
abaixo do cabeçalho. As ações estreitam para dar espaço a ele.

### Fluxo entre os componentes
- **Dado** a página aberta, **quando** as opções terminam de carregar, **então**
  `app-object-trigger-form` entrega categorias, webhooks e placeholders a
  `app-object-trigger-fields`, que entrega as categorias aos dois
  `app-object-trigger-condition-group`, os webhooks a cada `app-object-trigger-action` e
  os placeholders ao `app-object-trigger-placeholders-panel`.
- **Dado** qualquer estado, **quando** o usuário adiciona, remove ou preenche uma condição
  em `app-object-trigger-condition-group`, **então** `app-object-trigger-form` reavalia se
  o botão "Criar" fica habilitado.
- **Dado** uma ação, **quando** o usuário edita o corpo em `app-object-trigger-json-editor`,
  **então** `app-object-trigger-action` valida o corpo (obrigatório e JSON válido) e
  `app-object-trigger-form` reavalia se o botão "Criar" fica habilitado.
- **Dado** uma ação, **quando** o usuário clica em "Remover ação" em
  `app-object-trigger-action` (saída `remover`), **então** `app-object-trigger-fields`
  remove a ação da lista, sem confirmação, e `app-object-trigger-form` reavalia o botão
  "Criar".
- **Dado** uma ação com webhook, **quando** o usuário clica em "Visualizar placeholders
  disponíveis" em `app-object-trigger-action` (saída `verPlaceholders`), **então**
  `app-object-trigger-fields` abre o `app-object-trigger-placeholders-panel` à direita das
  ações; se o painel já estiver aberto, ele continua aberto como está.
- **Dado** o painel aberto, **quando** o usuário clica em "Fechar" em
  `app-object-trigger-placeholders-panel` (saída `fechar`), **então**
  `app-object-trigger-fields` fecha o painel e as ações voltam a ocupar a largura toda.
- **Dado** o painel aberto, **quando** o usuário copia um placeholder em
  `app-object-trigger-placeholders-panel`, **então** o código vai para a área de
  transferência e o usuário o cola no corpo de qualquer `app-object-trigger-action`; o
  painel não escreve no corpo.

### Referências visuais
— (não se aplica: o time optou por não anexar prints a esta especificação)
