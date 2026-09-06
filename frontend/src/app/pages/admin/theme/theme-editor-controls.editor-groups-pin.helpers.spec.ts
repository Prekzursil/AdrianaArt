import { EDITOR_GROUPS } from './theme-editor-controls';

/** Golden WU editor-groups-pin -- EDITOR_GROUPS. */
describe('EDITOR_GROUPS (golden WU)', () => {
  it('orders color, type, and spacing groups', () => {
    expect(EDITOR_GROUPS.map((g) => g.key)).toEqual(['color', 'type', 'spacing']);
    expect(EDITOR_GROUPS[0]?.controls.length).toBe(9);
  });
});
