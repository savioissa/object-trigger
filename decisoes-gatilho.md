# Decisões — Gatilho (object-trigger)

Decisões de interface e de especificação tomadas durante a construção do protótipo e da
especificação do gatilho, em ordem cronológica. Só aparece a versão que vale hoje: quando
uma decisão foi revista, a anterior não está listada.

A especificação completa está em `especificacao/gatilho/` (ponto de entrada:
`especificacao/gatilho/README.md`).

## 17/11/2026

1. **Nome técnico.** Componentes e objeto usam o nome `object-trigger`
   (`app-object-trigger-*`, `ObjectTrigger`). Em textos de interface e na especificação, a
   entidade se chama **Gatilho**.

2. **Fonte dos textos.** Todos os textos vêm da planilha de tags (I18N). Tag que não existe
   na planilha é criada nova, com textos em PT, EN e ES.

3. **Tela de criação.** Segue a especificação de criação de gatilho que já existia (pasta
   `trigger`): dados gerais (Descrição, Status, Observações), Condições (blocos "Todas" e
   "Qualquer") e Ações (chamar webhook com corpo JSON).

4. **Lista de gatilhos.** Segue o padrão de lista do produto (print da lista de Filial):
   cabeçalho com título e botões "Novo", "Filtros", "Ordenação" e "Atualizar"; cards
   empilhados; paginador à direita.

5. **Campos do card.** O card mostra o **Status** e a **Descrição** do gatilho, com o Status
   à esquerda e a Descrição à direita.

6. **Status como selo.** O Status aparece como selo (chip) só com o texto, sem bolinha:
   **Em edição em amarelo**, **Ativo em azul** e **Inativo em cinza**.

7. **Painéis de filtro e de ordenação.** Os dois podem ficar abertos ao mesmo tempo, com o
   filtro acima da ordenação. Fechar um painel não descarta o que foi escolhido nele.

8. **Ordenação padrão.** A lista vem ordenada pela Descrição, em ordem crescente.

9. **Paginação.** 7 gatilhos por página; ao mudar o filtro aplicado ou a ordenação, a lista
   volta à página 1.

10. **Cancelar na criação.** "Cancelar" volta para a lista de gatilhos, sem confirmação e
    sem salvar.

11. **Abrir um gatilho.** Só o botão **"Abrir"** do card leva à página do gatilho. O resto do
    card não é clicável.

12. **Card sem hover e sem tooltip.** Passar o mouse sobre o card não muda nada; o cursor só
    vira a mãozinha sobre o botão "Abrir". O ícone do botão é `pi-window-maximize`. O card
    não tem tooltip.

13. **Descrição longa no card.** Com mais de 50 caracteres, a descrição é cortada e termina
    com "…". O texto completo só aparece na página do gatilho.

14. **Lista vazia.** Sem nenhum gatilho cadastrado: ícone `pi-folder-open` e o texto
    "Nenhum gatilho cadastrado". Sem resultado no filtro: ícone de busca e "Nenhum resultado
    encontrado".

15. **Erro ao carregar a lista.** Não há estado de erro na tela. A falha aparece só como
    toast de erro: título "Erro ao carregar dados" e texto "Não foi possível carregar os
    gatilhos. Por favor, tente novamente.". Na primeira carga, a área da lista fica vazia;
    ao "Atualizar", os cards que já estavam na tela continuam.

16. **Página do gatilho.** É a mesma tela da criação, em **somente leitura**. O botão
    **"Editar"** libera os campos.
    - Em somente leitura, os campos ficam desabilitados e somem os botões de adicionar e
      remover condições e ações. Bloco sem condições mostra "Nenhuma condição"; seção sem
      ações, "Nenhuma ação".
    - Em edição, aparecem **"Cancelar"** e **"Salvar"**.

17. **Quando "Salvar" habilita.** Só quando há alguma alteração em relação ao gatilho salvo
    **e** tudo está válido (as mesmas regras do "Criar"). Se o usuário desfaz a alteração,
    "Salvar" volta a ficar desabilitado.

18. **Cancelar na edição.** Sem alterações, volta direto para somente leitura. Com alguma
    alteração, antes abre a mesma confirmação de descarte da decisão 25 ("Descartar
    alterações"): "Descartar" desfaz tudo e volta para somente leitura; "Não, continuar
    editando" mantém a edição.

19. **Depois de salvar.** Toast de sucesso só com o texto "Todas as alterações foram
    salvas"; a página volta para somente leitura com os dados novos.

20. **Cabeçalho da página do gatilho.** Botão de voltar só com o ícone `pi-chevron-left`, em
    azul, sem borda nem fundo, que leva à lista. Ao lado, "Gatilho" em azul e, logo abaixo,
    a descrição do gatilho como título, em 20px. O status não aparece no cabeçalho, e o
    título mostra sempre o que está salvo (só muda depois de salvar).

21. **Posição do "Editar".** "Editar" (e, em edição, "Cancelar" e "Salvar") fica à direita,
    abaixo da linha que separa o cabeçalho e acima dos campos.

22. **Origem dos dados na especificação.** A origem de cada dado dinâmico segue os caminhos
    do documento de DTOs (ex.: `ObjectTriggerDTO.conditions[].operator`). Na API, a Categoria
    da tela é o campo (`ObjectTriggerFieldDTO`), e o grupo é o objeto (`objectType`). O nome
    do webhook vem de `description` e a descrição, de `notes` (⚠ P28).

23. **Filtro como componente próprio.** O filtro é um componente separado,
    `app-object-trigger-filter`. A ordenação não ganhou componente próprio na tela.

24. **Botões "Filtros" e "Ordenação".** Só ícone, sem tooltip e sem nome para leitor de tela,
    por decisão do time.

25. **Confirmação ao sair com alterações não salvas.** Na página do gatilho em edição, com
    alguma alteração, sair por qualquer caminho dentro da aplicação (voltar, menu ou outro
    endereço) abre uma confirmação genérica, reaproveitável por outras telas:
    - título "Descartar alterações";
    - mensagem "Há alterações que não foram salvas. Se sair agora, elas serão perdidas.",
      sem ícone;
    - botões "Não, continuar editando" (recebe o foco) e "Descartar" (vermelho).

    Recarregar ou fechar a aba mostra o aviso padrão do navegador. Sem alterações, sai
    direto.

26. **Sem tooltip no "Criar" e no "Salvar".** Os dois botões, mesmo desabilitados, não têm
    tooltip.

27. **Prints.** A especificação não tem referências visuais (prints), por decisão do time.

28. **Formato do arquivo de traduções.** `traducoes.md` segue o formato do documento de tags
    do time: blocos PORTUGUÊS, ESPANHOL e INGLÊS, uma linha `tag=texto` por tag, sem marcas
    de revisão.

## 24/11/2026

29. **Sem placeholders no corpo JSON.** Saíram o painel de placeholders e o botão
    "Visualizar placeholders disponíveis". O corpo da requisição é só texto JSON; os
    exemplos do protótipo usam valores fixos.

30. **Colunas com grid do PrimeFlex.** Divisões em colunas usam `grid` + `col-N`:
    - card da lista: Status `col-3`, Descrição `col-8`, Abrir `col-1`;
    - condição: Categoria `col-5`, Operador `col-3`, Valor `col-4`;
    - ação: Tipo `col-6`, Valor `col-6`;
    - filtro: Descrição `col-6`, Status `col-6` (2 por linha).

31. **Rotas em inglês.**

    | Página | Rota |
    |---|---|
    | Lista | `/object-trigger` |
    | Criação | `/object-trigger/register` |
    | Página do gatilho | `/object-trigger/<id do gatilho>/home` |

32. **Skeleton.** O estado de carregamento usa o `p-skeleton` do PrimeNG, sem skeleton
    próprio.

33. **Nome do filtro em inglês na especificação.** Cada campo de filtro tem o atributo
    "Filtro" com o nome em inglês: `description` e `status`.

34. **Ordenação com o componente genérico.** A especificação indica o componente genérico
    do produto, `app-icl-generic-ordering`, sem detalhar estilo. Ele recebe só os campos
    ordenáveis (Status e Descrição), abre e fecha pelo botão "Ordenação" e fica no topo do
    conteúdo, abaixo do filtro. O protótipo ainda usa um painel de ordenação próprio.

35. **Filtros com chips, aplicados no "Atualizar".** Segue o padrão de filtros do produto:
    - cada filtro preenchido vira um chip em "Filtros selecionados" ("Descrição: cliente",
      "Status: Ativo"); o chip da Descrição aparece e se atualiza a cada tecla;
    - preencher não muda a lista: o filtro só vale quando o usuário clica em "Atualizar";
    - remover um chip ou clicar em "Limpar Filtros" aplica na hora, sem precisar do
      "Atualizar";
    - com o painel fechado e algum filtro preenchido, a linha de "Filtros selecionados"
      continua visível;
    - o botão de limpar usa a tag genérica `portal.generic.label.clean-filters`
      ("Limpar Filtros").

36. **Condição como componente próprio.** Cada condição (Categoria, Operador e Valor, dentro
    do card) é um componente, `app-object-trigger-condition`, usado uma vez por condição em
    `app-object-trigger-condition-group`. O botão de remover (lixeira) continua no bloco, ao
    lado do card.

37. **Grupo de ações como componente próprio.** A lista de ações virou
    `app-object-trigger-action-group`, que pode ter qualquer quantidade de ações e usa um
    `app-object-trigger-action` para cada uma. Como nas condições, a lixeira, "Adicionar ação"
    e "Nenhuma ação" ficam no grupo; `app-object-trigger-action` é só o card da ação.

38. **Páginas e formulário.** Não existe mais `app-object-trigger-fields`. O corpo do
    formulário (dados gerais, Condições e Ações) é `app-object-trigger-form`, usado por duas
    páginas: `app-object-trigger-create` (criação, com "Novo gatilho", "Cancelar" e "Criar") e
    `app-object-trigger-home` (página do gatilho, com "Editar", "Cancelar" e "Salvar"). A
    pasta da criação passou a se chamar `create/`, no código e na especificação.

39. **Categoria como componente próprio.** O campo Categoria da condição (rótulo, select e
    mensagem de erro) é `app-object-trigger-category`, usado dentro de cada
    `app-object-trigger-condition`.

## 25/11/2026

40. **Organização da especificação.** A raiz de `especificacao/gatilho/` tem só o README
    (entidades, glossário, pastas e, por página, propósito, componentização, layout e
    fluxo) e `traducoes.md`. Os componentes ficam em pastas, um `.md` por componente:
    - `list/`: list, filter e card;
    - `create/`: create;
    - `home/`: home;
    - `form/`: form, com um README que explica a organização da pasta, e duas subpastas:
      - `conditions/`: condition-group, condition e category;
      - `actions/`: action-group, action e json-editor.

41. **Tipo da condição pelo bloco.** O bloco em que o usuário preenche a condição define o
    tipo dela, em `ObjectTriggerDTO.conditions[].type` (enum `ObjectTriggerConditionType`):
    bloco "Todas" = AND (1), bloco "Qualquer" = OR (2). Não há campo para escolher o tipo;
    para mudar, remove-se a condição de um bloco e adiciona-se no outro.

42. **Status "Em edição".** O gatilho tem três status, na ordem do enum
    `ObjectTriggerStatus`: Em edição (1, `portal.generic.label.in-edit`), Ativo (2) e
    Inativo (3). "Em edição" aparece no campo Status do formulário e no filtro da lista, é
    o status inicial de um gatilho novo e tem selo amarelo (classe nova
    `chips-container-yellow`). Ordenar por Status segue a ordem do enum.

43. **Dados do protótipo no formato dos DTOs.** Os mocks e o serviço seguem os DTOs da API
    (`ObjectTriggerDTO`, `ObjectTriggerConditionDTO`, `ObjectTriggerActionDTO`,
    `ObjectTriggerFieldDTO` e `WebhookDTO`), e a aba Dados mostra essas cinco entidades e
    seus relacionamentos. O campo Status da OS continua com o Valor em lista (Aberta,
    Concluída…), embora seja `LONG` na API; o valor salvo é o código do status, em `value1`.

