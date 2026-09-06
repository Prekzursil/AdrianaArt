import { AccountProfileComponent } from './account-profile.component';

/** Golden WU account-profile-avatar-crop-helpers. */
describe('AccountProfileComponent avatar crop helpers (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): AccountProfileComponent {
    const cmp = Object.create(AccountProfileComponent.prototype) as AccountProfileComponent;
    Object.assign(cmp as any, {
      avatarCropUrl: null,
      avatarImage: null,
      avatarCropErrorKey: null,
      avatarCropZoom: 1,
      ...overrides,
    });
    return cmp;
  }

  it('avatarCropReady requires url+image and no error', () => {
    expect(bare().avatarCropReady).toBe(false);
    expect(
      bare({ avatarCropUrl: 'blob:x', avatarImage: {} as any, avatarCropErrorKey: null })
        .avatarCropReady,
    ).toBe(true);
    expect(
      bare({
        avatarCropUrl: 'blob:x',
        avatarImage: {} as any,
        avatarCropErrorKey: 'account.profile.avatar.crop.errors.previewLoad',
      }).avatarCropReady,
    ).toBe(false);
  });

  it('avatarCropTransform clamps zoom into translate/scale CSS', () => {
    expect(bare({ avatarCropZoom: 1 }).avatarCropTransform).toBe(
      'translate(-50%, -50%) scale(1)',
    );
    expect(bare({ avatarCropZoom: 2.5 }).avatarCropTransform).toBe(
      'translate(-50%, -50%) scale(2.5)',
    );
    expect(bare({ avatarCropZoom: 0.2 }).avatarCropTransform).toBe(
      'translate(-50%, -50%) scale(1)',
    );
    expect(bare({ avatarCropZoom: 9 }).avatarCropTransform).toBe(
      'translate(-50%, -50%) scale(3)',
    );
    expect(bare({ avatarCropZoom: Number.NaN }).avatarCropTransform).toBe(
      'translate(-50%, -50%) scale(1)',
    );
  });
});
