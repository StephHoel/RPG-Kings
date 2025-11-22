<!--
Arquivo gerado automaticamente listando ocorrências de "// TODO" no repositório.
Cada título é exatamente o texto escrito após "// TODO" na fonte, seguido por sugestões práticas.
-->

# TODOs do repositório

Segue a lista dos TODOs encontrados no código. Cada seção usa o texto exato que aparece após `// TODO` como título.

---

## pensar se vamos usar configurações, hoje não é necessário e não vejo motivo para usar

Nota: Despriorizado
Arquivo: `src/schemas/SettingsSchema.ts` (linha aproximada: 5)

Sugestões para resolver:

- **Verificar contexto:** revisar por que o comentário foi adicionado — possivelmente o schema ou a propriedade `highContrast` são experimentais.
- **Decidir retenção:** se a propriedade ou validação é necessária, remover o TODO e adicionar um comentário mais específico (ex.: "manter se suportarmos high-contrast theme").
- **Testes/Exemplos:** adicionar testes de validação do `SettingsSchema` cobrindo `highContrast` presente/ausente.
- **Remover ou arquivar:** se não for necessário, remover a propriedade/linha ou mover a nota para um issue no tracker.

---

## deletar sheet também

Arquivo: `src/hooks/save/useDeleteSave.ts` (linha aproximada: 16)

Sugestões para resolver:

- **Implementação direta:** após `db.saves.delete(saveId)`, também executar `db.sheets.where({ saveId }).delete()` ou `db.sheets.delete(saveId)` dependendo da chave primária.
- **Transacionalidade:** envolver operações em transação (`db.transaction('rw', db.saves, db.sheets, async () => { ... })`) para garantir consistência.
- **Teste de integração:** criar teste que cria save + sheet e garante que ambos são removidos.
- **Logs/observability:** manter logs para operações e tratar erros separadamente.

---

## colocar cada idioma

Arquivo: `src/enums/Classes.ts` (linha aproximada: 4)

Sugestões para resolver:

- **Substituir pelo enum completo:** listar explicitamente cada idioma suportado como valores do enum.
- **Fonte de dados:** se a lista for longa, extraí-la para um `constants/languages.ts` ou carregar de `config`.
- **Internacionalização:** considerar se esse enum é dependente do i18n; preferir keys (ex.: `LANG_PT_BR`) e usar traduções para labels.

---

## colocar cada esporte

Arquivo: `src/enums/Classes.ts` (linha aproximada: 16)

Sugestões para resolver:

- **Listar esportes:** substituir o placeholder por entradas específicas (ex.: `FUTEBOL`, `BASQUETE`).
- **Agrupamento:** considere criar um enum `SportsEnum` e usar categorias separadas para quadra/grama.
- **Fonte/config:** carregar a lista de um arquivo de dados se precisar ser atualizável.

---

## colocar cada esporte

Arquivo: `src/enums/Classes.ts` (linha aproximada: 17)

Sugestões para resolver:

- **Mesma ação que acima:** identificar esportes de grama e listá-los explicitamente (ex.: `RUGBY`, `FUTEBOL_AMERICANO`).

---

## colocar cada esporte

Arquivo: `src/enums/Classes.ts` (linha aproximada: 18)

Sugestões para resolver:

- **Mesma ação que acima:** listar esportes aquáticos (ex.: `NATACAO`, `POLO_AQUATICO`).

---

## colocar cada instrumento

Arquivo: `src/enums/Classes.ts` (linha aproximada: 19)

Sugestões para resolver:

- **Adicionar instrumentos:** listar instrumentos relevantes (ex.: `VIOLAO`, `PIANO`, `VIOLINO`).
- **Separar label/slug:** usar chaves estáveis no enum e armazenar labels traduzíveis.

---

## colocar cada dança

Arquivo: `src/enums/Classes.ts` (linha aproximada: 20)

Sugestões para resolveR:

- **Listar danças:** adicionar entradas específicas (ex.: `SAMBA`, `HIP_HOP`, `BALLET`).
- **Consistência:** manter nomenclatura consistente com outros enums.

---

## colocar cada luta

Arquivo: `src/enums/Classes.ts` (linha aproximada: 21)

Sugestões para resolver:

- **Listar estilos de luta:** adicionar entradas como `KARATE`, `JIU_JITSU`, `BOXE`.
- **Verificar uso:** confirmar se essas categorias exigem atributos extras (níveis, equipamentos).

---

## adicionar uma forma de criar sheet se não existir e implementar ao tentar recuperar o sheet tbm

Arquivo: `src/db/index.ts` (linha aproximada: 76)

Sugestões para resolver:

- **Criar fallback ao ler:** ao recuperar sheet por `saveId`, se não existir, criar uma nova sheet padrão com `saveId` e valores defaults.
- **Durante migração:** se a sheet estiver faltando na migração, gerar um objeto `defaultSheet(saveId)` e incluí-lo no `bySaveId` antes de bulkPut.
- **Centralizar criação:** mover função `createDefaultSheet(saveId)` para um utilitário (`src/lib` ou `src/db/helpers.ts`) para reutilização.
- **Testes e segurança:** adicionar testes de migração que verifiquem criação quando ausente.
