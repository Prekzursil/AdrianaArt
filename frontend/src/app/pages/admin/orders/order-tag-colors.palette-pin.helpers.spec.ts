import { TAG_COLOR_PALETTE } from './order-tag-colors';

/** Golden WU tag-color-palette-pin -- TAG_COLOR_PALETTE. */
describe('TAG_COLOR_PALETTE (golden WU)', () => {
  it('pins eight admin order tag colours', () => {
    expect(TAG_COLOR_PALETTE).toEqual([
      'slate',
      'indigo',
      'violet',
      'emerald',
      'amber',
      'rose',
      'sky',
      'teal',
    ]);
  });
});
