import { CustomerTimelineComponent } from './customer-timeline.component';

/** Golden WU — showOpsShortcut visibility gate. */
describe('CustomerTimelineComponent showOpsShortcut (golden WU)', () => {
  function bare(): CustomerTimelineComponent {
    return Object.create(CustomerTimelineComponent.prototype) as CustomerTimelineComponent;
  }

  it('requires ops access, email, and PII', () => {
    const cmp = bare();
    (cmp as any).auth = { canAccessAdminSection: (s: string) => s === 'ops' };
    (cmp as any).customerEmail = 'a@b.co';
    (cmp as any).includePii = true;
    expect(cmp.showOpsShortcut()).toBe(true);

    (cmp as any).includePii = false;
    expect(cmp.showOpsShortcut()).toBe(false);

    (cmp as any).includePii = true;
    (cmp as any).customerEmail = '  ';
    expect(cmp.showOpsShortcut()).toBe(false);

    (cmp as any).customerEmail = 'a@b.co';
    (cmp as any).auth = { canAccessAdminSection: () => false };
    expect(cmp.showOpsShortcut()).toBe(false);
  });
});
