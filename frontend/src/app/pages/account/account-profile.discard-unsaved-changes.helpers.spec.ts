import { AccountProfileComponent } from './account-profile.component';

describe('AccountProfileComponent discardUnsavedChanges (golden WU)', () => {
  it('delegates to account.discardProfileChanges', () => {
    const cmp = Object.create(AccountProfileComponent.prototype) as any;
    let called = 0;
    cmp.account = { discardProfileChanges: () => { called += 1; } };
    cmp.discardUnsavedChanges();
    expect(called).toBe(1);
  });
});
