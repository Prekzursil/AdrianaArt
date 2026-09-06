import { PREVIEW_TOKEN_PARAM } from './theme-preview-source';

/** Golden WU preview-token-param -- PREVIEW_TOKEN_PARAM. */
describe('PREVIEW_TOKEN_PARAM (golden WU)', () => {
  it('names the theme_preview query key', () => {
    expect(PREVIEW_TOKEN_PARAM).toBe('theme_preview');
  });
});
