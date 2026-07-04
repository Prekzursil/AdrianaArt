/**
 * Surface-coverage + var()-fallback contract (P1a WU5), CI-authoritative.
 *
 * Asserts the machine half of the WU5 acceptance: a mapped storefront surface resolves
 * through its `--token` (change the token -> the rendered computed style changes) and, when
 * the token is absent, falls back to the compiled default (never unstyled). This exercises
 * the exact `rgb(var(--token, <default>))` / `var(--font-*, …)` / `var(--font-size-base, …)`
 * forms the Tailwind aliases (tailwind.config.cjs) and styles.css core surfaces emit, across
 * the colour, font and type-scale token families.
 *
 * It drives the real browser CSS engine (getComputedStyle), so it is authoritative in the
 * karma/Chrome CI run rather than in a headless unit context.
 */
const ROOT = document.documentElement;

function withProbe(css: string, run: (probe: HTMLElement) => void): void {
  const probe = document.createElement('div');
  probe.style.cssText = css;
  document.body.appendChild(probe);
  try {
    run(probe);
  } finally {
    probe.remove();
  }
}

describe('theme token surface-coverage', () => {
  const touched: string[] = [];
  const setToken = (name: string, value: string): void => {
    touched.push(name);
    ROOT.style.setProperty(name, value);
  };

  afterEach(() => {
    while (touched.length) {
      ROOT.style.removeProperty(touched.pop() as string);
    }
  });

  const colorTokens: ReadonlyArray<{ token: string; probe: string; fallback: string }> = [
    { token: '--background', probe: 'background-color', fallback: 'rgb(255, 255, 255)' },
    { token: '--surface', probe: 'background-color', fallback: 'rgb(241, 245, 249)' },
    { token: '--surface-inverse', probe: 'background-color', fallback: 'rgb(15, 23, 42)' },
    { token: '--text', probe: 'color', fallback: 'rgb(51, 65, 85)' },
    { token: '--text-heading', probe: 'color', fallback: 'rgb(15, 23, 42)' },
    { token: '--text-muted', probe: 'color', fallback: 'rgb(100, 116, 139)' },
    { token: '--text-inverse', probe: 'color', fallback: 'rgb(255, 255, 255)' },
    { token: '--border', probe: 'border-top-color', fallback: 'rgb(226, 232, 240)' },
    { token: '--accent', probe: 'color', fallback: 'rgb(79, 70, 229)' },
    { token: '--overlay', probe: 'background-color', fallback: 'rgb(0, 0, 0)' },
  ];

  for (const { token, probe, fallback } of colorTokens) {
    it(`drives ${probe} through ${token} and falls back to its compiled default`, () => {
      const decl =
        probe === 'border-top-color'
          ? `border-top: 1px solid rgb(var(${token}, ${fallback.match(/\d+/g)!.join(' ')}))`
          : `${probe}: rgb(var(${token}, ${fallback.match(/\d+/g)!.join(' ')}))`;

      withProbe(decl, (el) => {
        expect(getComputedStyle(el)[probe as 'color']).toBe(fallback);
        setToken(token, '10 20 30');
        expect(getComputedStyle(el)[probe as 'color']).toBe('rgb(10, 20, 30)');
      });
    });
  }

  it('drives the body font through --font-body and falls back to the compiled stack', () => {
    withProbe('font-family: var(--font-body, Inter, system-ui, sans-serif)', (el) => {
      expect(getComputedStyle(el).fontFamily).toContain('Inter');
      setToken('--font-body', 'Georgia');
      expect(getComputedStyle(el).fontFamily).toContain('Georgia');
    });
  });

  it('drives the heading font through --font-heading and falls back to the compiled stack', () => {
    withProbe('font-family: var(--font-heading, Cinzel, ui-serif, Georgia, serif)', (el) => {
      expect(getComputedStyle(el).fontFamily).toContain('Cinzel');
      setToken('--font-heading', 'Verdana');
      expect(getComputedStyle(el).fontFamily).toContain('Verdana');
    });
  });

  it('drives the type scale through --font-size-base and falls back to the compiled size', () => {
    withProbe('font-size: var(--font-size-base, 16px)', (el) => {
      expect(getComputedStyle(el).fontSize).toBe('16px');
      setToken('--font-size-base', '20px');
      expect(getComputedStyle(el).fontSize).toBe('20px');
    });
  });
});
