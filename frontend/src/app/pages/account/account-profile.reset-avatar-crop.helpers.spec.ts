import { AccountProfileComponent } from './account-profile.component';

describe('AccountProfileComponent resetAvatarCrop (golden WU)', () => {
  it('closes crop UI and revokes object URL when present', () => {
    const cmp = Object.create(AccountProfileComponent.prototype) as any;
    const revoked: string[] = [];
    const original = URL.revokeObjectURL;
    (URL as any).revokeObjectURL = (u: string) => revoked.push(u);
    try {
      cmp.avatarCropOpen = true;
      cmp.avatarCropZoom = 2;
      cmp.avatarImage = { width: 1 } as any;
      cmp.avatarCropErrorKey = 'err';
      cmp.avatarCropUrl = 'blob:test';
      cmp.resetAvatarCrop();
      expect(cmp.avatarCropOpen).toBe(false);
      expect(cmp.avatarCropZoom).toBe(1);
      expect(cmp.avatarImage).toBeNull();
      expect(cmp.avatarCropErrorKey).toBeNull();
      expect(cmp.avatarCropUrl).toBeNull();
      expect(revoked).toEqual(['blob:test']);
    } finally {
      URL.revokeObjectURL = original;
    }
  });
});
