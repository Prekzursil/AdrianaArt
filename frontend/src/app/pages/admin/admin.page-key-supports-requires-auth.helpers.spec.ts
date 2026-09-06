import { AdminComponent } from './admin.component';

/** Golden WU admin-page-key-supports-requires-auth — pageKeySupportsRequiresAuth. */
describe('AdminComponent pageKeySupportsRequiresAuth (golden WU)', () => {
  it('is true only for page.* keys', () => {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    expect(cmp.pageKeySupportsRequiresAuth('page.about')).toBe(true);
    expect(cmp.pageKeySupportsRequiresAuth('  page.contact  ')).toBe(true);
    expect(cmp.pageKeySupportsRequiresAuth('home.sections')).toBe(false);
    expect(cmp.pageKeySupportsRequiresAuth('')).toBe(false);
  });
});
