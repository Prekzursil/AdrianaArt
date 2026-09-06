import { STYLE_ELEMENT_ID } from './theme-head';

/** Golden WU style-element-id -- STYLE_ELEMENT_ID. */
describe('STYLE_ELEMENT_ID (golden WU)', () => {
  it('is the stable ms-theme style id', () => {
    expect(STYLE_ELEMENT_ID).toBe('ms-theme');
  });
});
