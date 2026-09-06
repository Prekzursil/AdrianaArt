import { validateAdminEditable } from './token-validation';

/** Golden WU validate-admin-editable-fn -- validateAdminEditable. */
describe('validateAdminEditable (golden WU)', () => {
  it('accepts a primary background triplet and rejects derived names', () => {
    expect(validateAdminEditable('--background', '255 255 255').ok).toBe(true);
    expect(validateAdminEditable('--background-subtle', '250 250 250').ok).toBe(false);
  });
});
