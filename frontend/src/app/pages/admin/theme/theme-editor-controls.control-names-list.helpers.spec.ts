import { controlNames } from './theme-editor-controls';

/** Golden WU control-names-list -- controlNames. */
describe('controlNames (golden WU)', () => {
  it('exposes the flat editable control name set', () => {
    const names = controlNames();
    expect(names).toContain('--background');
    expect(names).toContain('--font-body');
    expect(names).toContain('--space-md');
    expect(names.length).toBe(17);
  });
});
