import { AccountProfileComponent } from './account-profile.component';

describe('AccountProfileComponent cancelAvatarCrop (golden WU)', () => {
  it('returns early when avatarBusy; otherwise resets crop', () => {
    const cmp = Object.create(AccountProfileComponent.prototype) as AccountProfileComponent;
    const reset = jasmine.createSpy('resetAvatarCrop');
    (cmp as any).resetAvatarCrop = reset;
    (cmp as any).account = { avatarBusy: true };
    cmp.cancelAvatarCrop();
    expect(reset).not.toHaveBeenCalled();

    (cmp as any).account = { avatarBusy: false };
    cmp.cancelAvatarCrop();
    expect(reset).toHaveBeenCalled();
  });
});
