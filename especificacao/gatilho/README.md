# Gatilho

### Entidade principal e secundárias
| Entidade         | Papel      | Tag                                      | Tradução EN   | Na API |
| ---------------- | ---------- | ---------------------------------------- | ------------- | ------ |
| Gatilho          | Principal  | `portal.generic.label.trigger`           | Trigger       | `ObjectTriggerDTO` |
| Condição         | Secundária | `portal.measurementtype.label.condition` | Condition     | `ObjectTriggerConditionDTO` |
| Categoria        | Secundária | `portal.generic.label.category`          | Category      | `ObjectTriggerFieldDTO` (o campo observado) |
| Ação             | Secundária | `portal.generic.label.action`            | Action        | `ObjectTriggerActionDTO` |
| Webhook          | Secundária | `portal.generic.label.webhook`           | Webhook       | `WebhookDTO` |
| Ordem de serviço | Secundária | `iclass.generic.label.service-order`     | Service order | `ObjectTriggerFieldDTO.objectType` = 1 (o objeto a que o campo pertence) |

### Glossário
| Termo               | Significado |
| ------------------- | ----------- |
| Gatilho             | Regra automática que executa ações quando as condições são atendidas. É a entidade principal desta especificação. |
| Condição            | Critério que decide se o gatilho é executado. É formada por Categoria, Operador e Valor. |
| Bloco "Todas"       | Bloco de condições em que todas precisam ser atendidas ("Todas as condições devem ser atendidas"). Suas condições são do tipo AND (1). |
| Bloco "Qualquer"    | Bloco de condições em que basta uma ser atendida ("Qualquer condição deve ser atendida"). Suas condições são do tipo OR (2). |
| Tipo da condição    | AND (1) ou OR (2), em `ObjectTriggerDTO.conditions[].type`. É definido pelo bloco em que o usuário preenche a condição, não por um campo. |
| Categoria           | Dado avaliado na condição, organizado em grupos (ex.: grupo "Ordem de serviço", categoria "Status"). O tipo da categoria (Lista, Número, Data ou Texto) define como o Valor é informado. Na API, a categoria da tela é o **campo** (`ObjectTriggerFieldDTO`, ex.: `actstatus`), e o grupo é o **objeto** a que o campo pertence (`objectType`, ex.: 1 = Ordem de serviço). Na API, "categoria" é o nome do objeto, ou seja, do grupo da tela. |
| Operador            | Comparação feita na condição (ex.: Igual a, Entre, Presente). Alguns operadores não usam Valor; "Entre" e "Entre ou igual" usam dois (de e até). |
| Valor               | Valor com que a categoria é comparada. |
| Ação                | O que o gatilho faz quando as condições são atendidas. Hoje, só "Chamar webhook". |
| Webhook             | Chamada HTTP cadastrada, com nome, URL, descrição, método e corpo modelo. |
| Corpo da requisição | Texto JSON enviado pelo webhook, editável na ação. |
| Ordem de serviço    | Entidade cujos dados (como o Status) são avaliados nas condições. |
| Somente leitura     | Modo da página do gatilho em que os campos aparecem travados; "Editar" leva ao modo de edição. |
| Lista               | Página que lista os gatilhos cadastrados, com filtro, ordenação e paginação. |
| Criação             | Página de cadastro de um novo gatilho. |
| Home                | Página de um gatilho específico (também chamada de página do gatilho), aberta a partir da lista ou depois de criar um gatilho; permite consultar e editar. |

### Pastas
Na raiz ficam este README e `traducoes.md`. As pastas `list/`, `create/` e `home/` têm um
`.md` por componente. A pasta `form/` tem o formulário e duas subpastas, `conditions/` e
`actions/`, e um README que explica essa organização.

| Pasta             | Componente                           | Papel           | Status   |
| ----------------- | ------------------------------------ | --------------- | -------- |
| list              | `app-object-trigger-list`            | list            | definido |
| list              | `app-object-trigger-filter`          | filter          | definido |
| list              | `app-object-trigger-card`            | card            | definido |
| create            | `app-object-trigger-create`          | create          | definido |
| home              | `app-object-trigger-home`            | home            | definido |
| form              | `app-object-trigger-form`            | form            | definido |
| form/conditions   | `app-object-trigger-condition-group` | condition-group | definido |
| form/conditions   | `app-object-trigger-condition`       | condition       | definido |
| form/conditions   | `app-object-trigger-category`        | category        | definido |
| form/actions      | `app-object-trigger-action-group`    | action-group    | definido |
| form/actions      | `app-object-trigger-action`          | action          | definido |
| form/actions      | `app-object-trigger-json-editor`     | json-editor     | definido |

`app-object-trigger-form` e os componentes de `form/` servem às duas páginas: criação e
home.

## Páginas

### Lista

#### Propósito
Lista os gatilhos cadastrados. Permite ao usuário localizar um gatilho por filtro e
ordenação, abrir a página de um gatilho e iniciar a criação de um novo.

#### Componentização
| Componente                  | Tipo    | Papel na página |
| --------------------------- | ------- | --------------- |
| `app-object-trigger-list`   | Interno | Contêiner da página: cabeçalho, painel de ordenação, estados e paginação. |
| `app-icl-generic-ordering`  | Externo | Painel opcional de ordenação (componente genérico do produto). Recebe os campos Status e Descrição. |
| `app-object-trigger-filter` | Interno | Painel opcional. Restringe o resultado por Descrição e Status. |
| `app-object-trigger-card`   | Interno | Representa um gatilho. Repete-se para cada gatilho da página. |
| `p-paginator`               | Externo | Paginação do resultado. |
| `p-button`                  | Externo | Botões de ação do cabeçalho. |
| `p-toast`                   | Externo | Mensagem de erro ao carregar. |

#### Layout
A página é dividida em duas seções:

1. **Cabeçalho (topo, fixo ao rolar):** título da página e botões "Novo", "Filtros", "Ordenação" e
   "Atualizar".
2. **Conteúdo (abaixo):** painéis abertos, um `app-object-trigger-card` por gatilho,
   empilhados em uma coluna, e o `p-paginator` embaixo, à direita.

O painel `app-object-trigger-filter` e o painel de ordenação (`app-icl-generic-ordering`),
quando abertos, aparecem no topo do conteúdo, o filtro acima da ordenação.

#### Fluxo entre os componentes
- **Dado** o painel de filtro aberto, **quando** o usuário digita na Descrição ou escolhe um
  Status em `app-object-trigger-filter` (saída `filtroChange`, com o filtro inteiro), **então**
  `app-object-trigger-list` guarda o filtro preenchido, que aparece como chip, sem
  aplicá-lo: a lista não muda.
- **Dado** um filtro preenchido, **quando** o usuário clica em "Atualizar" em
  `app-object-trigger-list`, **então** o filtro preenchido passa a valer, a lista é buscada
  de novo, volta à página 1 (se o filtro mudou) e mostra o estado Com resultados ou Sem
  resultado (com filtro).
- **Dado** algum filtro preenchido, **quando** o usuário remove um chip ou clica em
  "Limpar Filtros" em `app-object-trigger-filter` (saída `aplicar`, com o filtro que fica),
  **então** `app-object-trigger-list` aplica esse filtro na hora, sem precisar do
  "Atualizar", e volta à página 1.
- **Dado** a lista com resultados, **quando** o usuário clica em "Abrir" em
  `app-object-trigger-card`, **então** a página do gatilho é aberta
  (`/object-trigger/<id do gatilho>/home`; ver Páginas › Home, abaixo).
- **Dado** qualquer estado, **quando** o usuário clica em "Novo" em
  `app-object-trigger-list`, **então** a página de criação é aberta
  (`/object-trigger/register`; ver Páginas › Criação, abaixo).

### Criação

#### Propósito
Cadastra um novo gatilho. Permite ao usuário descrever o gatilho, definir as condições que
fazem ele ser executado (todas precisam ser atendidas, ou basta uma) e as ações que ele
executa (hoje, chamar um webhook com um corpo de requisição).

#### Componentização
| Componente                              | Tipo    | Papel na página |
| --------------------------------------- | ------- | --------------- |
| `app-object-trigger-create`             | Interno | Contêiner da página: cabeçalho com Cancelar e Criar; busca as opções e cria o gatilho. |
| `app-object-trigger-form`               | Interno | Corpo do formulário: dados gerais e seções Condições e Ações. Também usado na página do gatilho. |
| `app-object-trigger-condition-group`    | Interno | Bloco de condições. Aparece duas vezes: "Todas" e "Qualquer". |
| `app-object-trigger-condition`          | Interno | Uma condição (Categoria, Operador e Valor). Repete-se para cada condição do bloco. |
| `app-object-trigger-category`           | Interno | Campo Categoria (rótulo e select) dentro de cada condição. |
| `app-object-trigger-action-group`       | Interno | Lista de ações, com adicionar e remover. |
| `app-object-trigger-action`             | Interno | Configura uma ação (webhook e corpo). Repete-se para cada ação do grupo. |
| `app-object-trigger-json-editor`        | Interno | Campo do corpo da requisição, dentro de cada ação com webhook. |
| `p-toast`                               | Externo | Mensagens de sucesso e erro da página. |

#### Layout
A página é dividida em duas partes:

1. **Cabeçalho (topo, fixo ao rolar):** título da página e os botões "Cancelar" e "Criar"
   (`app-object-trigger-create`).
2. **Conteúdo (abaixo, rolável):** `app-object-trigger-form`, com os dados gerais; a
   seção Condições, com os dois `app-object-trigger-condition-group` empilhados ("Todas"
   acima de "Qualquer"), cada um com uma `app-object-trigger-condition` por condição; e a
   seção Ações, com o `app-object-trigger-action-group`: as `app-object-trigger-action`
   empilhadas e o botão "Adicionar ação". As seções são separadas por divisores.

#### Fluxo entre os componentes
- **Dado** a página aberta, **quando** as opções terminam de carregar, **então**
  `app-object-trigger-create` entrega categorias e webhooks a `app-object-trigger-form`, que
  entrega as categorias aos dois `app-object-trigger-condition-group` (que as repassam a cada
  `app-object-trigger-condition`, que as passa a `app-object-trigger-category`) e os webhooks a `app-object-trigger-action-group` (que os
  repassa a cada `app-object-trigger-action`).
- **Dado** qualquer estado, **quando** o usuário adiciona ou remove uma condição em
  `app-object-trigger-condition-group`, ou preenche uma em `app-object-trigger-condition`,
  **então** `app-object-trigger-create` reavalia se
  o botão "Criar" fica habilitado.
- **Dado** uma ação, **quando** o usuário edita o corpo em `app-object-trigger-json-editor`,
  **então** `app-object-trigger-action` valida o corpo (obrigatório e JSON válido) e
  `app-object-trigger-create` reavalia se o botão "Criar" fica habilitado.
- **Dado** uma ação, **quando** o usuário clica em "Remover ação" (lixeira ao lado do card)
  em `app-object-trigger-action-group`, **então** o grupo remove a ação da lista, sem
  confirmação, e `app-object-trigger-create` reavalia o botão "Criar".

### Home

#### Propósito
Página de um gatilho específico, aberta a partir da lista ou depois de criar um gatilho.
Permite ao usuário consultar o gatilho, com o mesmo formulário da criação em somente
leitura, e editá-lo.

#### Componentização
| Componente                              | Tipo    | Papel na página |
| --------------------------------------- | ------- | --------------- |
| `app-object-trigger-home`               | Interno | Contêiner da página: cabeçalho com voltar e identificação, barra de ações (Editar, Cancelar e Salvar). |
| `app-object-trigger-form`               | Interno | Corpo do formulário, em somente leitura ou em edição (`form/app-object-trigger-form.md`). |
| `app-object-trigger-condition-group`    | Interno | Blocos "Todas" e "Qualquer" (`form/conditions/app-object-trigger-condition-group.md`). |
| `app-object-trigger-condition`          | Interno | Uma por condição de cada bloco (`form/conditions/app-object-trigger-condition.md`). |
| `app-object-trigger-category`           | Interno | Campo Categoria de cada condição (`form/conditions/app-object-trigger-category.md`). |
| `app-object-trigger-action-group`       | Interno | Lista de ações (`form/actions/app-object-trigger-action-group.md`). |
| `app-object-trigger-action`             | Interno | Uma por ação (`form/actions/app-object-trigger-action.md`). |
| `app-object-trigger-json-editor`        | Interno | Corpo da requisição de cada ação (`form/actions/app-object-trigger-json-editor.md`). |
| `p-toast`                               | Externo | Mensagens de sucesso e erro. |

#### Layout
A página é dividida em três partes:

1. **Cabeçalho (topo, fixo ao rolar):** voltar, nome do objeto e título
   (`app-object-trigger-home`).
2. **Barra de ações (abaixo do cabeçalho, à direita):** "Editar", ou "Cancelar" e "Salvar"
   (`app-object-trigger-home`).
3. **Conteúdo (abaixo, rolável):** `app-object-trigger-form`, com o mesmo layout
   do corpo da criação (ver Páginas › Criação › Layout, acima).

#### Fluxo entre os componentes
- **Dado** a página aberta, **quando** o gatilho e as opções terminam de carregar,
  **então** `app-object-trigger-home` preenche `app-object-trigger-form` com o gatilho
  salvo, em somente leitura, e entrega as opções como na criação.
- **Dado** somente leitura, **quando** o usuário clica em "Editar" em
  `app-object-trigger-home`, **então** `app-object-trigger-form` passa para edição:
  campos liberados conforme as regras de cada um e botões de adicionar e remover visíveis.
- **Dado** edição, **quando** o usuário altera qualquer campo em
  `app-object-trigger-form`, `app-object-trigger-condition-group`,
  `app-object-trigger-condition`, `app-object-trigger-category`,
  `app-object-trigger-action-group` ou
  `app-object-trigger-action`, **então** `app-object-trigger-home` reavalia se o botão
  "Salvar" fica habilitado.
- **Dado** edição, **quando** o usuário clica em "Cancelar" ou o gatilho é salvo com
  sucesso, **então** `app-object-trigger-form` volta para somente leitura, com os dados
  salvos.
- Os fluxos internos do formulário (remover ação, validação do corpo) são os mesmos da
  criação (ver Páginas › Criação › Fluxo entre os componentes), trocando "Criar" por
  "Salvar".

### Referências visuais
— (não se aplica: o time optou por não anexar prints a esta especificação)
