import { buildThemeCss } from './theme-head';

/** Golden WU build-theme-css -- buildThemeCss. */
describe('buildThemeCss (golden WU)', () => {
  it('emits sorted :root declarations', () => {
    const css = buildThemeCss({ '--z': '1', '--a': '2' });
    expect(css).toBe(':root{--a: 2;--z: 1;}');
    expect(buildThemeCss({})).toBe(':root{}');
  });
});
