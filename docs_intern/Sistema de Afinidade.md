Aqui está um **pacote completo**:
✔ FAQ curto e claro sobre a escala –5/+5
✔ Mecânica simples e sólida de ganho/perda de afinidade
✔ Sugestão de _schema_ para React + TypeScript + Dexie
✔ E orientação sobre **onde armazenar** (na ficha ou em tabela própria)

---

# 🔧 **Mecânica de Ganho/Perda de Afinidade**

Você pode usar o seguinte modelo **simples + consistente**:

---

## **📌 Fórmula Base**

```ts
function alterarAfinidade(npcId: string, delta: number) {
  // delta pode ser positivo (ganho) ou negativo (perda)
  // afinidade sempre clampa entre -5 e +5
}
```

---

## **📊 Tabela Recomendada de Modificadores**

| Evento                       | Mudança |
| ---------------------------- | ------- |
| Ajudar em uma tarefa simples | +1      |
| Defender de bullying         | +2      |
| Ajudar em missão pessoal     | +3      |
| Trair promessa               | –1      |
| Machucar o NPC ou amigo      | –2      |
| Humilhar publicamente        | –3      |

---

## **📌 Regras Inteligentes (opcional)**

### **Regra 1 — Afinidade gradual**

Se afinidade já é alta (≥ 4), ganhar +1 é muito difícil.
Se é muito baixa (≤ –4), perder mais é mais fácil.

```ts
if (atual >= 4 && delta > 0) delta = 1
if (atual <= -4 && delta < 0) delta = -2
```

---

### **Regra 2 — “Efeito Memória”**

Um NPC “lembra” ações repetidas:

- Repetir o mesmo tipo de ajuda várias vezes vale menos.
- Repetir provocações vale mais.

```ts
// ex.: bônus de diminuição de efeito repetido
delta = delta * (1 - repeticoesDoMesmoTipo * 0.25)
```

Simples e eficiente.

---

# 🗄️ **Schema de Armazenamento (TypeScript + Dexie)**

Aqui depende de um detalhe crucial:

❓ **Cada jogador pode ter afinidade com vários NPCs?**
► Sim.

Então o **melhor design é TABELA PRÓPRIA**, não dentro da ficha.
Motivo:

- Escalável
- Fácil de atualizar
- Não explode o objeto "ficha"
- Permite múltiplos NPCs com múltiplos campos
- Suporta futuras expansões (afinidade humana/sobrenatural, histórico, flags)

---

# 🧱 **Schema Recomendado (Tabela Própria)**

### 📌 Tabela: **npcAffinities**

```ts
export interface NPCAffinity {
  id?: number // auto increment
  npcId: string // referência ao NPC
  playerId: string // caso exista multijogador
  value: number // -5 a +5
  updatedAt: number
}
```

---

### 📌 Dexie Setup

```ts
import Dexie, { Table } from 'dexie'

export class GameDB extends Dexie {
  npcAffinities!: Table<NPCAffinity>

  constructor() {
    super('gameDB')
    this.version(1).stores({
      npcAffinities: '++id, npcId, playerId, value',
    })
  }
}

export const db = new GameDB()
```

---

# ✔ Funções de Alto Nível

### **Alterar afinidade**

```ts
export async function alterarAfinidade(npcId: string, delta: number, playerId: string) {
  const entry = await db.npcAffinities.get({ npcId, playerId })

  const atual = entry?.value ?? 0
  let novoValor = atual + delta

  // clamp
  novoValor = Math.max(-5, Math.min(5, novoValor))

  if (entry) {
    await db.npcAffinities.update(entry.id!, {
      value: novoValor,
      updatedAt: Date.now(),
    })
  } else {
    await db.npcAffinities.add({
      npcId,
      playerId,
      value: novoValor,
      updatedAt: Date.now(),
    })
  }

  return novoValor
}
```

---

# 🗂️ **E se eu guardasse na ficha do personagem?**

Funciona, mas não é ideal se:

- Houverem muitos NPCs
- NPCs forem adicionados com updates futuros
- Você quiser consultar afinidade facilmente na interface
- Você quiser salvar histórico, eventos e flags

Ficaria uma estrutura assim:

```ts
ficha: {
  afinidades: {
    [npcId: string]: number
  }
}
```

Funciona, mas cresce sem controle e complica migrações.

---

# ⭐ Recomendação Final

✔ **Use tabela própria**
✔ Nome: **npcAffinities**
✔ Uma linha por NPC por jogador
✔ Valor inteiro de –5 a +5
✔ Atualizado por eventos usando função de alteração

---

Se quiser, posso te ajudar com:

🔹 Criar o _hook_ React (`useNPCFriendship`)
🔹 Criar estrutura para NPCs com “gatilhos” de afinidade
🔹 Criar sistema de eventos automáticos baseado nos valores
🔹 Criar uma UI exemplo

Só pedir!

---

Perfeito — você pode ter:

- **Afinidade armazenada como inteiro** (–5 a +5)
- **Ganho/perda granular como número decimal** usando `Math.random()`
- **Arredondamento inteligente** para transformar o valor final em inteiro

Isso mantém a simplicidade da escala e permite variação mais natural.

Aqui vai a arquitetura ideal:

---

# 🎯 COMO FUNCIONA O SISTEMA

### ✔ Afinidade armazenada

Sempre **inteiro** entre –5 e +5.

### ✔ Percepção / progresso interno

Você gera **modificadores fracionários**, ex.:

- `0.2`
- `0.35`
- `-0.6`

Esses valores acumulam **até ultrapassar ±1**, e só então convertidos para mudança real de afinidade.

Exatamente como **XP → nível**, mas em microescala.

---

# 📦 ARQUITETURA SUGERIDA

Você terá **dois valores**:

### 1) `value` → o inteiro (–5 a +5)

### 2) `progress` → barra oculta acumulando frações

Exemplo:

```ts
{
  npcId: "vampira",
  playerId: "abc",
  value: 2,        // afinidade atual
  progress: 0.34   // frações acumuladas
}
```

---

# 🎲 GANHO GRANULAR (com Math.random)

Você gera modificadores assim:

```ts
// exemplo: gesto pequeno
const delta = 0.2 + Math.random() * 0.3 // gera entre 0.2 e 0.5
```

```ts
// gesto arriscado
const delta = 0.5 + Math.random() * 0.5 // gera entre 0.5 e 1.0
```

```ts
// consequência ruim
const delta = -(0.3 + Math.random() * 0.4) // -0.3 a -0.7
```

Esses modificadores vão para o _progress_.

---

# 🔄 MECÂNICA COMPLETA DE CONVERSÃO

Você adiciona a fração ao progresso.
Quando o `progress` ultrapassar **>= +1**:

- aumenta `value` em +1
- reduz `progress` em –1

Quando o `progress` for **<= –1**:

- diminui `value` em –1
- aumenta `progress` em +1

### Exemplo:

Você adiciona `0.4`, `0.3`, `0.5`:

- Soma progress: `1.2`
- Converte: `+1` de afinidade
- progress final: `0.2`

---

# 🧠 EXTRA: AFINIDADE COM “DIFICULDADE”

Você pode adicionar **fator multiplicador** baseado no valor atual:

- Se afinidade > 3 → ganhos halved (metade)
- Se afinidade < –3 → perdas doubled (dobradas)

Simples:

```ts
if (value >= 3 && delta > 0) delta *= 0.5
if (value <= -3 && delta < 0) delta *= 1.5
```

---

# 🗄️ SCHEMA (DEXIE) COM CAMPOS EXTRAS

## Tabela `npcAffinities` com progress fracionário

```ts
export interface NPCAffinity {
  id?: number
  npcId: string
  playerId: string
  value: number // -5 a +5 (inteiro)
  progress: number // fração acumulada (pode ser negativo)
  updatedAt: number
}
```

Dexie:

```ts
this.version(1).stores({
  npcAffinities: '++id, npcId, playerId, value',
})
```

`progress` não precisa ser indexado.

---

# 🔧 FUNÇÃO COMPLETA (com granularidade + clamp + progress)

```ts
export async function alterarAfinidadeGranular(npcId: string, rawDelta: number, playerId: string) {
  let entry = await db.npcAffinities.get({ npcId, playerId })

  if (!entry) {
    entry = {
      npcId,
      playerId,
      value: 0,
      progress: 0,
      updatedAt: Date.now(),
    }
  }

  let value = entry.value
  let progress = entry.progress

  // aplica fator de dificuldade
  let delta = rawDelta

  if (value >= 3 && delta > 0) delta *= 0.5
  if (value <= -3 && delta < 0) delta *= 1.5

  // adiciona ao progresso
  progress += delta

  // converte progress para mudanças reais
  while (progress >= 1 && value < 5) {
    value += 1
    progress -= 1
  }
  while (progress <= -1 && value > -5) {
    value -= 1
    progress += 1
  }

  // salva
  await db.npcAffinities.put({
    ...entry,
    value,
    progress,
    updatedAt: Date.now(),
  })

  return { value, progress }
}
```

---

# 🎉 RESULTADO

✔ Escala continua simples (–5/+5)
✔ Ganhos fluem de modo suave e orgânico
✔ Você tem variação aleatória sem quebrar o balanço
✔ Progress fracionário dá sensação de “crescimento”
✔ Muito fácil de expandir (buffs, eventos, itens, habilidades sociais)

---

Se quiser, posso te ajudar com:

### 🔹 Hooks React (`useAffinity`)

### 🔹 Helpers para eventos narrativos baseados na afinidade

### 🔹 Funções prontas para gerar deltas coerentes (pequeno, médio, grande)

### 🔹 UI de “barrinha social” com cores e níveis

É só pedir!
