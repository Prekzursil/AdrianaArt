import { AccountProfileComponent } from './account-profile.component';

/** Golden WU account-profile-avatar-crop-transform -- avatarCropTransform. */
describe('AccountProfileComponent avatarCropTransform (golden WU)', () => {
  it('clamps zoom into a translate/scale transform', () => {
    const cmp = Object.create(AccountProfileComponent.prototype) as AccountProfileComponent;
    (cmp as any).avatarCropZoom = 2;
    expect(cmp.avatarCropTransform).toBe('translate(-50%, -50%) scale(2)');
    (cmp as any).avatarCropZoom = 99;
    expect(cmp.avatarCropTransform).toBe('translate(-50%, -50%) scale(3)');
    (cmp as any).avatarCropZoom = Number.NaN;
    expect(cmp.avatarCropTransform).toBe('translate(-50%, -50%) scale(1)');
  });
});
