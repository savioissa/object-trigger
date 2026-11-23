# app-object-trigger-action

### Aplicação
Card de uma ação do gatilho, ou seja, o que acontece quando as condições são atendidas.
Hoje a única ação possível é chamar um webhook: o usuário escolhe um webhook cadastrado,
confere a URL, a descrição e o método dele e ajusta o corpo da requisição, podendo usar
placeholders. A lixeira ao lado do card remove a ação.

### Componentização
| Componente                | Tipo    | Onde é usado                                                                    |
| ------------------------- | ------- | ------------------------------------------------------------------------------- |
| `app-object-trigger-json-editor` | Interno | Corpo da requisição, quando há webhook escolhido (`app-object-trigger-json-editor.md`) |
| `p-dropdown`              | Externo | Campos "Tipo" e "Valor"                                                         |
| `p-button`                | Externo | Botão "Remover ação"                                                            |

### Elementos

#### Rótulo "Tipo"
- **Tag:** `portal.generic.label.type`
- **CSS:** `equipment-event-label`; associado ao campo Tipo.

#### Campo Tipo
- **Componente:** `p-dropdown`
- **CSS:** — (visual padrão do PrimeNG)
- **Regras:** tem uma única opção, "Chamar webhook" (`portal.generic.label.get-webhook`), que
  já vem selecionada; o texto selecionado e o da lista usam a mesma tag.
- **Origem do dado:** `ObjectTriggerDTO.actions[].type`

#### Rótulo "Valor"
- **Tag:** `portal.generic.label.value`
- **CSS:** `equipment-event-label`; associado ao campo Webhook.

#### Campo Webhook
- **Tag:** `portal.generic.placeholder.select-webhook` (placeholder)
- **Componente:** `p-dropdown`, com busca
- **CSS:** — (visual padrão do PrimeNG)
- **Comportamento:** ao abrir, exibe os webhooks pelo nome, com um campo de busca no topo
  da lista que filtra pelo nome; sem resultado na busca, ou sem nenhum webhook disponível, a
  lista mostra `portal.generic.results-not-found`. Ao escolher um webhook, o bloco de detalhes aparece e o corpo da
  requisição é substituído pelo corpo modelo desse webhook, sem aviso, mesmo que o usuário
  já tenha editado o corpo.
- **Regras:** opcional. Sem webhook escolhido, a ação não bloqueia o botão "Criar" e não é
  salva (ver `app-object-trigger-form.md` › Botão "Criar" e
  `../home/app-object-trigger-home.md` › Botão "Salvar").
- **Origem do dado:** opções em `WebhookDTO[]`; valor escolhido em
  `ObjectTriggerDTO.actions[].referredObjectId`; nome exibido em uma ação salva em
  `ObjectTriggerDTO.actions[].webhook.description`

#### Bloco de detalhes do webhook
- **CSS:** `flex flex-column gap-3 mt-3 pt-3 border-top-1 surface-border` (PrimeFlex); separado
  dos campos de cima por uma linha na cor de borda do tema.
- **Regras:** só aparece quando há um webhook escolhido; contém, nesta ordem, URL,
  Descrição, Método e Corpo da requisição.

#### Rótulo "URL"
- **Tag:** `portal.generic.label.url`
- **CSS:** `card-label`

#### URL do webhook
- **CSS:** `max-w-full overflow-hidden text-overflow-ellipsis white-space-nowrap` (PrimeFlex)
  e `.acao__url`; fonte monoespaçada; truncada com reticências em uma linha.
- **Origem do dado:** `WebhookDTO.path`

#### Rótulo "Descrição"
- **Tag:** `iclass.generic.label.description`
- **CSS:** `card-label`

#### Descrição do webhook
- **CSS:** `card-input`; `max-w-full overflow-hidden text-overflow-ellipsis
  white-space-nowrap` (PrimeFlex); truncada com reticências em uma linha.
- **Origem do dado:** `WebhookDTO.description`

#### Rótulo "Método"
- **Tag:** `portal.generic.label.method`
- **CSS:** `card-label`

#### Selo do método
- **CSS:** `inline-flex align-items-center px-2 border-1 border-round-sm` (PrimeFlex),
  `.metodo` e `.metodo--<método em minúsculas>`; texto em maiúsculas, monoespaçado.
- **Regras:** a cor depende do método: GET azul (`.metodo--get`), POST verde
  (`.metodo--post`), PUT amarelo (`.metodo--put`), PATCH roxo (`.metodo--patch`) e DELETE
  vermelho (`.metodo--delete`).
- **Origem do dado:** `WebhookDTO.method`

| Enum | Valor  |
| ---- | ------ |
| 1    | GET    |
| 2    | POST   |
| 3    | PUT    |
| 4    | DELETE |
| 5    | PATCH  |

#### Rótulo "Corpo da requisição (JSON)"
- **Tag:** `portal.generic.label.request-body-json`
- **CSS:** `t-label-field`; associado ao campo Corpo da requisição.

#### Corpo da requisição
- **Componente:** `app-object-trigger-json-editor`
- **Regras:** começa vazio;


#### Mensagem de erro do corpo
- **Tag:** `portal.generic.label.required-field` (corpo vazio) ou
  `portal.generic.label.invalid-json` (JSON inválido)
- **CSS:** `caption restrictions-header-error m-0`
- **Regras:** só aparece depois que o usuário sai do campo com erro; some assim que o corpo
  fica válido; descreve o campo para leitores de tela.

#### Link "Visualizar placeholders disponíveis"
- **Tag:** `portal.generic.label.view-available-placeholders`
- **Componente:** `p-button`
- **CSS:** `btn--text`; `p-button-text` (variante de texto do PrimeNG, que dá o texto azul do
  tema); `align-self-start mt-1` (PrimeFlex); sem fundo nem borda.
- **Comportamento:** ao clicar, abre o painel de placeholders (ver Fluxo no `README.md` da
  página).
- **Regras:** não aparece em somente leitura.

#### Botão "Remover ação"
- **Tag:** — (só ícone, sem tooltip nem `aria-label`, por decisão do time)
- **Componente:** `p-button`
- **Ícone:** `pi pi-trash`
- **CSS:** `btn--md btn--neutral`; `flex-shrink-0` (PrimeFlex); ícone cinza, sem fundo; 48 × 32px, com a
  largura padrão do PrimeNG para botão só com ícone.
- **Comportamento:** ao clicar, remove a ação imediatamente, sem confirmação (ver Fluxo no
  `README.md` da página).
- **Regras:** não aparece em somente leitura.

### Layout
A ação é uma linha com duas partes, alinhadas ao centro e com 16px entre elas (`flex align-items-center gap-3`, PrimeFlex):

1. **Esquerda (ocupa o espaço restante):** o card (`div-filter`, com `flex-1
   min-w-0 flex flex-column`, PrimeFlex), organizado em uma coluna:
   1. **Seleção (topo, `flex align-items-start gap-3`):** Tipo e Valor lado a lado, em duas
      colunas de mesma largura (`flex-1`), com 1rem entre elas; cada um é uma coluna `flex
      flex-column gap-2 min-w-0` (PrimeFlex): rótulo em cima e campo embaixo.
   2. **Detalhes (abaixo, só com webhook escolhido):** URL, Descrição, Método e Corpo da
      requisição empilhados, com 1rem entre eles. URL, Descrição e Método são pares de
      rótulo em cima e valor embaixo, do tamanho do conteúdo (`flex flex-column
      align-items-start gap-1 min-w-0`, PrimeFlex); o link "Visualizar placeholders
      disponíveis" fica logo abaixo do corpo, alinhado à esquerda. O corpo, seu rótulo, a mensagem de erro e o link formam uma coluna `flex flex-column gap-2 min-w-0` (PrimeFlex).
2. **Direita (largura do botão, 48px):** botão "Remover ação", centralizado na altura do card. Em somente
   leitura, essa coluna não existe e o card ocupa a largura toda.

### Estados
| Estado         | Quando                                                     | O que deve ser exibido                                                                            |
| -------------- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Sem webhook    | Nenhum webhook escolhido                                   | Só Tipo e Valor, com o placeholder `portal.generic.placeholder.select-webhook`                    |
| Com webhook    | Um webhook escolhido                                       | Tipo, Valor e o bloco de detalhes com o corpo modelo                                              |
| Corpo inválido | Com webhook, o corpo está vazio ou não é JSON válido e o usuário já saiu do campo | Editor no estado Inválido e a mensagem de erro do corpo                     |
| Somente leitura | Página do gatilho fora do modo de edição | Tipo e Valor desabilitados, com a aparência padrão do PrimeNG (opacidade de 60%); corpo da requisição no estado Desabilitado de `app-object-trigger-json-editor`; sem o link de placeholders nem "Remover ação" |

### Comportamentos
- **Dado** uma ação com webhook e o corpo editado pelo usuário, **quando** o usuário escolhe
  outro webhook, **então** URL, descrição e método passam a ser os do novo webhook e o corpo
  é substituído pelo corpo modelo dele, sem aviso.

### CSS
| Classe                          | Definição |
| ------------------------------- | --------- |
| :host                           | display: block; |
| .acao__url                      | font: 400 13px/20px ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;<br>color: #1F2937; |
| .metodo                         | height: 22px;<br>font: 600 11px/1 ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;<br>letter-spacing: 0.02em; |
| .metodo--get                    | background: #EFF6FF;<br>border-color: #BFDBFE;<br>color: #1D4ED8; |
| .metodo--post                   | background: #F0FDF4;<br>border-color: #86EFAC;<br>color: #15803D; |
| .metodo--put                    | background: #FFFBEB;<br>border-color: #FCD34D;<br>color: #B45309; |
| .metodo--patch                  | background: #F5F3FF;<br>border-color: #C4B5FD;<br>color: #6D28D9; |
| .metodo--delete                 | background: #FEF2F2;<br>border-color: #FCA5A5;<br>color: #B91C1C; |
