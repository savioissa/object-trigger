# app-object-trigger-category

### Aplicação
Campo Categoria de uma condição: rótulo, select com as categorias agrupadas e mensagem de
erro. É usado por `app-object-trigger-condition`, uma vez em cada condição. Ao escolher uma
categoria, avisa a condição, que ajusta Operador e Valor.

### Componentização
| Componente   | Tipo    | Onde é usado |
| ------------ | ------- | ------------ |
| `p-dropdown` | Externo | Select de categorias, com grupos |


### Elementos

#### Rótulo
- **Tag:** `portal.generic.label.category`
- **CSS:** `equipment-event-label`; associado ao select.

#### Select
- **Tag:** `portal.createso.placeholder.find-category` (placeholder)
- **Componente:** `p-dropdown`, com grupos
- **CSS:** — (visual padrão do PrimeNG); com erro, `field-invalid` no `p-dropdown`.
- **Comportamento:** ao abrir, lista as categorias agrupadas: o nome do grupo aparece como
  cabeçalho não selecionável (visual padrão do PrimeNG) e as categorias do grupo logo abaixo. Ao
  escolher uma categoria, o campo mostra "Grupo > Categoria" (ex.: "Ordem de serviço >
  Status"); o Operador é habilitado.
- **Regras:** hoje há um único grupo, "Ordem de serviço", com uma única categoria,
  "Status". Uma condição sem categoria é ignorada: não bloqueia o botão "Criar" e não é salva.
  Depois de escolhida, a categoria não pode voltar a ficar vazia.
- **Origem do dado:**
  - opções: `ObjectTriggerFieldDTO[]` (listagem de campos), agrupadas por
    `ObjectTriggerFieldDTO[].objectType`; nome do grupo em
    `ObjectTriggerFieldDTO[].objectTranslationTag` e nome da categoria em
    `ObjectTriggerFieldDTO[].translationTag`;
  - valor escolhido: `ObjectTriggerDTO.conditions[].field.id`;
  - "Grupo > Categoria" de uma condição salva: o campo da listagem com o mesmo `id` de
    `ObjectTriggerDTO.conditions[].field.id`, porque o `field` dentro da condição não traz
    `objectTranslationTag`.

#### Mensagem de erro
- **Tag:** `portal.generic.label.required-field`
- **CSS:** `caption restrictions-header-error m-0`
- **Regras:** aparece abaixo do select quando ele está habilitado, inválido e o usuário já
  saiu dele.

### Layout
Uma coluna (`flex flex-column gap-2 min-w-0`, PrimeFlex): rótulo em cima, select e mensagem
de erro embaixo, com 8px entre eles. A largura é dada por quem usa o componente (na condição,
`col-5`).

### Estados
| Estado          | Quando                                   | O que deve ser exibido |
| --------------- | ---------------------------------------- | ---------------------- |
| Vazio           | Condição recém-adicionada                | Placeholder `portal.createso.placeholder.find-category` |
| Selecionada     | Categoria escolhida                      | "Grupo > Categoria" (ex.: "Ordem de serviço > Status") |
| Somente leitura | Página do gatilho fora do modo de edição | Select desabilitado, com a aparência padrão do PrimeNG (opacidade de 60%), sem a seta |

### Comportamentos
- **Dado** a condição em edição, **quando** o usuário escolhe uma categoria, **então** o
  componente emite `categoriaChange` e `app-object-trigger-condition` habilita o Operador e
  limpa o Valor (ver `app-object-trigger-condition.md` › Comportamentos).

### CSS
| Classe | Definição       |
| ------ | --------------- |
| :host  | display: block; |
