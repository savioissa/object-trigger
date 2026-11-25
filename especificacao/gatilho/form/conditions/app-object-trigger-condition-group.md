# app-object-trigger-condition-group

### Aplicação
Bloco de condições de um tipo de combinação. A página usa dois: "Todas as condições devem
ser atendidas" (todas precisam ser verdadeiras) e "Qualquer condição deve ser atendida"
(basta uma ser verdadeira). O bloco define o tipo de cada condição que está nele: no bloco
"Todas", toda condição é do tipo AND (1); no bloco "Qualquer", do tipo OR (2) (ver Tipo da
condição). Cada bloco lista as condições, uma por linha, e permite
adicionar e remover condições. Cada condição (Categoria, Operador e Valor) é um
`app-object-trigger-condition`; o botão de remover fica neste componente, ao lado dela.

### Componentização
| Componente                     | Tipo    | Onde é usado |
| ------------------------------ | ------- | ------------ |
| `app-object-trigger-condition` | Interno | Uma por condição do bloco: Categoria, Operador e Valor (`app-object-trigger-condition.md`) |
| `p-button`                     | Externo | Botões "Remover condição" e "Adicionar condição" |

### Elementos

#### Título do bloco
- **Tag:** recebido de `app-object-trigger-form`: `portal.generic.label.all-conditions-satisfied`
  no bloco "Todas" (tipo AND) e `portal.generic.label.any-condition-satisfied` no bloco
  "Qualquer" (tipo OR)
- **CSS:** `medium`; `m-0` (PrimeFlex); h3;

#### Tipo da condição
- **Tag:** — (não aparece na tela; é definido pelo bloco)
- **Regras:**
  - O tipo de uma condição é dado pelo bloco em que o usuário a preenche: ao adicionar uma
    condição no bloco "Todas", ela é do tipo AND; no bloco "Qualquer", do tipo OR. O usuário
    não escolhe o tipo em nenhum campo.
  - Ao salvar (botões "Criar" e "Salvar"), cada condição vai com o tipo do seu bloco.
  - Ao abrir um gatilho salvo, as condições do tipo AND aparecem no bloco "Todas" e as do
    tipo OR, no bloco "Qualquer", na ordem em que foram salvas.
  - Uma condição não muda de bloco: para trocar o tipo, o usuário remove a condição de um
    bloco e a adiciona no outro.
- **Origem do dado:** `ObjectTriggerDTO.conditions[].type` (enum `ObjectTriggerConditionType`)

  | Enum | Valor | Bloco      | Título do bloco                                  |
  | ---- | ----- | ---------- | ------------------------------------------------ |
  | 1    | AND   | "Todas"    | `portal.generic.label.all-conditions-satisfied`  |
  | 2    | OR    | "Qualquer" | `portal.generic.label.any-condition-satisfied`   |

#### Lista de condições
- **CSS:** `flex flex-column gap-3` (PrimeFlex); 1rem entre as linhas.
- **Componente:** `app-object-trigger-condition`, um por condição, recebendo a condição e as
  categorias agrupadas.
- **Regras:** uma linha por condição, na ordem em que foram adicionadas; sem limite de
  quantidade; sem nenhuma condição, a lista não aparece. Em somente leitura, cada
  `app-object-trigger-condition` recebe a condição com os campos desabilitados.

#### Botão "Remover condição"
- **Tag:** — (só ícone, sem tooltip nem `aria-label`, por decisão do time)
- **Componente:** `p-button`
- **Ícone:** `pi pi-trash`
- **CSS:** `btn--md btn--neutral`; `flex-shrink-0` (PrimeFlex); ícone cinza, sem fundo; 48 × 32px, com a
  largura padrão do PrimeNG para botão só com ícone.
- **Comportamento:** ao clicar, remove a condição imediatamente, sem confirmação.
- **Regras:** não aparece em somente leitura.

#### Botão "Adicionar condição"
- **Tag:** `portal.generic.label.add-condition`
- **Componente:** `p-button`
- **Ícone:** `pi pi-plus`
- **CSS:** `customer-portal-button-positive-color` no elemento que envolve o botão; fundo branco, texto azul.
- **Comportamento:** ao clicar, adiciona uma condição vazia ao fim do bloco, com Operador e
  Valor desabilitados.
- **Regras:** não aparece em somente leitura.

#### Mensagem "Nenhuma condição"
- **Tag:** `portal.generic.label.no-conditions`
- **CSS:** `description-medium`; `m-0` (PrimeFlex)
- **Regras:** só aparece em somente leitura, quando o bloco não tem nenhuma linha; ocupa o
  lugar da lista.

### Layout
O bloco é uma coluna, com 1rem entre os itens (`flex flex-column gap-3`, PrimeFlex):

1. **Título do bloco (topo).**
2. **Lista de condições:** cada linha tem duas partes, alinhadas ao centro e com 16px entre elas (`flex align-items-center gap-3`, PrimeFlex):
   1. **Esquerda (ocupa o espaço restante):** `app-object-trigger-condition` (`flex-1 min-w-0`,
      PrimeFlex), com o card de Categoria, Operador e Valor (layout interno em
      `app-object-trigger-condition.md`).
   2. **Direita (largura do botão, 48px):** botão "Remover condição", centralizado na altura do card. Em
      somente leitura, essa coluna não existe e o card ocupa a largura toda.
3. **Botão "Adicionar condição" (embaixo, alinhado à esquerda).** Em somente leitura, não
   aparece; sem linhas, a mensagem "Nenhuma condição" fica logo abaixo do título.

### Estados
| Estado                   | Quando                                               | O que deve ser exibido                                                                           |
| ------------------------ | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------ |
| Sem condições            | O bloco não tem nenhuma linha                        | Só o título e o botão "Adicionar condição"                                                      |
| Com condições            | O bloco tem uma ou mais condições                    | Uma `app-object-trigger-condition` por condição, cada uma com a lixeira ao lado; "Adicionar condição" embaixo |
| Somente leitura          | Página do gatilho fora do modo de edição             | Condições com os campos desabilitados (estados em `app-object-trigger-condition.md`); sem "Remover condição" nem "Adicionar condição" |
| Somente leitura sem condições | Somente leitura e o bloco sem nenhuma linha     | Título do bloco e `portal.generic.label.no-conditions` |

### Comportamentos
- **Dado** o bloco em edição, **quando** o usuário clica em "Adicionar condição", **então** uma
  nova `app-object-trigger-condition` vazia aparece no fim da lista.
- **Dado** o bloco em edição, **quando** o usuário clica na lixeira de uma condição, **então**
  aquela `app-object-trigger-condition` sai da lista, sem confirmação.
- Os comportamentos dos campos (troca de categoria, de operador etc.) estão em
  `app-object-trigger-condition.md`.

### CSS
| Classe                          | Definição |
| ------------------------------- | --------- |
| :host                           | display: block; |
