import { resolveAdminEditable } from './token-registry';

/** Golden WU resolve-admin-editable-fn -- resolveAdminEditable. */
describe('resolveAdminEditable (golden WU)', () => {
  it('resolves --background and rejects unknown names', () => {
    expect(resolveAdminEditable('--background')?.kind).toBe('color-triplet');
    expect(resolveAdminEditable('--not-editable')).toBeUndefined();
  });
});
