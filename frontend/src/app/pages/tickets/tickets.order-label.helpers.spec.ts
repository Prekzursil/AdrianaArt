import { TicketsComponent } from './tickets.component';

describe('TicketsComponent orderKey / orderLabel / statusPillClass (golden WU)', () => {
  function createCmp() {
    return Object.create(TicketsComponent.prototype) as TicketsComponent;
  }

  it('orderKey prefers reference_code then id', () => {
    const cmp = createCmp();
    expect(cmp.orderKey({ reference_code: ' R1 ', id: 'o1' } as any)).toBe('R1');
    expect(cmp.orderKey({ reference_code: '', id: 'o1' } as any)).toBe('o1');
    expect(cmp.orderKey({ reference_code: null, id: '' } as any)).toBe('');
  });

  it('orderLabel appends date when created_at present', () => {
    const cmp = createCmp();
    expect(cmp.orderLabel({ reference_code: 'R1', id: 'o1', created_at: null } as any)).toBe('R1');
    const withDate = cmp.orderLabel({
      reference_code: 'R1',
      id: 'o1',
      created_at: '2026-03-15T12:00:00Z',
    } as any);
    expect(withDate.startsWith('R1')).toBe(true);
    expect(withDate).toContain('·');
  });

  it('statusPillClass maps resolved/triaged/default', () => {
    const cmp = createCmp();
    expect(cmp.statusPillClass('resolved')).toContain('emerald');
    expect(cmp.statusPillClass('triaged')).toContain('amber');
    expect(cmp.statusPillClass('new')).toContain('slate');
  });
});
