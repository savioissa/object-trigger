# app-object-trigger-home

### Aplicação
Contêiner da página do gatilho. Mostra o gatilho salvo com o mesmo formulário da criação,
em somente leitura, e permite editá-lo: "Editar" libera os campos; em edição, "Cancelar"
descarta as alterações e "Salvar" grava.

### Componentização
| Componente                 | Tipo    | Onde é usado |
| -------------------------- | ------- | ------------ |
| `app-object-trigger-fields` | Interno | Corpo da página, em somente leitura ou em edição (`../criacao/app-object-trigger-fields.md`) |
| `p-button`                 | Externo | Botões "Editar", "Cancelar" e "Salvar" |
| `p-toast`                  | Externo | Mensagens de sucesso e erro (o `p-toast` fica na raiz da aplicação, no canto superior direito) |
| `p-confirmDialog`          | Externo | Confirmação ao sair com alterações não salvas (o `p-confirmDialog` fica na raiz da aplicação, um só para todas as páginas, com 420px de largura) |

### Elementos

#### Botão "Voltar"
- **Tag:** — (só ícone); o nome para leitores de tela é `portal.generic.label.triggers`.
- **Ícone:** `pi pi-chevron-left`
- **CSS:** `.pagina__voltar`; ícone azul (`#2563EB`) de 16px, sem borda nem fundo.
- **Comportamento:** ao clicar, volta para a lista de gatilhos (`/object-trigger`; ver
  `../lista/README.md`). Em edição com alterações não salvas, antes pede confirmação (ver
  Comportamentos › Saída com alterações não salvas).

#### Nome do objeto
- **Tag:** `portal.generic.label.trigger`
- **CSS:** `.pagina__objeto`; azul (`#2563EB`), acima do título.

#### Título da página
- **CSS:** `.pagina__titulo`; h1; 20px; truncado com reticências em uma linha.
- **Regras:** é a descrição do gatilho **salvo**: durante a edição, não muda; só muda
  depois de salvar.
- **Origem do dado:** `--`

#### Botão "Editar"
- **Tag:** `portal.generic.button.edit`
- **Componente:** `p-button`
- **Ícone:** `pi pi-pencil`
- **CSS:** `btn--md btn--primary` (globais)
- **Comportamento:** ao clicar, entra no modo de edição: os campos são liberados e os
  botões "Cancelar" e "Salvar" tomam o lugar de "Editar".
- **Regras:** só aparece em somente leitura, com o gatilho carregado.

#### Botão "Cancelar"
- **Tag:** `portal.generic.button.cancel`
- **Componente:** `p-button`
- **CSS:** `btn--md btn--neutral` (globais)
- **Comportamento:** ao clicar, descarta todas as alterações, sem confirmação, e volta para
  somente leitura com os dados salvos.
- **Regras:** só aparece em edição; desabilitado durante o salvamento.

#### Botão "Salvar"
- **Tag:** `portal.generic.button.save`
- **Componente:** `p-button`
- **CSS:** `btn--md btn--primary` (globais); desabilitado, com a aparência de
  `.p-button:disabled` (globais).
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
    `../criacao/app-object-trigger-form.md` › Botão "Criar"). Se o usuário desfaz a
    alteração, o botão volta a ficar desabilitado.
  - Alteração é comparada pelo que seria salvo: espaços nas pontas, linhas sem categoria e
    ações sem webhook não contam como alteração.
  - O que é salvo segue as mesmas regras do botão "Criar".
  - Desabilitado, não tem tooltip (decisão do time).

#### Corpo do formulário
- **Componente:** `app-object-trigger-fields`, preenchido com o gatilho salvo; em somente
  leitura fora do modo de edição.
- **Regras:** fora do modo de edição, a página inteira recebe a classe `modo-leitura`
  (globais), que deixa legível o valor dos campos travados (fundo `#F3F4F6`, texto
  `#374151`); em edição, a classe sai.

#### Mensagem de gatilho não encontrado
- **Tag:** `portal.generic.results-not-found`
- **Ícone:** `pi pi-search`
- **CSS:** `req-empty` (globais); ícone com `.pagina__vazio-icone`.
- **Regras:** só no estado Não encontrado, no lugar do corpo.

### Layout
A página ocupa a altura toda da tela, com fundo branco, e tem três partes:

1. **Cabeçalho (topo, fixo ao rolar, 72px de altura, linha inferior `#E5E7EB`):** botão
   "Voltar" à esquerda e, ao lado dele (12px), o nome do objeto em cima e o título embaixo.
2. **Barra de ações (abaixo da linha do cabeçalho, alinhada à direita, não fixa):** "Editar"
   em somente leitura; "Cancelar" e "Salvar", com 10px entre eles, em edição.
3. **Corpo (abaixo da barra, largura toda):** `app-object-trigger-fields`.

### Estados
| Estado                  | Quando                                                              | O que deve ser exibido |
| ----------------------- | ------------------------------------------------------------------- | ---------------------- |
| Carregando              | Enquanto o gatilho e as opções do formulário são buscados           | Nome do objeto e um skeleton de 320px × 24px no lugar do título; sem barra de ações; corpo no estado Carregando de `app-object-trigger-fields` |
| Leitura                 | Gatilho carregado, fora do modo de edição                           | Botão "Editar"; corpo no estado Somente leitura de `app-object-trigger-fields` |
| Edição                  | O usuário clicou em "Editar"                                        | "Cancelar" e "Salvar" (desabilitado até haver alteração válida); corpo no estado Edição |
| Salvando                | Depois do clique em "Salvar", até a resposta                        | "Salvar" com indicador e desabilitado; "Cancelar" desabilitado |
| Erro de validação       | Em edição, um campo obrigatório ficou vazio ou inválido             | Erro no campo (estado Campo com erro de `app-object-trigger-fields`); "Salvar" desabilitado |
| Erro ao salvar          | A gravação falhou                                                   | Toast de erro (`portal.generic.label.error-saving-trigger` / `portal.generic.label.unable-save-trigger`); continua em edição com os dados |
| Erro ao carregar opções | A busca das categorias, dos webhooks ou dos placeholders falhou     | Toast de erro com o título `portal.generic.label.error-loading-data` e o texto `portal.generic.label.unable-load-form-options`; a página abre sem opções nos campos que dependem delas |
| Não encontrado          | Não existe gatilho com o identificador do endereço                  | Cabeçalho só com "Voltar" e o nome do objeto; sem barra de ações; ícone `pi pi-search` e `portal.generic.results-not-found` no lugar do corpo |

### Comportamentos
- **Saída com alterações não salvas.** **Dado** a página em edição com alguma alteração em
  relação ao gatilho salvo (a mesma comparação do botão "Salvar"), **quando** o usuário sai
  da página por qualquer caminho dentro da aplicação (botão "Voltar", menu ou outro
  endereço), **então** abre a confirmação (`p-confirmDialog`), com textos genéricos para
  poder ser reaproveitada por outras páginas:
  - título `iclass.generic.label.discard-changes`;
  - ícone `pi pi-exclamation-triangle` e a mensagem
    `portal.generic.label.unsaved-changes-will-be-lost`;
  - botão `portal.generic.label.no-keep-editing` (`btn--md btn--neutral`, globais), que
    recebe o foco ao abrir: fecha a confirmação e o usuário continua em edição, com as
    alterações;
  - botão `portal.generic.button.discard` (`btn--md btn--danger`, globais): sai e descarta
    as alterações;
  - fechar pelo X ou pela tecla Esc equivale a continuar editando.
- **Dado** a página em edição sem nenhuma alteração, ou fora do modo de edição, **quando**
  o usuário sai da página, **então** sai direto, sem confirmação.
- **Dado** a página em edição com alterações não salvas, **quando** o usuário recarrega ou
  fecha a aba do navegador, **então** o navegador mostra o seu aviso padrão de saída (o
  texto é do navegador e não pode ser personalizado).
- **Dado** a página aberta em um gatilho, **quando** o endereço muda para outro gatilho,
  **então** a página carrega o novo gatilho e volta para somente leitura.

### CSS
| Classe                                      | Definição |
| ------------------------------------------- | --------- |
| :host                                       | --cabecalho-altura: 72px;<br>display: block;<br>min-height: 100vh;<br>background: #fff; |
| .pagina__cabecalho                          | position: sticky;<br>top: 0;<br>z-index: 10;<br>display: flex;<br>align-items: center;<br>justify-content: space-between;<br>gap: 16px;<br>height: var(--cabecalho-altura);<br>padding: 0 28px;<br>background: #fff;<br>border-bottom: 1px solid #E5E7EB;<br>box-sizing: border-box; |
| .pagina__identificacao                      | display: flex;<br>align-items: center;<br>gap: 12px;<br>min-width: 0; |
| .pagina__voltar                             | display: flex;<br>flex: 0 0 auto;<br>align-items: center;<br>justify-content: center;<br>width: 24px;<br>height: 24px;<br>border-radius: 4px;<br>color: #2563EB;<br>text-decoration: none; |
| .pagina__voltar .pi                         | font-size: 16px; |
| .pagina__voltar:hover                       | color: #1D4ED8; |
| .pagina__voltar:focus-visible               | outline: 2px solid #3B82F655;<br>outline-offset: 2px; |
| .pagina__textos                             | display: flex;<br>flex-direction: column;<br>gap: 2px;<br>min-width: 0; |
| .pagina__objeto                             | font: var(--label-field);<br>color: #2563EB; |
| .pagina__titulo                             | min-width: 0;<br>margin: 0;<br>font: 600 20px/28px var(--font-family-text);<br>letter-spacing: -.01em;<br>overflow: hidden;<br>color: #1E293B;<br>text-overflow: ellipsis;<br>white-space: nowrap; |
| .pagina__titulo-esqueleto                   | width: 320px;<br>height: 24px; |
| .pagina__botoes                             | display: flex;<br>justify-content: flex-end;<br>gap: 10px;<br>padding: 20px 28px 0; |
| .pagina__botoes + app-object-trigger-fields | margin-top: -12px; |
| .pagina__vazio-icone                        | font-size: 24px;<br>color: #94A3B8; |
