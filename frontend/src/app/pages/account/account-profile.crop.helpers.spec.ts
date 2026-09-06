import { AccountProfileComponent } from './account-profile.component';

/** Golden WU account-profile-crop-helpers. */
describe('AccountProfileComponent avatar crop helpers (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): AccountProfileComponent {
    const cmp = Object.create(AccountProfileComponent.prototype) as AccountProfileComponent;
    Object.assign(cmp as any, {
      account: { avatarBusy: false },
      avatarCropOpen: true,
      avatarCropZoom: 2,
      avatarImage: {},
      avatarCropErrorKey: 'err',
      avatarCropUrl: 'blob:x',
      ...overrides,
    });
    spyOn(URL, 'revokeObjectURL');
    return cmp;
  }

  it('resetAvatarCrop clears crop state and revokes url', () => {
    const cmp = bare();
    (AccountProfileComponent.prototype as any).resetAvatarCrop.call(cmp);
    expect((cmp as any).avatarCropOpen).toBe(false);
    expect((cmp as any).avatarCropZoom).toBe(1);
    expect((cmp as any).avatarImage).toBeNull();
    expect((cmp as any).avatarCropUrl).toBeNull();
    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:x');
  });

  it('cancelAvatarCrop no-ops when busy', () => {
    const cmp = bare({ account: { avatarBusy: true } });
    cmp.cancelAvatarCrop();
    expect((cmp as any).avatarCropOpen).toBe(true);
  });

  it('cancelAvatarCrop resets when idle', () => {
    const cmp = bare();
    cmp.cancelAvatarCrop();
    expect((cmp as any).avatarCropOpen).toBe(false);
  });
});
