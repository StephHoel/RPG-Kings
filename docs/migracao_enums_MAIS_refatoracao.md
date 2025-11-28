# Migração de Enums + Refatoração do uso

## Tabelas

- saves: jogos
- sheets: fichas de personagem
- stats: stats (novo)
- xp_records: xp (novo)
- inventories: inventário de itens (nome alterado)
- logs: rastreio de acontecimentos
- scenes_list: lista de cenas [SELECT]
- items_list: lista de itens [SELECT]
- stats_base_list: lista de status base [SELECT] (novo)
- races_list: lista de raças [SELECT] (novo)
- animals_list: lista de animais [SELECT] (novo)
- skills_list: lista de skills [SELECT] (novo)
- disciplines_list: lista de disciplines [SELECT] (novo)
- milestones: marcos alcançados (será deletada)
- settings: (será deletada)
- disciplines: xp das aulas (será deletada)

## Schemas

Saves
  id: string
  isActive: boolean
  currentWeek: number
  currentDay: number (modificado)
  currentHour: number
  currentSceneId: string
  updatedAt: date
  createdAt: date

Sheets
  id: number incremental
  saveId: string
  name: string (movido de saves)
  race: string
  animal: string optional
  coins: number
  updatedAt: date
  createdAt: date

Stats
  id: number incremental
  saveId: string
  strength: number
  agility: number
  intelligence: number
  charisma: number
  stamina: number
  hungry: number
  mood: number
  health: number
  magic: number
  mana: number

XP_Records
  id: number incremental
  saveId: string
  type: "class" | "skill"
  target: string
  xp: number

Inventories
  id: number incremental
  saveId: string
  item: string
  type: string
  acquiredWeek: number
  durationWeeks:number
  expiresAtWeek:number
  usedAtWeek: number optional
  updatedAt: date
  createdAt: date

Logs
  id: number incremental
  type: "error" | "info"
  message: string optional
  payload: any (incluir saveId nesse payload)
  createdAt: date

Scenes_List
  id: string (texto)
  title: string
  content: string (bbcode simples)
  choises: [
    {
      title: string
      cost: {
        energy: number
        coin: number
        hour: boolean (avança ou não hr)
      }
      next: string (id da próxima cena) | null (se null, escolher aleatória baseado nos preReqs de outras)
    }
  ]
  preRequire: {
    hours: number[] (preencher com todas as horas possíveis de aparecer essa cena, isto será usado para escolher qual vai aparecer)
    items?: {
      all?: string[]
      any?: string[]
    },
    xp?: {
      target: string
      min: number
    }[]
    skills?: string[],
    stats?: {
      stat: string
      min: number
      max: number
    }[],
    effects?: {
      stats?: { [statName: string]: number }     // ex: { energy: -5, mood: +2 }
      xp?: Array<{ type: string; target: string; amount: number }>
      items?: Array<{ itemId: string; add: boolean }>
    }
  }

Items_List
  id: number incremental
  name: string
  description: string
  cost: number (coins)
  durationWeeks: number | null (null = não perde validade)
  type: "healing" | "wearable" | "eletronic"

Stats_Base_List
  id: number incremental
  type: "animal" | "race"
  target: string
  strength: number
  agility: number
  intelligence: number
  charisma: number
  stamina: number
  
Races_List
  id: number incremental
  name: string
  hasAnimal: boolean
  defaultAnimal: string | null

Animals_List
  id: number incremental
  name: string
  race: string

Skills_List
  id: number incremental
  name: string
  type: "develop" | "fixed"
  races: string[]

Disciplines_List
  id: number incremental
  name: string
  type: "mandatory" | "optional"
  skills: string[]
  stats: string[]

## Constantes

const xpType: string[] = [ "class", "skill" ]
const logType: string[] = [ "error", "info" ]
const itemsType: string[] = [ "healing", "wearable", "eletronic" ]
const baseStatsType: string[] = [ "animal", "race" ]
const skillsType: string[] = [ "mandatory", "optional" ]
const statsType: string[] = [ "strength", "agility", "intelligence", "charisma", "stamina", "hungry", "mood", "health", "magic", "mana" ]

## Versão 3 do BD

```ts
this.version(3).stores({
  saves: 'id, isActive',
  sheets: '++id, &saveId, name, race',
  stats: '++id, &saveId',
  xp_records: '++id, saveId, type, target',
  inventories: '++id, saveId, type, expiresAtWeek, usedAtWeek',
  logs: '++id, type, createdAt',
  scenes_list: 'id, title',
  items_list: '++id, name, type',
  stats_base_list: '++id, type, target',
  races_list: '++id, name',
  animals_list: '++id, name, race',
  skills_list: '++id, name, type, races',
  disciplines_list: '++id, name, type, skills, stats',
})
```

---

## **3. Seeds COMPLETAS (com validação Zod e insert Dexie)**

Você pode colocar em `/db/seeds.ts`.

```ts
import { db } from "./db"; 
// importe todos os schemas acima

export async function seedDatabase() {

  // --- SAVES example ---
  const save = SaveSchema.parse({
    id: "save1",
    isActive: true,
    currentWeek: 1,
    currentDay: 1,
    currentHour: 8,
    updatedAt: new Date(),
    createdAt: new Date(),
  });
  await db.saves.put(save);

  // --- RACES example ---
  const races = [
    { name: "Human", hasAnimal: false, defaultAnimal: null },
    { name: "Elf", hasAnimal: true, defaultAnimal: "Fox" },
  ].map((r) => RaceSchema.parse(r));
  await db.races_list.bulkAdd(races);

  // --- ANIMALS example ---
  const animals = [
    { name: "Fox", race: "Elf" },
    { name: "Wolf", race: "Elf" },
  ].map((a) => AnimalSchema.parse(a));
  await db.animals_list.bulkAdd(animals);

  // --- STATS BASE example ---
  const statsBase = [
    {
      type: "race",
      target: "Human",
      strength: 5,
      agility: 5,
      intelligence: 5,
      charisma: 5,
      stamina: 5,
    },
    {
      type: "race",
      target: "Elf",
      strength: 3,
      agility: 7,
      intelligence: 8,
      charisma: 6,
      stamina: 4,
    },
  ].map((s) => StatsBaseSchema.parse(s));
  await db.stats_base_list.bulkAdd(statsBase);

  // --- ITEMS example ---
  const items = [
    {
      name: "Small Healing Potion",
      description: "Restore 10 HP",
      cost: 5,
      durationWeeks: null,
      type: "healing",
    },
  ].map((i) => ItemListSchema.parse(i));
  await db.items_list.bulkAdd(items);

  // --- SCENES example ---
  const scenes = [
    {
      id: "wake_up_room",
      title: "Você acorda",
      content: "[b]Bom dia![/b]",
      choices: [
        {
          title: "Levantar",
          cost: { energy: 5, coin: 0, hour: true },
          next: "cafeteria_morning",
        },
      ],
      preRequire: {
        hours: [6, 7, 8],
        energy: { min: 0, max: 100 },
      },
      tags: ["morning"],
      weight: 1,
    },
  ].map((c) => SceneSchema.parse(c));
  await db.scenes_list.bulkAdd(scenes);

  console.log("Database seeded.");
}
```
