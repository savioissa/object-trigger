# Gatilho

### Entidade principal e secundárias
| Entidade         | Papel      | Tag                                      | Tradução EN   |
| ---------------- | ---------- | ---------------------------------------- | ------------- |
| Gatilho          | Principal  | `portal.generic.label.trigger`           | Trigger       |
| Condição         | Secundária | `portal.measurementtype.label.condition` | Condition     |
| Categoria        | Secundária | `portal.generic.label.category`          | Category      |
| Ação             | Secundária | `portal.generic.label.action`            | Action        |
| Webhook          | Secundária | `portal.generic.label.webhook`           | Webhook       |
| Placeholder      | Secundária | `portal.generic.label.placeholder`       | Placeholder   |
| Ordem de serviço | Secundária | `iclass.generic.label.service-order`     | Service order |

### Glossário
| Termo               | Significado |
| ------------------- | ----------- |
| Gatilho             | Regra automática que executa ações quando as condições são atendidas. É a entidade principal desta especificação. |
| Condição            | Critério que decide se o gatilho é executado. É formada por Categoria, Operador e Valor. |
| Bloco "Todas"       | Bloco de condições em que todas precisam ser atendidas ("Todas as condições devem ser atendidas"). |
| Bloco "Qualquer"    | Bloco de condições em que basta uma ser atendida ("Qualquer condição deve ser atendida"). |
| Categoria           | Dado avaliado na condição, organizado em grupos (ex.: grupo "Ordem de serviço", categoria "Status"). O tipo da categoria (Lista, Número, Data ou Texto) define como o Valor é informado. |
| Operador            | Comparação feita na condição (ex.: Igual a, Alterado para, Presente). Alguns operadores não usam Valor. |
| Valor               | Valor com que a categoria é comparada. |
| Ação                | O que o gatilho faz quando as condições são atendidas. Hoje, só "Chamar webhook". |
| Webhook             | Chamada HTTP cadastrada, com nome, URL, descrição, método e corpo modelo. |
| Corpo da requisição | Texto JSON enviado pelo webhook, editável na ação. |
| Placeholder         | Código no formato `{{caminho.do.dado}}` que, no corpo da requisição, representa um dado da ordem de serviço, do cliente ou do técnico. |
| Ordem de serviço    | Entidade cujos dados (como o Status) são avaliados nas condições. |
| Somente leitura     | Modo da página do gatilho em que os campos aparecem travados; "Editar" leva ao modo de edição. |
| Lista               | Página que lista os gatilhos cadastrados, com filtro, ordenação e paginação. |
| Criação             | Página de cadastro de um novo gatilho. |
| Home                | Página de um gatilho específico (também chamada de página do gatilho), aberta a partir da lista ou depois de criar um gatilho; permite consultar e editar. |

### Pastas
| Pasta   | Componente                              | Papel              | Status   |
| ------- | --------------------------------------- | ------------------ | -------- |
| lista   | `app-object-trigger-list`               | list               | definido |
| lista   | `app-object-trigger-filter`             | filter             | definido |
| lista   | `app-object-trigger-card`               | card               | definido |
| criacao | `app-object-trigger-form`               | form               | definido |
| criacao | `app-object-trigger-fields`             | fields             | definido |
| criacao | `app-object-trigger-condition-group`    | condition-group    | definido |
| criacao | `app-object-trigger-action`             | action             | definido |
| criacao | `app-object-trigger-json-editor`        | json-editor        | definido |
| criacao | `app-object-trigger-placeholders-panel` | placeholders-panel | definido |
| home    | `app-object-trigger-home`               | home               | definido |

Os componentes de `criacao/` a partir de `app-object-trigger-fields` também são usados na
home; ficam especificados só em `criacao/`.


