import { AdminComponent } from './admin.component';
import * as identity from '../../shared/user-identity';

/** Golden WU admin-user-identity — userIdentity. */
describe('AdminComponent userIdentity (golden WU)', () => {
  it('formats identity with email fallback', () => {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    const spy = spyOn(identity, 'formatIdentity').and.returnValue('ID');
    const user = { email: 'a@b.c', username: 'ada' } as any;
    expect(cmp.userIdentity(user)).toBe('ID');
    expect(spy).toHaveBeenCalledWith(user, 'a@b.c');
  });
});
