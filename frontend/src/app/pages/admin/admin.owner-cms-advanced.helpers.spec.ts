import { AdminComponent } from './admin.component';

/** Golden WU admin-owner-cms-advanced — isOwner / cmsAdvanced. */
describe('AdminComponent isOwner / cmsAdvanced (golden WU)', () => {
  function createCmp(role: string, mode: string) {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    (cmp as any).auth = { role: () => role };
    (cmp as any).cmsPrefs = { mode: () => mode };
    return cmp;
  }

  it('isOwner is true only for owner role', () => {
    expect(createCmp('owner', 'basic').isOwner()).toBe(true);
    expect(createCmp('admin', 'basic').isOwner()).toBe(false);
  });

  it('cmsAdvanced is true only in advanced mode', () => {
    expect(createCmp('owner', 'advanced').cmsAdvanced()).toBe(true);
    expect(createCmp('owner', 'basic').cmsAdvanced()).toBe(false);
  });
});
