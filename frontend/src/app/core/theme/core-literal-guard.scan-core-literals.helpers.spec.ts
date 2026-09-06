import { scanCoreLiterals } from './core-literal-guard';

/** Golden WU scan-core-literals — scanCoreLiterals. */
describe('scanCoreLiterals (golden WU)', () => {
  it('finds tw-class and hex literals', () => {
    const findings = scanCoreLiterals('class="bg-red-500" color: #ff00aa;');
    const kinds = findings.map((f) => f.kind).sort();
    expect(kinds).toContain('hex');
    expect(findings.some((f) => f.kind === 'tw-class' || f.text.includes('bg-'))).toBe(true);
  });
});
