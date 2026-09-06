import { validateAdminEditable } from './token-validation';

/** Golden WU validate-admin-editable — validateAdminEditable. */
describe('validateAdminEditable (golden WU)', () => {
  it('accepts editable primaries and rejects non-editable names', () => {
    expect(validateAdminEditable('--background', '255 255 255').ok).toBe(true);
    expect(validateAdminEditable('--accent', '79 70 229').ok).toBe(true);
    expect(validateAdminEditable('--not-editable', '255 255 255').ok).toBe(false);
  });
});
