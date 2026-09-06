import { AccountProfileComponent } from "./account-profile.component";

/** Golden WU account-profile-avatar-crop-ready — avatarCropReady. */
describe("AccountProfileComponent avatarCropReady (golden WU)", () => {
  it("true only with crop url + image and no error key", () => {
    const cmp = Object.create(AccountProfileComponent.prototype) as AccountProfileComponent;
    (cmp as any).avatarCropUrl = "blob:x";
    (cmp as any).avatarImage = {};
    (cmp as any).avatarCropErrorKey = null;
    expect(cmp.avatarCropReady).toBe(true);
    (cmp as any).avatarCropErrorKey = "too_small";
    expect(cmp.avatarCropReady).toBe(false);
    (cmp as any).avatarCropErrorKey = null;
    (cmp as any).avatarImage = null;
    expect(cmp.avatarCropReady).toBe(false);
  });
});
