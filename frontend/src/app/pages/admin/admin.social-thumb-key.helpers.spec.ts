import { AdminComponent } from './admin.component';

/** Golden WU — socialThumbKey composite id. */
describe('AdminComponent socialThumbKey (golden WU)', () => {
  function bare(): AdminComponent {
    return Object.create(AdminComponent.prototype) as AdminComponent;
  }

  it('joins platform and index', () => {
    const cmp = bare();
    expect(cmp.socialThumbKey('instagram', 0)).toBe('instagram-0');
    expect(cmp.socialThumbKey('facebook', 3)).toBe('facebook-3');
  });
});
