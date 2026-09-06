import { readPreviewToken } from './theme-preview-source';

/** Golden WU read-preview-token -- readPreviewToken. */
describe('readPreviewToken (golden WU)', () => {
  it('reads theme_preview query; blank/absent -> null', () => {
    expect(readPreviewToken('/shop?theme_preview=abc')).toBe('abc');
    expect(readPreviewToken('/shop?theme_preview=%20')).toBeNull();
    expect(readPreviewToken('/shop')).toBeNull();
  });
});
