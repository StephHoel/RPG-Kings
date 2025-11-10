# Padrões de frontend — Botões, Telas e Cores

Este documento define a linguagem visual de frontend e as primitivas de
componentes a serem usadas no projeto. É intencionalmente pequeno, pragmático
e orientado ao Tailwind para que desenvolvedores possam copiar snippets para
`src/components`.

## Tokens de design (semânticos)

- color-primary: #8B5CF6 (ação primária)
- color-primary-foreground: #D1D5DB
- color-secondary: #7C3AED (ação secundária / sutil)
- color-accent: #5d00ffff (destaque)
- color-surface: #F3F4F6
- color-muted-surface: #9CA3AF
- color-bg: #4B5563
- color-error: #ef4444
- color-success: #10b981

Observação: são tokens semânticos. Adicione-os em `styles/globals.css` quando desejar mapeá-los no nível do projeto.

## Tipografia & espaçamento (recomendação)

- Tamanho base: 16px (1rem)
- Altura de linha: 1.4 — 1.6 dependendo do componente
- Escala de espaçamento: usar a escala do Tailwind (px, 0.5, 1, 2, 4, 8, 16, etc.)

## Primitivas de botão

Use as sugestões de classes Tailwind abaixo como pontos de partida.

- Primary (md):

  - Classes: `inline-flex items-center justify-center px-4 py-2 rounded-md bg-primary text-primary-foreground font-semibold shadow-sm hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500`

- Secondary (md):

  - Classes: `inline-flex items-center justify-center px-4 py-2 rounded-md bg-secondary text-white/90 font-medium hover:bg-secondary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary-400`

- Ghost (aparência link):

  - Classes: `inline-flex items-center justify-center px-2 py-1 text-primary font-medium hover:underline focus:outline-none`

- Icon-only:

  - Classes: `inline-flex items-center justify-center p-2 rounded-full text-primary hover:bg-muted-surface focus:outline-none` + `aria-label` obrigatório

Desabilitado: adicione `opacity-50 cursor-not-allowed pointer-events-none` e remova efeitos de hover.

Tamanhos: sm (px-2 py-1 text-sm), md (px-4 py-2), lg (px-6 py-3 text-lg)

## Telas & primitivas de layout

- Container de página: `mx-auto max-w-4xl px-4 sm:px-6 lg:px-8`
- Painel/Card: `bg-surface rounded-lg p-4 shadow-sm border border-gray-100`
- Sidebar (colapsável): largura fixa `w-72` com colapso em mobile
- Modal: `fixed inset-0 flex items-center justify-center bg-black/50` + container `max-w-2xl w-full p-6 bg-surface rounded-lg`
- Cena full-bleed: `w-full h-screen flex items-center justify-center bg-gradient-to-b from-bg via-muted-surface to-surface`

## Foco & teclado

- Use `focus:outline-none focus:ring-2 focus:ring-offset-2` com cores semânticas para ring.
- O contraste do foco visível deve ser suficiente para usuários somente-teclado.

## Checklist de acessibilidade

1. Todos os elementos interativos alcançáveis por teclado (ordem natural do tabindex).
2. Fornecer `aria-label` para botões apenas com ícone e `aria-labelledby` quando necessário.
3. Fornecer link pular-para-conteúdo em páginas com nav/sidebars longos.
4. Respeitar `prefers-reduced-motion: reduce`.

## Exemplo de componente (pseudo-TSX)

Exemplo mínimo para copiar em `src/components/Button.tsx`:

```tsx
// Pseudo-code example — adapt to project's patterns
export function Button({variant = 'primary', size = 'md', children, ...props}) {
  const base = 'inline-flex items-center justify-center rounded-md font-medium focus:outline-none focus:ring-2 focus:ring-offset-2'
  const variantClasses = {
    primary: 'bg-primary text-primary-foreground shadow-sm hover:bg-primary-600 focus:ring-primary-500',
    secondary: 'bg-secondary text-white/90 hover:bg-secondary-600 focus:ring-secondary-400',
    ghost: 'bg-transparent text-primary hover:underline'
  }
  const sizeClasses = {sm:'px-2 py-1 text-sm', md:'px-4 py-2', lg:'px-6 py-3 text-lg'}
  return <button className={`${base} ${variantClasses[variant]} ${sizeClasses[size]}`} {...props}>{children}</button>
}
```

## Notas de implementação para desenvolvedores

- Prefira tokens de cor semânticos (por exemplo, `bg-primary`) em vez de hex diretos nas classes para que uma troca de tema futura exija mudanças mínimas.
- Mantenha componentes pequenos e composáveis (composable); siga o princípio de Clean Code da Constituição. Forneça comentários curtos explicando decisões não óbvias.

---

Se a equipe desejar, podemos depois adicionar uma coleção leve de componentes em `src/components/patterns/` com Storybook para revisão visual — isso é um seguimento opcional e não está incluído no repositório canônico por padrão.
