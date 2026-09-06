import { ALL_CONTROLS, EDITOR_GROUPS } from './theme-editor-controls';

/** Golden WU all-controls -- ALL_CONTROLS. */
describe('ALL_CONTROLS (golden WU)', () => {
  it('flattens every editor group in render order', () => {
    const expected = EDITOR_GROUPS.flatMap((g) => g.controls);
    expect(ALL_CONTROLS).toEqual(expected);
    expect(ALL_CONTROLS.length).toBe(17);
    expect(ALL_CONTROLS.map((c) => c.name)).toContain('--space-xl');
  });
});
