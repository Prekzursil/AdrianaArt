import { validateTokenChange } from './pairing-validator';

/** Golden WU validate-token-change -- validateTokenChange. */
describe('validateTokenChange (golden WU)', () => {
  it('passes seed-dark heading; fails near-white body text', () => {
    expect(validateTokenChange('--text-heading', '10 12 20').ok).toBe(true);
    expect(validateTokenChange('--font-body', 'Inter, system-ui, sans-serif').ok).toBe(
      true,
    );
    const failing = validateTokenChange('--text', '230 230 230');
    expect(failing.ok).toBe(false);
    expect(failing.failures.length).toBeGreaterThan(0);
  });
});
