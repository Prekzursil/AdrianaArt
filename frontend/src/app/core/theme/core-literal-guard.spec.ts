import { findUnmappedCoreLiterals, scanCoreLiterals } from './core-literal-guard';

describe('scanCoreLiterals', () => {
  it('flags a bare core Tailwind utility class', () => {
    const findings = scanCoreLiterals('<div class="bg-white text-slate-700">');
    expect(findings.map((f) => f.text)).toEqual(['bg-white', 'text-slate-700']);
    expect(findings[0]).toEqual({ line: 1, column: 13, text: 'bg-white', kind: 'tw-class' });
  });

  it('flags bare classes carrying non-dark variant prefixes', () => {
    const findings = scanCoreLiterals('hover:text-slate-900 focus:ring-indigo-500');
    expect(findings.map((f) => f.text)).toEqual(['hover:text-slate-900', 'focus:ring-indigo-500']);
  });

  it('skips baked dark: variants (dark palette deferred)', () => {
    const findings = scanCoreLiterals('bg-background dark:bg-slate-900 dark:hover:text-white');
    expect(findings).toEqual([]);
  });

  it('does not flag the tokenized alias classes', () => {
    const findings = scanCoreLiterals(
      'bg-background text-text-heading border-border text-accent bg-surface-inverse',
    );
    expect(findings).toEqual([]);
  });

  it('ignores state / decorative colour families', () => {
    expect(scanCoreLiterals('bg-amber-50 text-rose-600 from-fuchsia-500')).toEqual([]);
  });

  it('honours the shade boundary (slate-50 vs slate-500)', () => {
    const findings = scanCoreLiterals('bg-slate-50/90 border-slate-500');
    expect(findings.map((f) => f.text)).toEqual(['bg-slate-50', 'border-slate-500']);
  });

  it('flags raw hex colour literals', () => {
    const findings = scanCoreLiterals('color: #0f172a; background: #fff;');
    expect(findings).toEqual([
      { line: 1, column: 8, text: '#0f172a', kind: 'hex' },
      { line: 1, column: 29, text: '#fff', kind: 'hex' },
    ]);
  });

  it('does not treat rgb(var()) triplet fallbacks as hex', () => {
    expect(scanCoreLiterals('color: rgb(var(--text, 51 65 85));')).toEqual([]);
  });

  it('computes multi-line positions', () => {
    const findings = scanCoreLiterals('line one\nline two bg-white\n');
    expect(findings).toEqual([{ line: 2, column: 10, text: 'bg-white', kind: 'tw-class' }]);
  });

  it('returns nothing for clean token-only source', () => {
    expect(scanCoreLiterals('<div class="grid gap-4 rounded-2xl">')).toEqual([]);
  });
});

describe('findUnmappedCoreLiterals', () => {
  it('returns every core literal when the allowlist is empty', () => {
    expect(findUnmappedCoreLiterals('bg-white #fff', []).map((f) => f.text)).toEqual([
      'bg-white',
      '#fff',
    ]);
  });

  it('filters out allowlisted literals and keeps the rest', () => {
    const findings = findUnmappedCoreLiterals('#94a3b8 bg-white', ['#94a3b8']);
    expect(findings.map((f) => f.text)).toEqual(['bg-white']);
  });

  it('passes clean when every literal is allowlisted', () => {
    expect(findUnmappedCoreLiterals('#000 #fff', ['#000', '#fff'])).toEqual([]);
  });
});
