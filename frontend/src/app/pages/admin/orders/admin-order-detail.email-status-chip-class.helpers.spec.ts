import { AdminOrderDetailComponent } from './admin-order-detail.component';

/** Golden WU orders-email-status-chip-class — emailStatusChipClass. */
describe('AdminOrderDetailComponent emailStatusChipClass (golden WU)', () => {
  function bare(): AdminOrderDetailComponent {
    return Object.create(AdminOrderDetailComponent.prototype) as AdminOrderDetailComponent;
  }

  it('styles sent/failed/default chip classes', () => {
    const cmp = bare();
    expect(cmp.emailStatusChipClass('sent')).toContain('emerald');
    expect(cmp.emailStatusChipClass('FAILED')).toContain('rose');
    expect(cmp.emailStatusChipClass('queued')).toContain('slate');
    expect(cmp.emailStatusChipClass('')).toContain('slate');
  });
});
