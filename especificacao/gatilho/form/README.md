# form

Pasta do formulário do gatilho, `app-object-trigger-form`: dados gerais (Descrição, Status e
Observações) e as seções Condições e Ações. O formulário é usado pelas duas páginas que
editam um gatilho: a criação (`../create/`) e a home (`../home/`).

### Organização
A pasta segue a estrutura do formulário: o componente principal fica na raiz e cada seção
tem a sua pasta, com os componentes dela do maior para o menor.

```
form/
├── app-object-trigger-form.md              o formulário: dados gerais e as duas seções
├── conditions/                             seção Condições
│   ├── app-object-trigger-condition-group.md   bloco "Todas" ou "Qualquer", com a lista de condições
│   ├── app-object-trigger-condition.md         uma condição: Categoria, Operador e Valor
│   └── app-object-trigger-category.md          campo Categoria de uma condição
└── actions/                                seção Ações
    ├── app-object-trigger-action-group.md      lista de ações, com adicionar e remover
    ├── app-object-trigger-action.md            uma ação: webhook, detalhes e corpo
    └── app-object-trigger-json-editor.md       campo do corpo da requisição (JSON) de uma ação
```

### Como os componentes se encaixam
- `app-object-trigger-form` usa dois `app-object-trigger-condition-group` (blocos "Todas" e
  "Qualquer") e um `app-object-trigger-action-group`.
- Cada `app-object-trigger-condition-group` usa um `app-object-trigger-condition` por
  condição, e cada condição usa um `app-object-trigger-category`.
- O `app-object-trigger-action-group` usa um `app-object-trigger-action` por ação, e cada
  ação com webhook usa um `app-object-trigger-json-editor`.

As regras de cada componente estão no `.md` dele; o fluxo entre os componentes de cada
página está no `../README.md` › Páginas.
