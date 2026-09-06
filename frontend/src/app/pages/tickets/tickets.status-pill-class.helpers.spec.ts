import { TicketsComponent } from './tickets.component';

/** Golden WU tickets-status-pill-class-helpers. */
describe('TicketsComponent statusPillClass (golden WU)', () => {
  function bare(): TicketsComponent {
    return Object.create(TicketsComponent.prototype) as TicketsComponent;
  }

  it('statusPillClass maps resolved/triaged/default', () => {
    const cmp = bare();
    expect(cmp.statusPillClass('resolved')).toContain('emerald');
    expect(cmp.statusPillClass('triaged')).toContain('amber');
    expect(cmp.statusPillClass('open')).toContain('slate');
  });
});
