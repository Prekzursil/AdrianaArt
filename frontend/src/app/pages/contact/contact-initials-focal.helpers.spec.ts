import { ContactComponent } from './contact.component';

describe('ContactComponent initials/focal/canEdit helpers (golden WU)', () => {
  function make(overrides: Record<string, unknown> = {}): any {
    const proto = Object.create(ContactComponent.prototype);
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

  describe('initialsForLabel', () => {
    it('returns MS for blank labels', () => {
      expect(make().initialsForLabel('')).toBe('MS');
      expect(make().initialsForLabel('   ')).toBe('MS');
    });

    it('uses first+second word initials or first two letters', () => {
      expect(make().initialsForLabel('Moment Studio')).toBe('MS');
      expect(make().initialsForLabel('Ada')).toBe('AD');
      expect(make().initialsForLabel('x')).toBe('XS');
    });
  });

  describe('focalPosition', () => {
    it('defaults to 50% 50% and clamps/rounds', () => {
      expect(make().focalPosition()).toBe('50% 50%');
      expect(make().focalPosition(-10, 150)).toBe('0% 100%');
      expect(make().focalPosition(12.6, 3.2)).toBe('13% 3%');
    });
  });

  describe('canEditPage', () => {
    it('mirrors storefrontAdminMode.enabled', () => {
      expect(make({ storefrontAdminMode: { enabled: () => false } }).canEditPage()).toBe(false);
      expect(make({ storefrontAdminMode: { enabled: () => true } }).canEditPage()).toBe(true);
    });
  });
});
