import { AccountProfileComponent } from './account-profile.component';

/** Golden WU account-profile-on-avatar-file-change -- onAvatarFileChange. */
describe('AccountProfileComponent onAvatarFileChange (golden WU)', () => {
  it('returns early when no file selected', () => {
    const cmp = Object.create(AccountProfileComponent.prototype) as AccountProfileComponent;
    Object.assign(cmp as any, { resetAvatarCrop: jasmine.createSpy('reset') });
    const input = { files: null, value: 'x' } as any;
    cmp.onAvatarFileChange({ target: input } as any);
    expect(input.value).toBe('');
    expect((cmp as any).resetAvatarCrop).not.toHaveBeenCalled();
  });
});
