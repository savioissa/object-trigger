# app-object-trigger-home

### Aplicação
Contêiner da página do gatilho. Mostra o gatilho salvo com o mesmo formulário da criação,
em somente leitura, e permite editá-lo: "Editar" libera os campos; em edição, "Cancelar"
descarta as alterações (pedindo confirmação, se houver alguma) e "Salvar" grava.

### Componentização
| Componente                 | Tipo    | Onde é usado |
| -------------------------- | ------- | ------------ |
| `app-object-trigger-form`  | Interno | Corpo da página, em somente leitura ou em edição (`../form/app-object-trigger-form.md`) |
| `p-button`                 | Externo | Botões "Editar", "Cancelar" e "Salvar" |
| `p-skeleton`               | Externo | Título da página no estado Carregando |
| `p-toast`                  | Externo | Mensagens de sucesso e erro (o `p-toast` fica na raiz da aplicação, no canto superior direito) |
| `p-confirmDialog`          | Externo | Confirmação ao sair ou cancelar a edição com alterações não salvas (o `p-confirmDialog` fica na raiz da aplicação, um só para todas as páginas, com 420px de largura) |

### Elementos

#### Botão "Voltar"
- **Tag:** — (só ícone); o nome para leitores de tela é `portal.generic.label.triggers`.
- **Ícone:** `pi pi-chevron-left`
- **CSS:** `flex flex-shrink-0 align-items-center justify-content-center w-2rem h-2rem
  border-round-sm no-underline` (PrimeFlex) e `.pagina__voltar`; ícone azul (`#2563EB`) de 1rem
  (`text-base`, PrimeFlex), sem borda nem fundo.
- **Comportamento:** ao clicar, volta para a lista de gatilhos (`/object-trigger`; ver
  `../README.md` › Lista). Em edição com alterações não salvas, antes pede confirmação (ver
  Comportamentos › Saída com alterações não salvas).

#### Nome do objeto
- **Tag:** `portal.generic.label.trigger`
- **CSS:** `t-label-field`; `.pagina__objeto`; azul (`#2563EB`), acima do título.

#### Título da página
- **CSS:** `page-header__title`; `min-w-0 overflow-hidden text-overflow-ellipsis
  white-space-nowrap` (PrimeFlex); h1; truncado com reticências
  em uma linha.
- **Regras:** é a descrição do gatilho **salvo**: durante a edição, não muda; só muda
  depois de salvar.
- **Origem do dado:** `ObjectTriggerDTO.description`

#### Botão "Editar"
- **Tag:** `portal.generic.button.edit`
- **Componente:** `p-button`
- **Ícone:** `pi pi-pencil`
- **CSS:** `btn--md btn--primary`
- **Comportamento:** ao clicar, entra no modo de edição: os campos são liberados e os
  botões "Cancelar" e "Salvar" tomam o lugar de "Editar".
- **Regras:** só aparece em somente leitura, com o gatilho carregado.

#### Botão "Cancelar"
- **Tag:** `portal.generic.button.cancel`
- **Componente:** `p-button`
- **CSS:** `btn--md btn--secondary`
- **Comportamento:** ao clicar sem nenhuma alteração em relação ao gatilho salvo (a mesma
  comparação do botão "Salvar"), volta direto para somente leitura. Com alguma alteração,
  antes abre a confirmação de descarte (ver Comportamentos › Confirmação de descarte):
  "Descartar" descarta todas as alterações e volta para somente leitura com os dados
  salvos; "Não, continuar editando" (ou fechar pelo X ou Esc) mantém a edição com as
  alterações.
- **Regras:** só aparece em edição; desabilitado durante o salvamento.

#### Botão "Salvar"
- **Tag:** `portal.generic.button.save`
- **Componente:** `p-button`
- **CSS:** `btn--md btn--primary`; desabilitado, com a aparência padrão do
  PrimeNG para botão desabilitado.
- **Comportamento:** ao clicar, grava o gatilho. Durante o salvamento, mostra o indicador
  de carregamento e fica desabilitado. Com sucesso, exibe o toast de sucesso só com o título
  `portal.generic.label.all-changes-saved`, atualiza o título da página e volta para
  somente leitura. Com falha, exibe o toast de erro com o título
  `portal.generic.label.error-saving-trigger` e o texto
  `portal.generic.label.unable-save-trigger`, e continua em edição com os dados
  preenchidos.
- **Regras:**
  - Só aparece em edição.
  - Habilitado só quando, ao mesmo tempo: há alguma alteração em relação ao gatilho salvo;
    e as mesmas regras do botão "Criar" são atendidas (ver
    `../create/app-object-trigger-create.md` › Botão "Criar"). Se o usuário desfaz a
    alteração, o botão volta a ficar desabilitado.
  - Alteração é comparada pelo que seria salvo: espaços nas pontas, linhas sem categoria e
    ações sem webhook não contam como alteração.
  - O que é salvo segue as mesmas regras do botão "Criar".
  - Desabilitado, não tem tooltip (decisão do time).

#### Corpo do formulário
- **Componente:** `app-object-trigger-form`, recebendo o formulário preenchido com o gatilho salvo, as categorias, os webhooks, o
  carregamento e, fora do modo de edição, somente leitura.
- **Regras:** fora do modo de edição, os campos ficam desabilitados, com a aparência padrão
  do PrimeNG (opacidade de 60%); em edição, voltam ao normal.

#### Mensagem de gatilho não encontrado
- **Tag:** `portal.generic.results-not-found`
- **Ícone:** `pi pi-search`
- **CSS:** `req-empty`
- **Regras:** só no estado Não encontrado, no lugar do corpo.

### Layout
A página ocupa a altura toda da tela, com fundo branco, e tem três partes:

1. **Cabeçalho (`page-header`; fixo ao rolar, 86px de altura):** botão "Voltar"
   à esquerda e, ao lado dele (1rem; `flex align-items-center gap-3 min-w-0`, PrimeFlex), o
   nome do objeto em cima e o título embaixo (`flex flex-column min-w-0`, PrimeFlex).
2. **Barra de ações (`page-header__actions`, com `justify-content-end pt-3 px-5`,
   PrimeFlex; abaixo da linha do cabeçalho, alinhada à direita, não fixa):** "Editar" em somente leitura; "Cancelar" e
   "Salvar", com 8px entre eles, em edição.
3. **Corpo (abaixo da barra, largura toda):** `app-object-trigger-form`.

### Estados
| Estado                  | Quando                                                              | O que deve ser exibido |
| ----------------------- | ------------------------------------------------------------------- | ---------------------- |
| Carregando              | Enquanto o gatilho e as opções do formulário são buscados           | Nome do objeto e um `p-skeleton` de 320 × 24px no lugar do título; sem barra de ações; corpo no estado Carregando de `app-object-trigger-form` |
| Leitura                 | Gatilho carregado, fora do modo de edição                           | Botão "Editar"; corpo no estado Somente leitura de `app-object-trigger-form` |
| Edição                  | O usuário clicou em "Editar"                                        | "Cancelar" e "Salvar" (desabilitado até haver alteração válida); corpo no estado Edição de `app-object-trigger-form` |
| Salvando                | Depois do clique em "Salvar", até a resposta                        | "Salvar" com indicador e desabilitado; "Cancelar" desabilitado |
| Erro de validação       | Em edição, um campo obrigatório ficou vazio ou inválido             | Erro no campo (estado Campo com erro de `app-object-trigger-form`); "Salvar" desabilitado |
| Erro ao salvar          | A gravação falhou                                                   | Toast de erro (`portal.generic.label.error-saving-trigger` / `portal.generic.label.unable-save-trigger`); continua em edição com os dados |
| Erro ao carregar opções | A busca das categorias ou dos webhooks falhou                       | Toast de erro com o título `portal.generic.label.error-loading-data` e o texto `portal.generic.label.unable-load-form-options`; a página abre sem opções nos campos que dependem delas |
| Não encontrado          | Não existe gatilho com o identificador do endereço                  | Cabeçalho só com "Voltar" e o nome do objeto; sem barra de ações; ícone `pi pi-search` e `portal.generic.results-not-found` no lugar do corpo |

### Comportamentos
- **Confirmação de descarte.** **Dado** a página em edição com alguma alteração em
  relação ao gatilho salvo (a mesma comparação do botão "Salvar"), **quando** o usuário
  clica em "Cancelar" ou sai da página por qualquer caminho dentro da aplicação (botão
  "Voltar", menu ou outro endereço), **então** abre a confirmação (`p-confirmDialog`), com
  textos genéricos para poder ser reaproveitada por outras páginas:
  - título `iclass.generic.label.discard-changes`;
  - a mensagem `portal.generic.label.unsaved-changes-will-be-lost`, sem ícone e alinhada ao
    título (classe global `confirmacao-generica` no `p-confirmDialog`, com
    `.confirmacao-generica .p-confirm-dialog-message { margin-left: 0; }`);
  - botão `portal.generic.label.no-keep-editing` (`btn--md btn--secondary`), que
    recebe o foco ao abrir: fecha a confirmação e o usuário continua em edição, com as
    alterações;
  - botão `portal.generic.button.discard` (`btn--md btn--danger`): descarta as
    alterações e, no "Cancelar", volta para somente leitura com os dados salvos; nos
    demais casos, sai da página;
  - fechar pelo X ou pela tecla Esc equivale a continuar editando.
- **Dado** a página em edição sem nenhuma alteração, ou fora do modo de edição, **quando**
  o usuário clica em "Cancelar" ou sai da página, **então** a ação acontece direto, sem
  confirmação.
- **Dado** a página em edição com alterações não salvas, **quando** o usuário recarrega ou
  fecha a aba do navegador, **então** o navegador mostra o seu aviso padrão de saída (o
  texto é do navegador e não pode ser personalizado).
- **Dado** a página aberta em um gatilho, **quando** o endereço muda para outro gatilho,
  **então** a página carrega o novo gatilho e volta para somente leitura.

### CSS
| Classe                                      | Definição |
| ------------------------------------------- | --------- |
| :host                                       | --cabecalho-altura: 86px;<br>display: block;<br>min-height: 100vh;<br>background: #fff; |
| .pagina__voltar                             | color: #2563EB; |
| .pagina__voltar:hover                       | color: #1D4ED8; |
| .pagina__voltar:focus-visible               | outline: 2px solid #3B82F655;<br>outline-offset: 2px; |
| .pagina__objeto                             | color: #2563EB; |
