import { AdminGdprComponent } from './admin-gdpr.component';

/** Golden WU — executeDeletionConfirmDisabled gate. */
describe('AdminGdprComponent executeDeletionConfirmDisabled (golden WU)', () => {
  function bare(): AdminGdprComponent {
    return Object.create(AdminGdprComponent.prototype) as AdminGdprComponent;
  }

  it('disables when busy or password blank', () => {
    const cmp = bare();
    (cmp as any).deletionBusyUserId = () => 'u1';
    (cmp as any).executeDeletionPassword = 'secret';
    expect(cmp.executeDeletionConfirmDisabled()).toBe(true);

    (cmp as any).deletionBusyUserId = () => null;
    (cmp as any).executeDeletionPassword = '   ';
    expect(cmp.executeDeletionConfirmDisabled()).toBe(true);

    (cmp as any).executeDeletionPassword = 'ok';
    expect(cmp.executeDeletionConfirmDisabled()).toBe(false);
  });
});
