# 0) navegação geral

- Novo: **/ (landing)** → **/saves/new** (criar perfil) → **/game**
- Continuar: **/ (landing)** → **/game**
- demais telas: **/saves**, **/inventory**, **/progress**, **/milestone**, **/settings**

---

## 1) landing / splash

objetivo: escolher “entrar” ou “continuar”.

```plain
┌──────────────────────────────────────────────┐
│ [LOGO] Escola Sobrenatural                   │
│ “Um internato nos Alpes. Uma vida secreta.”  │
│                                              │
│ [✔ Continuar último]                         │
│                                              │
│ [Entrar / Criar perfis]                      │
│                                              │
│     (pequeno link) Sobre  Configurações      │
└──────────────────────────────────────────────┘
```

estados:

- se existir “save ativo” → aparecer botão “Continuar” e botão “Novo Save”.
- senão → aparecer botão “Novo Save”.

---

## 2) [desabilitado] auth

usa **PIN/senha** por **perfil de jogador** (não por personagem).

```plain
┌───────────────────────────────────────┐
│ Entrar                                │
│                                       │
│ [ Seletor de perfil ▼ ]               │
│ [ ••••  (PIN) ]                       │
│ [ Entrar ]                            │
│ ( ) Lembrar neste dispositivo         │
│                                       │
│ [ Criar novo perfil ] [ Esqueci PIN ] │
└───────────────────────────────────────┘
```

empty/edge cases:

- nenhum perfil → redireciona para “criar perfil”.
- “esqueci pin” → pedir pergunta secreta/ dica local ou reset que apaga saves do perfil (com confirmação forte).

---

## 3) [diferente] criar/gerenciar **saves**

um navegador pode ter vários perfis (ex.: “Steph”, “Convidado”).

```plain
┌──────────────────────────────────────────────────┐
│ Perfis neste navegador                           │
│                                                  │
│ ┌───────────┐ ┌───────────┐ ┌───────────┐        │
│ │ Steph     │ │ Convidado │ │ + Novo    │        │
│ └───────────┘ └───────────┘ └───────────┘        │
│                                                  │
│ [Renomear] [Definir PIN] [Exportar] [Apagar]     │
└──────────────────────────────────────────────────┘
```

ações:

- **exportar**: gera arquivo `.json` criptografado leve dos saves do perfil.
- **apagar**: “digite ‘APAGAR’ para confirmar”.

---

## 4) seleção/criação de **personagem/save** (por perfil)

cada perfil tem **N personagens** (slots ilimitados ou limite prático, ex. 12).

```plain
┌────────────────────────────────────────────────────────────┐
│ [Voltar aos Perfis]                                        │
│                                                            │
│ Escolha seu personagem                                     │
│                                                            │
│ ┌─────────────┐  ┌─────────────┐  ┌────────────┐           │
│ │ Ailén (Lv3) │  │ Lyara (Lv1) │  │ + Novo     │           │
│ │ S1 D3 14:00 │  │ S1 D1 09:00 │  │ Personagem │           │
│ └─────────────┘  └─────────────┘  └────────────┘           │
│                                                            │
│ [Duplicar] [Renomear] [Exportar] [Apagar]                  │
└────────────────────────────────────────────────────────────┘
```

empty:

- sem saves → redireciona para tela de criação.

---

## 5) novo save

mínimo viável: nome + origem sobrenatural + dificuldade. (customizações visuais podem ficar pro pós-MVP)

```plain
┌──────────────────────────────┐
│ Novo Personagem              │
│                              │
│ Nome: [___________]          │
│                              │
│ Origem: ( ) Vampiro ( ) Lobo │
│         ( ) Fada    ( ) Mago │
│                              │
│ [Cancelar]        [Começar]  │
└──────────────────────────────┘
```

---

## 6) **game** (layout 2 colunas)

mantém header/footer; **esquerda menor** (status e atalhos), **direita maior** (cena e escolhas). esse é o loop principal.

### 6.1) **header**

```plain
Dia 3 — Semana 1 — 14:00 — Quarta     Reputação: 12 • Moedas: 45
Aulas: 08–12 | Próximo bloco livre: 15h
```

#### **main**

```plain
┌─────────────── esquerda (25%) ────────────────┬──────────── direita (75%) ──────────────┐
│ ATRIBUTOS                                     │ [CARD: cena atual]                      │
│ Energia 62/100  Fome 40/100  Humor 55/100     │ "O vento frio varre o pátio..."         │
│                                               │ [ Explorar o brilho ] (-5 EN, +10% ev)  │
│ DISCIPLINAS                                   │ [ Chamar Lena ] (-10 EN, +Afinidade)    │
│ História N1 34/100                            │ [ Voltar ao dormitório ]                │
│ Alquimia N1 12/100                            │                                         │
│ Combate N1 20/100                             │                                         │
│                                               │                                         │
│ ATALHOS                                       │                                         │
│ [Mapa] [Inventário] [Progresso] [Calendário]  │                                         │
└───────────────────────────────────────────────┴─────────────────────────────────────────┘
```

#### **footer**

```plain
Dicas: “Explorar tem mais chance de eventos à tarde.”   [Salvar] [Configurações]
```

estados:

- quando **acabar ações livres do dia** → mostrar CTA “Dormir”.
- caso **Energia ≤ 0** → bloquear ações pesadas; sugerir descansar/refeição.

---

## 7) modais auxiliares

### 7.1 mapa (áreas)

```plain
┌────────── MAPA ───────────┐
│ Pátio • Biblioteca • Arena│
│ Dormitórios • Refeitório  │
│ (cadeados mostram lock)   │
│ [Ir] [Fechar]             │
└───────────────────────────┘
```

ação **Ir** consome 1 “slot” de hora livre (opcional no MVP).

### 7.2 inventário

```plain
┌──────── INVENTÁRIO ───────┐
│ Consumíveis (Pão, Suco)   │
│ Itens-chave (Kit Básico)  │
│ [Usar] [Detalhes] [Fechar]│
└───────────────────────────┘
```

usar → aplica efeito (ex.: +Energia, -Fome).

### 7.3 progresso / marcos

```plain
┌────── PROGRESSO ─────────────────────────────────────────┐
│ [Acadêmico] [Poder] ..                                   │
│ ◻ Prova de Alquimia N1 │ reqs: Alq≥60, Energia≥50, Kit  │
│ ◻ Primeiro Amigo       │ reqs: Afinidade≥40             │
│ [Fechar]                                                 │
└──────────────────────────────────────────────────────────┘
```

### 7.4 calendário / agenda

```plain
┌──────── CALENDÁRIO ────────┐
│ Seg a Sáb: Aulas 08–12     │
│ Domingo: livre/eventos     │
│ Hoje (D3): livre 13–17     │
│                            │
│         [Fechar]           │
└────────────────────────────┘
```

### 7.5 dormir (confirmação)

```plain
┌────── DORMIR? ────────┐
│ Encerrar dia agora?   │
│ +60 EN, -30 Fome, +10 │
│                       │
│ [Cancelar] [Dormir]   │
└───────────────────────┘
```

---

## 8) tela “**ficha**” (detalhe do personagem)

```plain
┌────────── FICHA ──────────┐
│ Atributos (barras)        │
│ Disciplinas (Nível/XP)    │
│ Traços (passivos)         │
│ Poderes (ativos)          │
│ Afinidades (NPCs 0–100)   │
│ Títulos/Conquistas        │
└───────────────────────────┘
```

---

## 9) tela “**saves**” (dentro do jogo)

permite **trocar personagem** sem sair do perfil.

```plain
┌────────── SALVOS ──────────┐
│ Lista de personagens       │
│                            │
│ [Carregar] [Duplicar]      │
│                            │
│ [Exportar]  [Apagar]       │
│                            │
│ [Novo Personagem]          │
└────────────────────────────┘
```

---

## 10) configurações

mínimo para MVP:

- volume ON/OFF, textos grandes/pequenos, **backup/exportar saves**, **importar**.

```plain
┌──────── CONFIGURAÇÕES ───────────────┐
│ Texto: [ Pequeno | Médio | Grande ]  │
│                                      │
│ Backup: [Exportar Perfil] [Importar] │
│                                      │
│ Sessão: [Trocar Perfil]              │
│                                      │
│ [Fechar]                             │
└──────────────────────────────────────┘
```

---

## 11) estados de erro e vazios

- **sem perfis** → criar perfil.
- **sem saves no perfil** → wizard novo personagem.
- **save corrompido** → opção restaurar backup/descartar.
- **falta de energia** → bloqueia certas escolhas (UI mostra tooltip).

---

## 12) contratos de estado (resumo, sem código)

### sessão

```txt
Session {
  profileId, lastCharacterId, createdAt, remember (bool)
}
```

### perfil

```txt
Profile {
  id, name, hasPin, saves: CharacterSummary[]
}
```

### personagem/save

```txt
Character {
  id, name, origem, dificuldade,
  meta: { semana, dia, hora, reputacao, moedas },
  core: { energia, fome, humor },
  disciplinas: { historia: {xp,lvl}, ... },
  afinidades: { [npcId]: valor },
  inventario: { [itemId]: qtd },
  titulos: string[], tracos: string[], poderes: string[],
  lastPlayedAt
}
```

---

## 13) fluxos principais (macro)

1. **primeira vez**

   ```plain
   Landing → Criar Perfil → Wizard Personagem → Game (D1 07:00)
   ```

2. **jogar o dia**

   ```plain
   Game: escolher ações (4x) → eventos → “Dormir” → restaurar → Dia+1
   ```

3. **trocar de personagem**

   ```plain
   Game → Menu → Saves → Selecionar outro → Game (carregado)
   ```

4. **exportar/backup**

   ````plain
   Config → Exportar Perfil → baixa .json (tudo do perfil)
   ```plain
   ````
