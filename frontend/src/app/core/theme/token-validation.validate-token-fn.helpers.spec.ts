import { validateToken } from './token-validation';

/** Golden WU validate-token-fn -- validateToken. */
describe('validateToken (golden WU)', () => {
  it('accepts a clean background triplet and rejects unknown names', () => {
    expect(validateToken('--background', '255 255 255').ok).toBe(true);
    expect(validateToken('--not-a-token', '255 255 255').ok).toBe(false);
  });
});
