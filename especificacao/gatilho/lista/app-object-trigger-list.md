# app-object-trigger-list

### Aplicação
Contêiner da página de lista de gatilhos. Organiza o cabeçalho com as ações, o painel de
filtro, os cards e o paginador; é dono do painel de ordenação; e controla qual resultado é
exibido.

### Componentização
| Componente                 | Tipo    | Onde é usado |
| -------------------------- | ------- | ------------ |
| `app-object-trigger-filter` | Interno | Painel de filtro, quando aberto (`app-object-trigger-filter.md`) |
| `app-object-trigger-card`   | Interno | Um por gatilho da página atual (`app-object-trigger-card.md`) |
| `p-button`                 | Externo | Botões "Novo", "Filtros", "Ordenação" e "Atualizar" |
| `p-dropdown`               | Externo | Campos "Campo" e "Direção" do painel de ordenação |
| `p-paginator`              | Externo | Paginação do resultado |
| `p-toast`                  | Externo | Mensagem de erro ao carregar (o `p-toast` fica na raiz da aplicação, no canto superior direito) |

### Elementos

#### Título da página
- **Tag:** `portal.generic.label.triggers`
- **CSS:** `t-title-lg` (globais) e `.pagina__titulo`; h1.

#### Botão "Novo"
- **Tag:** `portal.generic.label.new`
- **Componente:** `p-button`
- **Ícone:** `pi pi-plus`
- **CSS:** `btn--md btn--secondary header-btn` (globais)
- **Comportamento:** ao clicar, abre a página de criação (`/object-trigger/novo`; ver
  `../criacao/README.md`).

#### Botão "Filtros"
- **Tag:** — (só ícone, sem tooltip nem `aria-label`, por decisão do time)
- **Componente:** `p-button`
- **Ícone:** `pi pi-filter`
- **CSS:** `btn--md btn--neutral header-btn` (globais) e `.btn--icone`; botão quadrado de
  32px com o ícone no centro.
- **Comportamento:** ao clicar, abre ou fecha o painel de filtro.
- **Regras:** com o painel aberto, o contêiner do botão recebe `is-active` (globais) e o
  botão indica que está expandido para leitores de tela. Com o painel fechado, o botão não
  muda, mesmo com filtro ativo.

#### Botão "Ordenação"
- **Tag:** — (só ícone, sem tooltip nem `aria-label`, por decisão do time)
- **Componente:** `p-button`
- **Ícone:** `pi pi-sort-amount-down`
- **CSS:** `btn--md btn--neutral header-btn` (globais) e `.btn--icone`; botão quadrado de
  32px com o ícone no centro.
- **Comportamento:** ao clicar, abre ou fecha o painel de ordenação.
- **Regras:** com o painel aberto, o contêiner do botão recebe `is-active` (globais) e o
  botão indica que está expandido para leitores de tela.

#### Botão "Atualizar"
- **Tag:** `portal.generic.button.refresh`
- **Componente:** `p-button`
- **Ícone:** `pi pi-refresh`
- **CSS:** `btn--md btn--primary header-btn` (globais)
- **Comportamento:** ao clicar, busca a lista de novo, mantendo filtro, ordenação e página;
  se a página atual deixar de existir, volta à página 1.
- **Regras:** durante a carga, mostra o indicador de carregamento e fica desabilitado.

#### Painel de filtro
- **Componente:** `app-object-trigger-filter`
- **Regras:** só aparece com o painel de filtro aberto; acima do painel de ordenação.

#### Painel de ordenação
- **CSS:** `sort-panel` (globais)
- **Regras:** só aparece com o painel de ordenação aberto; abaixo do painel de filtro.

#### Rótulo "Ordenar por" (painel de ordenação)
- **Tag:** `portal.generic.label.sort-by`
- **CSS:** `sort-panel__label` (globais); nomeia o grupo dos dois campos para leitores de tela.

#### Campo "Campo" (painel de ordenação)
- **Componente:** `p-dropdown`
- **CSS:** `sort-panel__select` e, no painel da lista, `sort-panel__select-panel` (globais);
  dentro de `sort-panel__field` (globais).
- **Comportamento:** ao escolher um campo, a lista é reordenada e volta à página 1.
- **Regras:** opções "Descrição" (`iclass.generic.label.description`) e "Status"
  (`portal.generic.label.status`), nessa ordem; padrão "Descrição"; sempre há um campo
  escolhido.

#### Campo "Direção" (painel de ordenação)
- **Componente:** `p-dropdown`
- **CSS:** `sort-panel__select` e, no painel da lista, `sort-panel__select-panel` (globais);
  dentro de `sort-panel__field` (globais).
- **Comportamento:** ao escolher uma direção, a lista é reordenada e volta à página 1.
- **Regras:** opções "Crescente" (`portal.generic.label.ascending`) e "Decrescente"
  (`portal.generic.label.descending`), nessa ordem; padrão "Crescente"; sempre há uma
  direção escolhida. A comparação segue a ordem alfabética do português (por Status, compara
  os códigos ATIVO e INATIVO).

#### Lista de cards
- **Componente:** `app-object-trigger-card`, um por gatilho da página atual
- **CSS:** `.lista`; 10px entre os cards.
- **Regras:** os gatilhos aparecem filtrados e ordenados conforme os painéis; sem nenhuma
  escolha, ordenados pela descrição, em ordem crescente.
- **Origem do dado:** `--`

#### Paginador
- **Componente:** `p-paginator`
- **CSS:** `paginator--md` (globais); alinhado à direita.
- **Comportamento:** ao trocar de página, exibe os cards da página escolhida.
- **Regras:** 7 gatilhos por página; aparece sempre que houver ao menos um resultado, mesmo
  com uma página só; controles primeira, anterior, até 5 números de página, próxima e
  última; volta à página 1 sempre que o filtro ou a ordenação mudam; o total é a quantidade
  de gatilhos depois do filtro.

#### Mensagem de lista vazia
- **Tag:** `portal.generic.label.empty-trigger-list`
- **Ícone:** `pi pi-folder-open`
- **CSS:** `req-empty` (globais); ícone com `.vazio__icone`.
- **Regras:** só no estado Vazio (sem cadastro).

#### Mensagem de sem resultado
- **Tag:** `portal.generic.results-not-found`
- **Ícone:** `pi pi-search`
- **CSS:** `req-empty` (globais); ícone com `.vazio__icone`.
- **Regras:** só no estado Sem resultado (com filtro).

### Layout
A página é uma coluna com fundo `#FAFAFA` e altura mínima do espaço disponível, dividida em
duas seções:

1. **Cabeçalho (topo, 56px, não fixo):** título à esquerda; botões "Novo", "Filtros",
   "Ordenação" e "Atualizar" à direita, nessa ordem, com 8px entre eles.
2. **Conteúdo (abaixo do cabeçalho, largura toda, 10px entre os blocos):** painéis abertos
   (filtro acima da ordenação, com 8px entre eles), lista de cards e paginador.

O painel de ordenação (`sort-panel`, globais) é uma coluna: rótulo "Ordenar por" em cima e,
embaixo, os campos "Campo" e "Direção" lado a lado (`sort-panel__control`, globais, e
`.ordenacao`), com a mesma largura e 6px entre eles, ocupando no máximo 520px.

### Estados
| Estado                     | Quando                                                                 | O que deve ser exibido |
| -------------------------- | ---------------------------------------------------------------------- | ---------------------- |
| Carregando                 | Ao abrir a página e durante o "Atualizar"                              | 7 cards em skeleton (`skeleton`, globais, com as mesmas colunas do card: dois pares de rótulo e valor), ocultos para leitores de tela, na área com `aria-busy="true"`; "Atualizar" com indicador e desabilitado |
| Com resultados             | Carga concluída e ao menos um gatilho depois do filtro                 | Cards da página atual e paginador |
| Vazio (sem cadastro)       | Nenhum gatilho cadastrado                                              | Ícone `pi pi-folder-open` e `portal.generic.label.empty-trigger-list`, centralizados |
| Sem resultado (com filtro) | Há gatilhos cadastrados, mas nenhum atende ao filtro                   | Ícone `pi pi-search` e `portal.generic.results-not-found`, centralizados |
| Erro                       | A busca da lista falhou                                                | Toast de erro com o título `portal.generic.label.error-loading-data` e o texto `portal.generic.label.unable-load-triggers`. Na primeira carga, a área da lista fica vazia (nem cards nem mensagem de vazio); ao "Atualizar", os cards que já estavam na tela continuam |

### Comportamentos
- **Dado** uma ordenação escolhida, **quando** o usuário fecha o painel de ordenação,
  **então** a ordenação continua aplicada e é mostrada de novo ao reabrir.
- **Dado** qualquer estado, **quando** o usuário abre os dois painéis, **então** os dois
  ficam abertos ao mesmo tempo, com o filtro acima da ordenação; fechar um painel não limpa
  o que foi escolhido nele.

### CSS
| Classe                               | Definição |
| ------------------------------------ | --------- |
| :host                                | display: block;<br>min-height: 100%;<br>background: #FAFAFA; |
| .pagina__cabecalho                   | display: flex;<br>align-items: center;<br>justify-content: space-between;<br>gap: 16px;<br>height: 56px;<br>padding: 0 24px 0 28px;<br>box-sizing: border-box; |
| .pagina__titulo                      | margin: 0;<br>color: #1E293B; |
| .pagina__botoes                      | display: flex;<br>align-items: center;<br>gap: 8px; |
| .pagina__botoes .p-button.btn--icone | width: 32px;<br>padding: 0;<br>gap: 0;<br>justify-content: center; |
| .pagina__conteudo                    | display: flex;<br>flex-direction: column;<br>gap: 10px;<br>padding: 6px 24px 24px 28px; |
| .paineis                             | display: flex;<br>flex-direction: column;<br>gap: 8px;<br>margin-bottom: 6px; |
| .ordenacao                           | max-width: 520px; |
| .lista                               | display: flex;<br>flex-direction: column;<br>gap: 10px; |
| .vazio__icone                        | font-size: 24px;<br>color: #94A3B8; |
| .esqueleto                           | grid-template-columns: 260px minmax(0, 1fr) 32px;<br>height: 54px; |
| .esqueleto .kv                       | gap: 6px; |
| .esqueleto__rotulo                   | width: 64px;<br>height: 12px; |
| .esqueleto__valor                    | width: 72px;<br>height: 14px; |
| .esqueleto__valor--largo             | width: 260px; |
