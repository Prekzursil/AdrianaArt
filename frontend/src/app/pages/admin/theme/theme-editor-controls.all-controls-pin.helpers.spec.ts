import { ALL_CONTROLS, EDITOR_GROUPS } from './theme-editor-controls';

/** Golden WU all-controls-pin -- ALL_CONTROLS. */
describe('ALL_CONTROLS (golden WU)', () => {
  it('flattens every EDITOR_GROUPS control in render order', () => {
    const expected = EDITOR_GROUPS.flatMap((g) => g.controls);
    expect(ALL_CONTROLS).toEqual(expected);
    expect(ALL_CONTROLS.length).toBe(17);
  });
});
