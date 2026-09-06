import { validateToken } from './token-validation';

/** Golden WU validate-token -- validateToken. */
describe('validateToken (golden WU)', () => {
  it('accepts valid accent triplets; rejects unknown names', () => {
    const ok = validateToken('--accent', '79 70 229');
    expect(ok.ok).toBe(true);
    expect(ok.value).toBe('79 70 229');
    const bad = validateToken('not-a-token', '79 70 229');
    expect(bad.ok).toBe(false);
    expect(bad.value).toBe('');
  });
});
