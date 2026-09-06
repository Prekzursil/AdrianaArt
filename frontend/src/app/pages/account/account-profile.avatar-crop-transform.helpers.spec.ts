import { AccountProfileComponent } from './account-profile.component';

/** Golden WU profile-avatar-crop-transform — avatarCropTransform. */
describe('AccountProfileComponent avatarCropTransform (golden WU)', () => {
  function bare(zoom: unknown): AccountProfileComponent {
    const cmp = Object.create(AccountProfileComponent.prototype) as AccountProfileComponent;
    Object.assign(cmp as any, { avatarCropZoom: zoom });
    return cmp;
  }

  it('clamps zoom between 1 and 3', () => {
    expect(bare(2).avatarCropTransform).toBe('translate(-50%, -50%) scale(2)');
    expect(bare(0.5).avatarCropTransform).toBe('translate(-50%, -50%) scale(1)');
    expect(bare(9).avatarCropTransform).toBe('translate(-50%, -50%) scale(3)');
    expect(bare('x').avatarCropTransform).toBe('translate(-50%, -50%) scale(1)');
  });
});
