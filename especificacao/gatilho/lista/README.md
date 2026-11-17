# Gatilho — lista

### Propósito
Lista os gatilhos cadastrados. Permite ao usuário localizar um gatilho por filtro e
ordenação, abrir a página de um gatilho e iniciar a criação de um novo.

### Componentização
| Componente                  | Tipo    | Papel na página |
| --------------------------- | ------- | --------------- |
| `app-object-trigger-list`   | Interno | Contêiner da página: cabeçalho, painel de ordenação, estados e paginação. |
| `app-object-trigger-filter` | Interno | Painel opcional. Restringe o resultado por Descrição e Status. |
| `app-object-trigger-card`   | Interno | Representa um gatilho. Repete-se para cada gatilho da página. |
| `p-paginator`               | Externo | Paginação do resultado. |
| `p-button`                  | Externo | Botões de ação do cabeçalho. |
| `p-toast`                   | Externo | Mensagem de erro ao carregar. |

### Layout
A página é dividida em duas seções:

1. **Cabeçalho (topo):** título da página e botões "Novo", "Filtros", "Ordenação" e
   "Atualizar".
2. **Conteúdo (abaixo):** painéis abertos, um `app-object-trigger-card` por gatilho,
   empilhados em uma coluna, e o `p-paginator` embaixo, à direita.

O painel `app-object-trigger-filter` e o painel de ordenação (de `app-object-trigger-list`),
quando abertos, aparecem no topo do conteúdo, o filtro acima da ordenação.

### Fluxo entre os componentes
- **Dado** o painel de filtro aberto, **quando** o usuário digita na Descrição ou escolhe um
  Status em `app-object-trigger-filter` (saída `filtroChange`, com o filtro inteiro), **então**
  `app-object-trigger-list` aplica o filtro na hora, volta à página 1 e mostra o estado Com
  resultados ou Sem resultado (com filtro).
- **Dado** a lista com resultados, **quando** o usuário clica em "Abrir" em
  `app-object-trigger-card`, **então** a página do gatilho é aberta
  (`/object-trigger/<id>`; ver `../home/README.md`).
- **Dado** qualquer estado, **quando** o usuário clica em "Novo" em
  `app-object-trigger-list`, **então** a página de criação é aberta
  (`/object-trigger/novo`; ver `../criacao/README.md`).

### Referências visuais
— (não se aplica: o time optou por não anexar prints a esta especificação)
