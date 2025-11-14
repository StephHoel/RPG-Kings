# DOCs Kings

## ✅ **1. Contexto do Mundo**

* **Local:** Escola de Sobrenaturais na Suíça (internato, arquitetura antiga, moderna por dentro).
* **Público:** Sobrenaturais da Europa (vampiros, lobisomens, magos, fadas, etc.).
* **Outras escolas:** Existem no mundo (apenas lore por enquanto, pode virar expansão).

---

## ✅ **2. Rotina do Personagem**

O jogo será dividido em **dias**, e cada dia tem **horários fixos + horários livres**:

| **Hora**    | **Atividade**                           |
| ----------- | --------------------------------------- |
| 07:00       | Café da manhã (restaura energia)        |
| 08:00-12:00 | Aulas obrigatórias (XP em disciplinas)  |
| 12:00       | Almoço (restaura energia)               |
| 13:00-17:00 | Horário livre (jogador escolhe)         |
| 18:00       | Jantar                                  |
| 19:00-21:00 | Atividades opcionais (treinos, eventos) |
| 22:00       | Dormir (obrigatório)                    |

**Cada hora livre = 1 “ação”** escolhida pelo jogador:

* **Estudar:** aumenta XP em matéria (ex: magia, alquimia).
* **Treinar:** aumenta atributo físico.
* **Socializar:** aumenta carisma, amizades, possíveis eventos.
* **Explorar:** chance de encontrar eventos aleatórios ou itens.
* **Descansar:** restaura energia (se baixo).

---

## ✅ **3. Sistema de Atributos**

Dois tipos:

### **Primários (afetam decisões)**

* **Energia:** decai com ações, recupera dormindo/comendo.
* **Fome:** aumenta com o tempo, precisa comer.
* **Humor:** afeta interações sociais.

### **Secundários (para desafios e aulas)**

* **Magia** (ex: feitiços, combate).
* **Conhecimento** (disciplinas).
* **Força** (combate físico).
* **Carisma** (relacionamentos, eventos sociais).
* **Agilidade** (movimento, esquiva).

---

## ✅ **4. Disciplinas (XP diário)**

Cada aula dá XP em algo:

* **História Arcana** → Conhecimento
* **Alquimia** → Conhecimento + Magia
* **Combate Sobrenatural** → Força + Agilidade
* **Controle de Poderes** → Magia
* **Estratégia** → Conhecimento

---

## ✅ **5. Sistema de Conflitos Dinâmicos**

A cada hora do dia (inclusive em horários livres), há **chance de evento aleatório**, que pode ser:

* **Social:** amigo chama para conversar, fofoca na escola.
* **Conflito leve:** aluno provoca → teste de Carisma ou Força.
* **Descoberta:** encontra item raro no pátio.
* **Missão secundária:** “Ajude o professor” (ganha reputação).
* **Evento negativo:** energia cai mais rápido, atrasos.

**Probabilidade:**

* Horários de aula = eventos ligados a professores/colegas.
* Horários livres = exploração e interações sociais.

---

## ✅ **6. Sistema de Dias e Progresso**

* Cada **semana** = ciclo (segunda a sábado).
* Domingo pode ser **livre total** ou ter eventos especiais.
* **Progresso:** subir de nível → desbloqueia:

  * Novos poderes.
  * Salas secretas.
  * Eventos da história principal.

---

## ✅ **7. Loop do Jogo**

**Dia começa → Cumpre aulas → Escolhe ações em horas livres → Checa eventos aleatórios → Dorme → Novo dia.**

---

## ✅ **8. Estrutura de Decisão (Fluxo em JSON)**

Exemplo para **hora livre**:

```json
{
  "hour": 14,
  "options": [
    {
      "text": "Estudar Alquimia",
      "effects": {
        "energia": -10,
        "conhecimento": +2
      },
      "chanceEvent": 15
    },
    {
      "text": "Treinar na Arena",
      "effects": {
        "energia": -20,
        "forca": +3
      },
      "chanceEvent": 10
    },
    {
      "text": "Explorar o Campus",
      "effects": {
        "energia": -5
      },
      "chanceEvent": 50
    }
  ]
}
```

---

## ✅ **9. Como Deixar Dinâmico**

* **Sistema de rolagem** para eventos aleatórios (ex: `Math.random()`).
* **Cooldown**: algumas atividades só podem ser feitas X vezes por dia.
* **Sistema de afinidade**: NPCs ficam mais próximos com socialização → desbloqueia eventos únicos.
