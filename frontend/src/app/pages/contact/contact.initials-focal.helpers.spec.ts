import { ContactComponent } from './contact.component';

describe('ContactComponent initials/focal/canEdit helpers (golden WU)', () => {
  function createCmp(overrides: Record<string, unknown> = {}) {
    const cmp = Object.create(ContactComponent.prototype) as ContactComponent;
    Object.assign(cmp as any, {
      storefrontAdminMode: { enabled: () => false },
      ...overrides,
    });
    return cmp;
  }

  it('initialsForLabel derives up to two letters', () => {
    const cmp = createCmp();
    expect(cmp.initialsForLabel('Ada Lovelace')).toMatch(/A/);
    expect(cmp.initialsForLabel('')).toBeTruthy();
  });

  it('focalPosition clamps defaults', () => {
    const cmp = createCmp();
    expect(cmp.focalPosition()).toBe('50% 50%');
    expect(cmp.focalPosition(-1, 200)).toBe('0% 100%');
  });

  it('canEditPage mirrors storefrontAdminMode', () => {
    expect(createCmp().canEditPage()).toBe(false);
    expect(createCmp({ storefrontAdminMode: { enabled: () => true } }).canEditPage()).toBe(true);
  });
});
