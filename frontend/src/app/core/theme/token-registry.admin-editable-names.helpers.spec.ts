import { ADMIN_EDITABLE_NAMES } from './token-registry';

/** Golden WU admin-editable-names -- ADMIN_EDITABLE_NAMES. */
describe('ADMIN_EDITABLE_NAMES (golden WU)', () => {
  it('pins primaries + fonts + size + five space anchors', () => {
    expect(ADMIN_EDITABLE_NAMES).toContain('--background');
    expect(ADMIN_EDITABLE_NAMES).toContain('--font-body');
    expect(ADMIN_EDITABLE_NAMES).toContain('--space-md');
    expect(ADMIN_EDITABLE_NAMES).not.toContain('--text-inverse');
    expect(ADMIN_EDITABLE_NAMES.length).toBe(17);
  });
});
