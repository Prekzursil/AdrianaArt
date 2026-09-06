import { AdminComponent } from './admin.component';

/** Golden WU — pagePublicPath for CMS page slugs. */
describe('AdminComponent pagePublicPath (golden WU)', () => {
  function bare(): AdminComponent {
    return Object.create(AdminComponent.prototype) as AdminComponent;
  }

  it('maps special slugs and falls back', () => {
    const cmp = bare();
    expect(cmp.pagePublicPath('')).toBe('/pages');
    expect(cmp.pagePublicPath('  ')).toBe('/pages');
    expect(cmp.pagePublicPath('about')).toBe('/about');
    expect(cmp.pagePublicPath('contact')).toBe('/contact');
    expect(cmp.pagePublicPath('faq')).toBe('/pages/faq');
  });
});
