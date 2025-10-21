## ✅ **Passo 1 – Defina os Pilares do Jogo**

* **Tema:** Escola de sobrenaturais.
* **Tipo:** RPG single-player baseado em texto (com imagens e interface).
* **Formato:** Web (jogável no navegador).
* **Estilo:** Narrativo com escolhas (visual novel / RPG leve).
* **Progressão:** História + atributos (força, magia, popularidade, etc.) + sistema de eventos diários.

---

## ✅ **Passo 2 – Estrutura da Experiência**

Um RPG online precisa de **3 camadas**:

### **1. Narrativa e Mundo**

* Criar **timeline** da história: início → aulas → desafios → conflitos → clímax.
* Personagens com fichas (nome, raça, poder, afinidade).
* Eventos dinâmicos: provas, batalhas, festas, interações.

### **2. Mecânicas**

* **Ficha do jogador**: atributos (Ex: Carisma, Poder, Inteligência).
* **Escolhas**: cada decisão afeta história + atributos.
* **Sistema de energia ou tempo**: limita ações por “dia” no jogo.
* **Sistema de progresso**: subir de nível, desbloquear áreas e magias.
* **Inventário**: itens e moedas.

### **3. Interface**

* Layout simples:

  * **Área principal:** texto + imagens da cena.
  * **Menu lateral:** status, atributos, inventário.
  * **Botões de escolha**: avançar, atacar, interagir.
* Estilo inspirado em jogos como *Choice of Games* ou *Twine*, mas mais visual.

---

## ✅ **Passo 3 – Arquitetura do Site**

Sugestão moderna:

* **Frontend:**

  * React ou Next.js (para SPA e performance).
  * TailwindCSS (estilo rápido).
* **Backend:**

  * Node.js (com Express) ou .NET minimal API (para salvar progresso).
* **Banco:**

  * SQLite (fácil de gerenciar) ou PostgreSQL (se pensar em escalar).
* **Auth:**

  * JWT (login simples, opcional para salvar progresso online).
* **Hospedagem:**

  * Vercel (frontend) + Railway/Render (backend) ou um VPS.

---

## ✅ **Passo 4 – Estrutura de Código**

Organize assim:

```
/game
  /data
    characters.json      # Personagens e atributos
    events.json          # Eventos, escolhas e efeitos
    items.json           # Itens
  /src
    /components
      GameUI.jsx         # Interface principal
      Choices.jsx        # Botões de escolha
      StatusBar.jsx      # Atributos do jogador
    /logic
      gameEngine.js      # Lógica do jogo (atributos, decisões)
    /pages
      index.jsx          # Página inicial
      game.jsx           # Tela do jogo
```

---

## ✅ **Passo 5 – Sistema de Decisões**

Use JSON para gerenciar eventos:

```json
{
  "id": 1,
  "scene": "Você entra na escola sombria. O que faz?",
  "choices": [
    {
      "text": "Explorar o pátio",
      "effects": { "coragem": +1 },
      "next": 2
    },
    {
      "text": "Ir para a biblioteca",
      "effects": { "inteligencia": +2 },
      "next": 3
    }
  ]
}
```

O **gameEngine** lê isso e atualiza os atributos do jogador.

---

## ✅ **Passo 6 – Primeira Versão (MVP)**

* Crie **1 capítulo jogável** com:

  * Sistema de login **ou** modo convidado.
  * Ficha do jogador.
  * 5 decisões impactando atributos.
  * Salvamento localStorage.
