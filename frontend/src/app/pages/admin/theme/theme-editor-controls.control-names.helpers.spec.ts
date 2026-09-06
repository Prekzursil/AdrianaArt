import { controlNames } from './theme-editor-controls';

/** Golden WU control-names -- controlNames. */
describe('controlNames (golden WU)', () => {
  it('flattens every editable token name the editor exposes', () => {
    const names = controlNames();
    expect(names).toContain('--accent');
    expect(names).toContain('--font-body');
    expect(names).toContain('--space-md');
    expect(new Set(names).size).toBe(names.length);
  });
});
