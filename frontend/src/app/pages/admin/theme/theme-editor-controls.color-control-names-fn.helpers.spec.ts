import { colorControlNames } from './theme-editor-controls';

/** Golden WU color-control-names-fn -- colorControlNames. */
describe('colorControlNames (golden WU)', () => {
  it('returns the nine primary colour controls only', () => {
    const names = colorControlNames();
    expect(names.length).toBe(9);
    expect(names).toContain('--accent');
    expect(names).not.toContain('--font-body');
  });
});
