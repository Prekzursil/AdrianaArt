import { ADMIN_EDITABLE_NAMES } from './token-registry';

/** Golden WU admin-editable-names-list -- ADMIN_EDITABLE_NAMES. */
describe('ADMIN_EDITABLE_NAMES (golden WU)', () => {
  it('includes --background and --font-body', () => {
    expect(ADMIN_EDITABLE_NAMES).toContain('--background');
    expect(ADMIN_EDITABLE_NAMES).toContain('--font-body');
  });
});
