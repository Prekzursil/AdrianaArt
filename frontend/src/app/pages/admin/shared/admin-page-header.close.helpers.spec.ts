import { AdminPageHeaderComponent } from './admin-page-header.component';

/** Golden WU admin-page-header-close-helpers. */
describe('AdminPageHeaderComponent closeDetailsMenu (golden WU)', () => {
  it('closeDetailsMenu closes closest details element', () => {
    const cmp = Object.create(AdminPageHeaderComponent.prototype) as AdminPageHeaderComponent;
    const details = { open: true } as HTMLDetailsElement;
    const target = { closest: () => details } as any;
    cmp.closeDetailsMenu({ target } as any);
    expect(details.open).toBe(false);
    cmp.closeDetailsMenu({ target: { closest: () => null } } as any);
  });
});
