import { TicketsComponent } from './tickets.component';

/** Golden WU tickets-status-pill — orderKey / orderLabel / statusPillClass. */
describe('TicketsComponent status-pill helpers (golden WU)', () => {
  function createCmp() {
    return Object.create(TicketsComponent.prototype) as TicketsComponent;
  }

  it('orderKey prefers reference_code then id', () => {
    const cmp = createCmp();
    expect(cmp.orderKey({ reference_code: ' REF ', id: '1' } as any)).toBe('REF');
    expect(cmp.orderKey({ reference_code: '', id: ' 42 ' } as any)).toBe('42');
    expect(cmp.orderKey({ reference_code: null, id: null } as any)).toBe('');
  });

  it('orderLabel appends mediumDate when created_at present', () => {
    const cmp = createCmp();
    expect(cmp.orderLabel({ reference_code: 'R1', id: '1' } as any)).toBe('R1');
    const labeled = cmp.orderLabel({
      reference_code: 'R1',
      id: '1',
      created_at: '2026-01-15T12:00:00Z',
    } as any);
    expect(labeled.startsWith('R1 · ')).toBe(true);
  });

  it('statusPillClass maps resolved/triaged/default', () => {
    const cmp = createCmp();
    expect(cmp.statusPillClass('resolved')).toContain('emerald');
    expect(cmp.statusPillClass('triaged')).toContain('amber');
    expect(cmp.statusPillClass('open')).toContain('slate');
  });
});
