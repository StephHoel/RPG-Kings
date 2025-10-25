// atributos.ts
export type Core = { energia: number; fome: number; humor: number };
export type Stats = { magia: number; conhecimento: number; forca: number; agilidade: number; carisma: number };

export type DisciplinaId = "historia" | "alquimia" | "controle" | "combate" | "estrategia";

export type Disciplinas = Record<DisciplinaId, { xp: number; lvl: number }>;

export type Afinidade = { idNpc: string; valor: number }; // 0–100

export type PlayerState = {
  dia: number; hora: number; semana: number;
  core: Core; stats: Stats; disciplinas: Disciplinas;
  afinidades: Record<string, number>;
  traços: string[]; poderes: string[]; titulos: string[];
  inventario: Record<string, number>;
};
