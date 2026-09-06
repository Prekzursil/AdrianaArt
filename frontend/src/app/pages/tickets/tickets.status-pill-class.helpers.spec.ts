import { TicketsComponent } from './tickets.component';

/** Golden WU tickets-status-pill-class — statusPillClass. */
describe('TicketsComponent statusPillClass (golden WU)', () => {
  function bare(): TicketsComponent {
    return Object.create(TicketsComponent.prototype) as TicketsComponent;
  }

  it('maps resolved/triaged/default statuses to pill classes', () => {
    const cmp = bare();
    expect(cmp.statusPillClass('resolved')).toContain('emerald');
    expect(cmp.statusPillClass('triaged')).toContain('amber');
    expect(cmp.statusPillClass('open')).toContain('slate');
  });
});
