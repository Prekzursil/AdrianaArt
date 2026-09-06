import { CmsPageComponent } from './page.component';

/** Golden WU page-slug-from-key — slugFromKey. */
describe('CmsPageComponent slugFromKey (golden WU)', () => {
  it('strips page. prefix and trims; empty otherwise', () => {
    const cmp = Object.create(CmsPageComponent.prototype) as CmsPageComponent;
    expect((cmp as any).slugFromKey('  page.terms  ')).toBe('terms');
    expect((cmp as any).slugFromKey('terms')).toBe('');
    expect((cmp as any).slugFromKey('')).toBe('');
    expect((cmp as any).slugFromKey(null as any)).toBe('');
  });
});
