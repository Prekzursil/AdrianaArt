import { AboutComponent } from './about.component';

describe('AboutComponent focal/canEdit/editPage helpers (golden WU)', () => {
  function make(overrides: Record<string, unknown> = {}): any {
    const proto = Object.create(AboutComponent.prototype);
    Object.assign(
      proto,
      {
        storefrontAdminMode: { enabled: () => false },
        router: { navigate: jasmine.createSpy('navigate') },
      },
      overrides,
    );
    return proto;
  }

  describe('focalPosition', () => {
    it('defaults, clamps, and rounds percent coords', () => {
      expect(make().focalPosition()).toBe('50% 50%');
      expect(make().focalPosition(-5, 200)).toBe('0% 100%');
      expect(make().focalPosition(49.6, 10.4)).toBe('50% 10%');
    });
  });

  describe('canEditPage + editPage', () => {
    it('canEditPage mirrors admin mode', () => {
      expect(make({ storefrontAdminMode: { enabled: () => true } }).canEditPage()).toBe(true);
      expect(make({ storefrontAdminMode: { enabled: () => false } }).canEditPage()).toBe(false);
    });

    it('editPage navigates to admin content pages with about edit query', () => {
      const router = { navigate: jasmine.createSpy('navigate') };
      make({ router }).editPage();
      expect(router.navigate).toHaveBeenCalledWith(['/admin/content/pages'], {
        queryParams: { edit: 'about' },
      });
    });
  });
});
