/** @type {import('tailwindcss').Config} */

// Storefront-scoped theme-token aliases (P1a WU5). These keys are consumed ONLY by the
// 7 storefront core files; the shared `slate`/`indigo` primitives are deliberately NOT
// remapped, so the admin UI keeps its baked palette and is never repainted by a
// storefront theme. Each alias is `rgb(var(--token) / <alpha-value>)` over the frozen
// bare `R G B` triplet wire format (WU0 memo §4) with the compiled-default light value
// inlined as the `var()` fallback, so a surface renders correctly even before the WU6
// SSR block injects `:root` tokens (var()-fallback contract).
const alias = (token, fallback) => `rgb(var(${token}, ${fallback}) / <alpha-value>)`;

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-body, Inter, system-ui, -apple-system, sans-serif)'],
      },
      colors: {
        background: alias('--background', '255 255 255'),
        surface: alias('--surface', '241 245 249'),
        'surface-inverse': alias('--surface-inverse', '15 23 42'),
        text: alias('--text', '51 65 85'),
        'text-inverse': alias('--text-inverse', '255 255 255'),
        'text-heading': alias('--text-heading', '15 23 42'),
        'text-muted': alias('--text-muted', '100 116 139'),
        border: alias('--border', '226 232 240'),
        accent: alias('--accent', '79 70 229'),
        overlay: alias('--overlay', '0 0 0'),
        // Dead-but-typed brand/primary seeds (WU0 memo §1D). Wired onto real storefront
        // surfaces from scratch by WU3; carried here so the alias vocabulary is complete.
        brand: alias('--brand', '15 23 42'),
        primary: alias('--primary', '15 23 42'),
      },
    },
  },
  plugins: [],
};
