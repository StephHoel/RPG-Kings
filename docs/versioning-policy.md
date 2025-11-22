# Política de Versionamento (manual)

Este documento descreve uma política de versionamento clara e enxuta para o projeto, pensada para uso manual.

Resumo rápido

- Usamos SemVer: MAJOR.MINOR.PATCH.
- Considerando o estado atual do projeto (sem breaking changes planejadas), os bumps esperados são:
  - MINOR para novas funcionalidades (features)
  - PATCH para correções, refactors e chores
- Use MAJOR apenas quando houver breaking changes explícitos.

Mapeamento de mensagens (sugestão para manter consistência)

- Mensagem iniciando com `feat(...)`: aumentar MINOR
- Mensagem iniciando com `fix(...)`, `perf(...)`, `refactor(...)`, `chore(...)`, `docs(...)`, `style(...)`: aumentar PATCH
- Se for breaking change, inclua `!` no cabeçalho (ex.: `feat!: altera API de saves`) e aumente MAJOR

Branches e deploy

- Branch `main`: branch de produção. Deploy no GitHub Pages deve ser feito a partir de `main`.
- Branch `develop`: ambiente de desenvolvimento e integração. Não faça deploy automático para a raiz de produção a partir de `develop`.

Processo manual recomendado para cada release

## Decidir a versão

Decida a versão a publicar seguindo SemVer e o mapeamento acima.

- Ex.: já se está em `1.2.3`. Se houver nova feature, a versão será `1.3.0`. Se for apenas correção, `1.2.4`.

## Atualizar o `docs/CHANGELOG.md`

Atualize `docs/CHANGELOG.md` manualmente seguindo o formato "Keep a Changelog":

- Adicione uma seção com a versão e a data:

  ## [1.3.0] - 2025-11-10

  - Adicionada tela de Saves com listagem e exclusão.
  - Atualizado layout global e menu.

- Mantenha seções `Unreleased` (opcional) e histórico de versões.

## Atualizar `package.json` (version)

```bash
# exemplo sem alterar outros arquivos automaticamente
npm version 1.3.0 --no-git-tag-version
```

## Publicar no GitHub Pages

- Faça um Pull Request para `main` e quando for mergeado, o workflow será executado.

## Boas práticas e dicas

- Usar convenção de commit como nos exemplos abaixo para melhor organização.
- Manter o `docs/CHANGELOG.md` humano-legível; use o modelo Keep a Changelog.
- Documentar no PR qual tipo de versão (feat → MINOR / fix → PATCH) está sendo aplicada.
- Fazer o merge para `main` apenas quando o PR estiver revisado e o build local estiver OK.

### Exemplos de mensagens de commit

- feat(saves): adicionar listagem de saves e botão de exclusão
- fix(menu): corrigir rota inválida quando id não existe
- chore(release): preparar changelog para v1.3.0

## Modelos rápidos de `docs/CHANGELOG.md` (Keep a Changelog)

```markdown
# Changelog

## [1.3.0] - 2025-11-10

- Adicionada tela de Saves com listagem e exclusão.
- Atualizado layout global e menu.

## [1.2.3] - 2025-10-01

- Correções e melhorias anteriores.
```
