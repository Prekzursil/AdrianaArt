import { AdminGdprComponent } from './admin-gdpr.component';

/** Golden WU — deletionStatusPill for GDPR deletion requests. */
describe('AdminGdprComponent deletionStatusPill (golden WU)', () => {
  function bare(): AdminGdprComponent {
    return Object.create(AdminGdprComponent.prototype) as AdminGdprComponent;
  }

  it('maps due/cooldown and falls back', () => {
    const cmp = bare();
    expect(cmp.deletionStatusPill('due')).toContain('rose');
    expect(cmp.deletionStatusPill('cooldown')).toContain('amber');
    expect(cmp.deletionStatusPill('other')).toContain('slate');
  });
});
