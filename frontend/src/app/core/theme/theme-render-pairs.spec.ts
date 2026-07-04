import { RENDER_PAIRINGS } from './pairing-matrix';
import {
  classifyBg,
  classifyFg,
  extractRenderPairs,
  isDynamicClassAttr,
  scanClassBlob,
} from './theme-render-pairs';

const GATED = new Set(RENDER_PAIRINGS.map((p) => `${p.foreground}|${p.background}`));

describe('classifyBg', () => {
  const cases: ReadonlyArray<[string, { kind: string; token: string | null }]> = [
    ['transparent', { kind: 'inherit', token: null }],
    ['gradient-to-b', { kind: 'block', token: null }],
    ['overlay', { kind: 'block', token: null }],
    ['surface', { kind: 'concrete', token: '--surface' }],
    ['surface-inverse-hover', { kind: 'concrete', token: '--surface-inverse-hover' }],
    ['surface-200', { kind: 'concrete', token: '--surface-200' }],
    ['text-500', { kind: 'concrete', token: '--text-500' }],
    ['red-600', { kind: 'block', token: null }],
    ['white', { kind: 'block', token: null }],
  ];
  for (const [name, expected] of cases) {
    it(`classifies bg-${name}`, () => {
      expect(classifyBg(name)).toEqual(expected);
    });
  }
});

describe('classifyFg', () => {
  const cases: ReadonlyArray<[string, string | null]> = [
    ['text', '--text'],
    ['text-heading', '--text-heading'],
    ['inverse', '--text-inverse'],
    ['onmedia', '--text-onmedia'],
    ['accent-strong', '--accent-strong'],
    ['text-500', '--text-500'],
    ['border-950', '--border-950'],
    ['white', null],
    ['sm', null],
    ['rose-600', null],
  ];
  for (const [name, expected] of cases) {
    it(`classifies text-${name}`, () => {
      expect(classifyFg(name)).toBe(expected);
    });
  }
});

describe('isDynamicClassAttr', () => {
  it('matches every class-binding form and nothing else', () => {
    expect(isDynamicClassAttr('[ngclass]')).toBe(true);
    expect(isDynamicClassAttr('[class]')).toBe(true);
    expect(isDynamicClassAttr('[class.foo]')).toBe(true);
    expect(isDynamicClassAttr('[attr.class]')).toBe(true);
    expect(isDynamicClassAttr('class')).toBe(false);
    expect(isDynamicClassAttr('[disabled]')).toBe(false);
  });
});

describe('scanClassBlob', () => {
  it('reads a base bg + text and a hover fill', () => {
    const scan = scanClassBlob(
      'bg-background text-text hover:bg-surface-muted hover:text-text-heading',
    );
    expect(scan.baseBg).toBe('--background');
    expect(scan.hoverBg).toBe('--surface-muted');
    expect(scan.baseFg).toEqual(['--text']);
    expect(scan.hoverFg).toEqual(['--text-heading']);
  });

  it('blocks on a base gradient part but not a hovered one', () => {
    expect(scanClassBlob('from-surface bg-red-600').baseBgBlock).toBe(true);
    const hovered = scanClassBlob('hover:from-surface bg-surface');
    expect(hovered.baseBgBlock).toBe(false);
    expect(hovered.baseBg).toBe('--surface');
  });

  it('ignores a non-concrete hover bg and a transparent base', () => {
    expect(scanClassBlob('bg-surface hover:bg-red-600').hoverBg).toBeNull();
    const transparent = scanClassBlob('bg-transparent text-text');
    expect(transparent.baseBg).toBeNull();
    expect(transparent.baseBgBlock).toBe(false);
  });

  it('skips pseudo-element variants', () => {
    const scan = scanClassBlob('text-text file:bg-surface-inverse file:text-inverse');
    expect(scan.baseBg).toBeNull();
    expect(scan.baseFg).toEqual(['--text']);
  });
});

function pairs(template: string): Set<string> {
  return extractRenderPairs(template);
}

describe('extractRenderPairs', () => {
  it('inherits a concrete surface into nested text', () => {
    expect(pairs('<div class="bg-surface"><p class="text-text">x</p></div>')).toEqual(
      new Set(['--text|--surface']),
    );
  });

  it('pairs co-located bg and text', () => {
    expect(pairs('<div class="bg-background text-text-heading"></div>')).toEqual(
      new Set(['--text-heading|--background']),
    );
  });

  it('lets transparent inherit the ancestor surface', () => {
    expect(
      pairs('<div class="bg-surface"><span class="bg-transparent text-text">x</span></div>'),
    ).toEqual(new Set(['--text|--surface']));
  });

  it('blocks attribution under the app-shell gradient', () => {
    expect(
      pairs(
        '<div class="bg-gradient-to-b from-background-subtle to-background">' +
          '<p class="text-text-heading">x</p></div>',
      ),
    ).toEqual(new Set());
  });

  it('blocks attribution under an overlay scrim and an opaque colour', () => {
    expect(pairs('<div class="bg-overlay"><p class="text-onmedia">x</p></div>')).toEqual(new Set());
    expect(pairs('<div class="bg-red-600"><p class="text-onmedia">x</p></div>')).toEqual(new Set());
  });

  it('pairs base and hover text against the hover fill', () => {
    expect(
      pairs(
        '<a class="bg-background text-text hover:bg-surface-muted hover:text-text-heading">x</a>',
      ),
    ).toEqual(
      new Set(['--text|--background', '--text|--surface-muted', '--text-heading|--surface-muted']),
    );
  });

  it('uses the base fill for hover text without a hover bg', () => {
    expect(pairs('<a class="bg-surface text-text hover:text-text-heading">x</a>')).toEqual(
      new Set(['--text|--surface', '--text-heading|--surface']),
    );
  });

  it('does not conflate a dynamic ngClass ternary', () => {
    const template =
      '<button class="px-3 text-xs" [ngClass]="c ? \'bg-surface-inverse text-inverse\' : \'text-text\'">x</button>';
    expect(pairs(template)).toEqual(new Set());
  });

  it('keeps a static concrete bg alongside a dynamic binding', () => {
    const template =
      '<div class="bg-surface" [ngClass]="c ? \'opacity-50\' : \'\'"><p class="text-text">x</p></div>';
    expect(pairs(template)).toEqual(new Set(['--text|--surface']));
  });

  it('skips a file: pseudo fill but keeps the inherited surface', () => {
    const template =
      '<div class="bg-surface"><input class="text-text file:bg-surface-inverse file:text-inverse" /></div>';
    expect(pairs(template)).toEqual(new Set(['--text|--surface']));
  });

  it('does not let a void <img> bg become the sibling text context', () => {
    const template =
      '<div class="bg-field"><img class="bg-surface-inverse" alt=""><p class="text-text-heading">x</p></div>';
    expect(pairs(template)).toEqual(new Set(['--text-heading|--field']));
  });

  it('emits from a self-closing element against the inherited surface', () => {
    expect(pairs('<div class="bg-surface"><input class="text-text" /></div>')).toEqual(
      new Set(['--text|--surface']),
    );
  });

  it('yields no pairs for an empty template', () => {
    expect(pairs('')).toEqual(new Set());
  });

  // --- The non-tautology RED probes -----------------------------------------

  it('flags text-text-muted on bg-surface as ungated (residual #3 probe)', () => {
    const found = pairs('<div class="bg-surface"><p class="text-text-muted">x</p></div>');
    expect(found.has('--text-muted|--surface')).toBe(true);
    expect(GATED.has('--text-muted|--surface')).toBe(false);
  });

  it('flags a rendered ramp key as ungated (residual #4 probe)', () => {
    const found = pairs('<div class="bg-surface-200"><p class="text-text-500">x</p></div>');
    expect(found.has('--text-500|--surface-200')).toBe(true);
    expect(GATED.has('--text-500|--surface-200')).toBe(false);
  });

  it('the storefront render fixture only paints gated pairs', () => {
    // A representative fixture drawn from the real storefront (header badge, cart
    // chip, footer link hover, card body, product-card, file inputs, shell). The
    // authoritative completeness check over the FULL templates lives in the Python
    // backstop (test_theme_contrast.py); this proves the mirrored TS parser derives
    // the same gated-only pair set from real markup.
    const fixture = `
      <header class="bg-background">
        <span class="bg-surface text-text-strong">cart</span>
        <span class="bg-surface-inverse text-inverse">1</span>
        <input class="bg-field text-text-heading" />
        <p class="text-text-muted">meta</p>
      </header>
      <footer class="bg-background">
        <a class="text-text hover:bg-surface-muted hover:text-text-heading">link</a>
        <p class="text-text-secondary">tagline</p>
        <p class="text-text-strong">Company</p>
      </footer>
      <div class="bg-surface"><p class="text-text-secondary">on surface</p></div>
      <div class="bg-background text-text"><a class="text-accent hover:text-accent-strong">link</a></div>
    `;
    const found = pairs(fixture);
    expect(found.size).toBeGreaterThan(0);
    const ungated = [...found].filter((p) => !GATED.has(p));
    expect(ungated).toEqual([]);
  });
});
