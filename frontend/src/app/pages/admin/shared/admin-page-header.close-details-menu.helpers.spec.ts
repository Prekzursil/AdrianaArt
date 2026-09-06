import { AdminPageHeaderComponent } from './admin-page-header.component';

/** Golden WU admin-page-header-close-details-menu — closeDetailsMenu. */
describe('AdminPageHeaderComponent closeDetailsMenu (golden WU)', () => {
  it('closes nearest details element when present', () => {
    const cmp = Object.create(AdminPageHeaderComponent.prototype) as AdminPageHeaderComponent;
    const details = { open: true } as HTMLDetailsElement;
    const withDetails = {
      target: { closest: () => details },
    } as unknown as MouseEvent;
    cmp.closeDetailsMenu(withDetails);
    expect(details.open).toBe(false);
    const without = {
      target: { closest: () => null },
    } as unknown as MouseEvent;
    cmp.closeDetailsMenu(without);
    expect(details.open).toBe(false);
  });
});
