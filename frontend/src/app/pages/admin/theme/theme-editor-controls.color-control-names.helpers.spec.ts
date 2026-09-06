import { colorControlNames } from './theme-editor-controls';

/** Golden WU color-control-names -- colorControlNames. */
describe('colorControlNames (golden WU)', () => {
  it('returns only colour token names from the editor model', () => {
    const names = colorControlNames();
    expect(names).toContain('--accent');
    expect(names).toContain('--background');
    expect(names).not.toContain('--font-body');
    expect(names).not.toContain('--space-md');
  });
});
