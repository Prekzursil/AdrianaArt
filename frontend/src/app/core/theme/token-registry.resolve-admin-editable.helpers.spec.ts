import { resolveAdminEditable } from './token-registry';

/** Golden WU resolve-admin-editable — resolveAdminEditable. */
describe('resolveAdminEditable (golden WU)', () => {
  it('resolves editable primaries and rejects unknown names', () => {
    expect(resolveAdminEditable('--background')?.kind).toBe('color-triplet');
    expect(resolveAdminEditable('--font-body')?.kind).toBe('font-family');
    expect(resolveAdminEditable('--not-a-token')).toBeUndefined();
    expect(resolveAdminEditable('background')).toBeUndefined();
  });
});
