import { colorControlNames } from './theme-editor-controls';

/** Golden WU color-control-names-list -- colorControlNames. */
describe('colorControlNames (golden WU)', () => {
  it('returns only colour controls from the editor', () => {
    const names = colorControlNames();
    expect(names).toContain('--background');
    expect(names).toContain('--accent');
    expect(names).not.toContain('--font-body');
    expect(names.length).toBe(9);
  });
});
