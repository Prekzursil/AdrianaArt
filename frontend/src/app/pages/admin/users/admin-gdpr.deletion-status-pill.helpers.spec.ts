import { AdminGdprComponent } from './admin-gdpr.component';

/** Golden WU gdpr-deletion-status-pill-helpers. */
describe('AdminGdprComponent deletionStatusPill (golden WU)', () => {
  function bare(): AdminGdprComponent {
    return Object.create(AdminGdprComponent.prototype) as AdminGdprComponent;
  }

  it('deletionStatusPill maps due/cooldown/default', () => {
    const cmp = bare();
    expect(cmp.deletionStatusPill('due')).toContain('rose');
    expect(cmp.deletionStatusPill('cooldown')).toContain('amber');
    expect(cmp.deletionStatusPill('other')).toContain('slate');
  });
});
