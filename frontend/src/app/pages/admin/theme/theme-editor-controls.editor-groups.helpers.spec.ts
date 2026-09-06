import { EDITOR_GROUPS } from './theme-editor-controls';

/** Golden WU editor-groups -- EDITOR_GROUPS. */
describe('EDITOR_GROUPS (golden WU)', () => {
  it('orders color / type / spacing groups', () => {
    expect(EDITOR_GROUPS.map((g) => g.key)).toEqual(['color', 'type', 'spacing']);
    expect(EDITOR_GROUPS[0].controls.every((c) => c.kind === 'color')).toBe(true);
    expect(EDITOR_GROUPS[0].controls.length).toBe(9);
  });
});
