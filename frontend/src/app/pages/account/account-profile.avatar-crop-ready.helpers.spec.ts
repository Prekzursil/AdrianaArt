import { AccountProfileComponent } from './account-profile.component';

/** Golden WU profile-avatar-crop-ready — avatarCropReady. */
describe('AccountProfileComponent avatarCropReady (golden WU)', () => {
  function bare(url: string | null, image: object | null, err: string | null): AccountProfileComponent {
    const cmp = Object.create(AccountProfileComponent.prototype) as AccountProfileComponent;
    Object.assign(cmp as any, {
      avatarCropUrl: url,
      avatarImage: image,
      avatarCropErrorKey: err,
    });
    return cmp;
  }

  it('requires url image and no error key', () => {
    expect(bare('blob:x', {}, null).avatarCropReady).toBe(true);
    expect(bare(null, {}, null).avatarCropReady).toBe(false);
    expect(bare('blob:x', null, null).avatarCropReady).toBe(false);
    expect(bare('blob:x', {}, 'err').avatarCropReady).toBe(false);
  });
});
