import { validateTokenChange } from './pairing-validator';

/** Golden WU validate-token-change-fn -- validateTokenChange. */
describe('validateTokenChange (golden WU)', () => {
  it('okays non-paired tokens without parsing the value', () => {
    const result = validateTokenChange('--font-body', 'Inter, system-ui, sans-serif');
    expect(result.ok).toBe(true);
    expect(result.failures).toEqual([]);
  });
});
