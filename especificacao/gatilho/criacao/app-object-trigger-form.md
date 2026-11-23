# app-object-trigger-form

### Aplicação
Contêiner da página de criação de gatilho. Organiza o cabeçalho com as ações "Cancelar" e
"Criar" e o corpo do formulário (`app-object-trigger-fields`), busca as opções do
formulário e decide quando o gatilho pode ser criado.

### Componentização
| Componente                 | Tipo    | Onde é usado |
| -------------------------- | ------- | ------------ |
| `app-object-trigger-fields` | Interno | Corpo da página, em edição (`app-object-trigger-fields.md`) |
| `p-button`                 | Externo | Botões "Cancelar" e "Criar" |
| `p-toast`                  | Externo | Mensagens de sucesso e erro (o `p-toast` fica na raiz da aplicação, no canto superior direito, na posição padrão do PrimeNG; pode cobrir os botões do cabeçalho enquanto estiver visível) |

### Elementos

#### Título da página
- **Tag:** `portal.generic.label.new-trigger`
- **CSS:** `page-header__title`; h1.

#### Botão "Cancelar"
- **Tag:** `portal.generic.button.cancel`
- **Componente:** `p-button`
- **CSS:** `btn--md btn--secondary`
- **Comportamento:** ao clicar, volta para a lista de gatilhos (`/object-trigger`; ver
  `../lista/README.md`), sem confirmação e sem salvar.

#### Botão "Criar"
- **Tag:** `portal.generic.button.create`
- **Componente:** `p-button`
- **CSS:** `btn--md btn--primary`; desabilitado, com a aparência padrão do
  PrimeNG para botão desabilitado.
- **Comportamento:** ao clicar, cria o gatilho. Durante o salvamento, o botão mostra o
  indicador de carregamento e fica desabilitado. Com sucesso, exibe o toast de sucesso com o
  título `portal.generic.label.trigger-created` e o texto
  `portal.generic.label.trigger-created-successfully` e vai para a página do gatilho criado
  (`/object-trigger/<id do gatilho criado>`; ver `../home/README.md`). Com falha, exibe o
  toast de erro com o título `portal.generic.label.error-creating-trigger` e o texto
  `portal.generic.label.unable-create-trigger`, e o usuário continua na página com os dados
  preenchidos.
- **Regras:**
  - Habilitado só quando, ao mesmo tempo: as opções terminaram de carregar; a descrição está
    preenchida (só espaços não vale); há ao menos uma condição com categoria, em qualquer um
    dos dois blocos; e nenhum campo habilitado está inválido (Operador e Valor de linhas com
    categoria; Corpo da requisição de ações com webhook).
  - Desabilitado, não tem tooltip (decisão do time).
  - Ações não são obrigatórias.
  - O que é salvo: a descrição e as observações sem espaços nas pontas (observações vazias
    não são salvas); o status; as condições de cada bloco que têm categoria; as ações que
    têm webhook. Linhas sem categoria e ações sem webhook são descartadas.
  - Condições com operador que não usa valor são salvas sem valor; com "Entre" ou "Entre ou
    igual", com os dois valores (início e fim); nas demais, só com o primeiro. Datas, no
    formato AAAA-MM-DD; texto, sem espaços nas pontas.

#### Corpo do formulário
- **Componente:** `app-object-trigger-fields`, em edição, começando vazio: Status "Ativo",
  os dois blocos de condições sem linhas e nenhuma ação.

### Layout
A página ocupa a altura toda da tela, com fundo branco, e tem duas partes:

1. **Cabeçalho (`page-header`; fixo ao rolar, 65px de altura):** título à
   esquerda; botões "Cancelar" e "Criar" à direita (`page-header__actions`), com
   8px entre eles.
2. **Corpo (abaixo do cabeçalho, largura toda):** `app-object-trigger-fields`.

### Estados
| Estado                  | Quando                                                             | O que deve ser exibido |
| ----------------------- | ------------------------------------------------------------------ | ---------------------- |
| Carregando              | Enquanto as categorias, os webhooks e os placeholders são buscados | Cabeçalho normal, com "Criar" desabilitado; corpo no estado Carregando de `app-object-trigger-fields` |
| Padrão                  | Opções carregadas, nada preenchido                                 | Corpo vazio; "Criar" desabilitado |
| Pronto para criar       | Regras do botão "Criar" atendidas                                  | "Criar" habilitado |
| Salvando                | Depois do clique em "Criar", até a resposta                        | "Criar" com indicador de carregamento e desabilitado |
| Erro ao salvar          | A criação falhou                                                   | Toast de erro (`portal.generic.label.error-creating-trigger` / `portal.generic.label.unable-create-trigger`); dados mantidos |
| Erro ao carregar opções | A busca das categorias, dos webhooks ou dos placeholders falhou    | Toast de erro com o título `portal.generic.label.error-loading-data` e o texto `portal.generic.label.unable-load-form-options`; a página continua aberta, sem opções nos campos que dependem delas |

### CSS
| Classe | Definição |
| ------ | --------- |
| :host  | --cabecalho-altura: 65px;<br>display: block;<br>min-height: 100vh;<br>background: #fff; |
