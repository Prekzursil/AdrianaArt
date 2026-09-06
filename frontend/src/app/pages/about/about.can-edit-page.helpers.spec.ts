import { AboutComponent } from './about.component';

/** Golden WU about-can-edit-page — canEditPage. */
describe('AboutComponent canEditPage (golden WU)', () => {
  it('mirrors storefrontAdminMode.enabled()', () => {
    const cmp = Object.create(AboutComponent.prototype) as AboutComponent;
    Object.assign(cmp as any, {
      storefrontAdminMode: { enabled: () => true },
    });
    expect(cmp.canEditPage()).toBe(true);
    Object.assign(cmp as any, {
      storefrontAdminMode: { enabled: () => false },
    });
    expect(cmp.canEditPage()).toBe(false);
  });
});
