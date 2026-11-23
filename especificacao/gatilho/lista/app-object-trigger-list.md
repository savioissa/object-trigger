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
| `p-skeleton`               | Externo | Estado Carregando |
| `p-toast`                  | Externo | Mensagem de erro ao carregar (o `p-toast` fica na raiz da aplicação, no canto superior direito) |

### Elementos

#### Título da página
- **Tag:** `portal.generic.label.triggers`
- **CSS:** `page-header__title`;

#### Botão "Novo"
- **Tag:** `portal.generic.label.new`
- **Componente:** `p-button`
- **Ícone:** `pi pi-plus`
- **CSS:** `btn--md btn--primary header-btn`
- **Comportamento:** ao clicar, abre a página de criação (`/object-trigger/novo`; ver
  `../criacao/README.md`).

#### Botão "Filtros"
- **Tag:** — (só ícone, sem tooltip nem `aria-label`, por decisão do time)
- **Componente:** `p-button`
- **Ícone:** `pi pi-filter`
- **CSS:** `btn--md btn--neutral header-btn`; 48 × 32px, com a largura padrão do
  PrimeNG para botão só com ícone.
- **Comportamento:** ao clicar, abre ou fecha o painel de filtro.
- **Regras:** com o painel aberto, o elemento que envolve o botão recebe `filter-toggle-active` (borda azul-clara, fundo `#ECF3FF` e ícone azul) e o botão indica que está
  expandido para leitores de tela. Com o painel fechado, o botão não
  muda, mesmo com filtro ativo.

#### Botão "Ordenação"
- **Tag:** — (só ícone, sem tooltip nem `aria-label`, por decisão do time)
- **Componente:** `p-button`
- **Ícone:** `pi pi-sort-amount-down`
- **CSS:** `btn--md btn--neutral header-btn`; 48 × 32px, com a largura padrão do
  PrimeNG para botão só com ícone.
- **Comportamento:** ao clicar, abre ou fecha o painel de ordenação.
- **Regras:** com o painel aberto, o elemento que envolve o botão recebe `filter-toggle-active` (borda azul-clara, fundo `#ECF3FF` e ícone azul) e o botão indica que está
  expandido para leitores de tela.

#### Botão "Atualizar"
- **Tag:** `portal.generic.button.refresh`
- **Componente:** `p-button`
- **Ícone:** `pi pi-refresh`
- **CSS:** `btn--md btn--primary header-btn`
- **Comportamento:** ao clicar, busca a lista de novo, mantendo filtro, ordenação e página;
  se a página atual deixar de existir, volta à página 1.
- **Regras:** durante a carga, mostra o indicador de carregamento e fica desabilitado.

#### Painel de filtro
- **Componente:** `app-object-trigger-filter`
- **Regras:** só aparece com o painel de filtro aberto; acima do painel de ordenação.

#### Painel de ordenação
- **CSS:** `div-filter`; `flex flex-column gap-1` (PrimeFlex)
- **Regras:** só aparece com o painel de ordenação aberto; abaixo do painel de filtro;

#### Lista de cards
- **Componente:** `app-object-trigger-card`, um por gatilho da página atual
- **CSS:** `list-stack`; 10px entre os cards.
- **Regras:** os gatilhos aparecem filtrados e ordenados conforme os painéis; sem nenhuma
  escolha, ordenados pela descrição, em ordem crescente.
- **Origem do dado:** `--`

#### Paginador
- **Componente:** `p-paginator`
- **CSS:** `reduce-paginator-size` no elemento que envolve o paginador; alinhado à
  direita, com botões de 32px e o fundo branco do PrimeNG.
- **Comportamento:** ao trocar de página, exibe os cards da página escolhida.

#### Mensagem de lista vazia
- **Tag:** `portal.generic.label.empty-trigger-list`
- **Ícone:** `pi pi-folder-open`
- **CSS:** `req-empty`
- **Regras:** só no estado Vazio (sem cadastro).

#### Mensagem de sem resultado
- **Tag:** `portal.generic.results-not-found`
- **Ícone:** `pi pi-search`
- **CSS:** `req-empty`
- **Regras:** só no estado Sem resultado (com filtro).

### Layout
A página é uma coluna com fundo `#FAFAFA` e altura mínima do espaço disponível, dividida em
duas seções:

1. **Cabeçalho (`page-header`; fixo no topo ao rolar):** título à esquerda;
   botões "Novo", "Filtros", "Ordenação" e "Atualizar" à direita (`page-header__actions`), nessa ordem, com 8px entre eles.
2. **Conteúdo (`page-content`; abaixo do cabeçalho, largura toda, 16px entre os
   blocos):** painéis abertos (filtro acima da ordenação, em `list-stack`, com 10px
   entre eles), lista de cards e paginador.

O painel de ordenação (`div-filter`) é uma coluna com 4px entre os itens: rótulo
"Ordenar por" em cima e, embaixo, os campos "Campo" e "Direção" lado a lado (`flex
align-items-center gap-2 max-w-30rem`, PrimeFlex), com a mesma largura e 8px entre eles,
ocupando no máximo 30rem.

### Estados
| Estado                     | Quando                                                                 | O que deve ser exibido |
| -------------------------- | ---------------------------------------------------------------------- | ---------------------- |
| Carregando                 | Ao abrir a página e durante o "Atualizar"                              | 7 cards em skeleton (`reg-card`, com `flex align-items-center gap-3 px-3 py-3`, PrimeFlex: as mesmas colunas do card: à esquerda, um `p-skeleton` de 72 × 14px no lugar do chip; no centro, rótulo de 64 × 12px e valor de 260 × 14px empilhados com 8px entre eles), ocultos para leitores de tela, na área com `aria-busy="true"`; "Atualizar" com indicador e desabilitado |
| Com resultados             | Carga concluída e ao menos um gatilho depois do filtro                 | Cards da página atual e paginador |
| Vazio (sem cadastro)       | Nenhum gatilho cadastrado                                              | Ícone `pi pi-folder-open` e `portal.generic.label.empty-trigger-list`, centralizados |
| Sem resultado (com filtro) | Há gatilhos cadastrados, mas nenhum atende ao filtro                   | Ícone `pi pi-search` e `portal.generic.results-not-found`, centralizados |
| Erro                       | A busca da lista falhou                                                | Toast de erro com o título `portal.generic.label.error-loading-data` e o texto `portal.generic.label.unable-load-triggers`. Na primeira carga, a área da lista fica vazia (nem cards nem mensagem de vazio); ao "Atualizar", os cards que já estavam na tela continuam |

### CSS
| Classe                               | Definição |
| ------------------------------------ | --------- |
| :host                                | display: block;<br>min-height: 100%;<br>background: #FAFAFA; |
