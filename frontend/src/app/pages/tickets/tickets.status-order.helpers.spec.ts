import { DatePipe } from '@angular/common';
import { TicketsComponent } from './tickets.component';

/** Golden WU — tickets statusPillClass / orderKey / orderLabel. */
describe('TicketsComponent status/order helpers (golden WU)', () => {
  function bare(): TicketsComponent {
    return Object.create(TicketsComponent.prototype) as TicketsComponent;
  }

  it('statusPillClass maps resolved/triaged/default', () => {
    const cmp = bare();
    expect(cmp.statusPillClass('resolved')).toContain('emerald');
    expect(cmp.statusPillClass('triaged')).toContain('amber');
    expect(cmp.statusPillClass('open')).toContain('slate');
  });

  it('orderKey prefers reference_code then id', () => {
    const cmp = bare();
    expect(cmp.orderKey({ reference_code: ' R1 ', id: 'x' } as any)).toBe('R1');
    expect(cmp.orderKey({ id: ' id1 ' } as any)).toBe('id1');
    expect(cmp.orderKey({} as any)).toBe('');
  });

  it('orderLabel appends mediumDate stamp when created_at present', () => {
    const cmp = bare();
    const stamped = cmp.orderLabel({
      reference_code: 'R1',
      created_at: '2024-01-15T12:00:00Z',
    } as any);
    const expectedStamp = new DatePipe('en-US').transform(
      new Date('2024-01-15T12:00:00Z'),
      'mediumDate',
    );
    expect(stamped).toBe(`R1 · ${expectedStamp}`);
    expect(cmp.orderLabel({ reference_code: 'R2' } as any)).toBe('R2');
  });
});
