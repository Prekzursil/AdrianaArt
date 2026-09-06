import { TicketsComponent } from './tickets.component';

/** Golden WU tickets-order-key — orderKey / orderLabel. */
describe('TicketsComponent orderKey / orderLabel (golden WU)', () => {
  function createCmp() {
    return Object.create(TicketsComponent.prototype) as TicketsComponent;
  }

  it('orderKey prefers reference_code then id and trims', () => {
    const cmp = createCmp();
    expect(cmp.orderKey({ reference_code: '  REF-1  ', id: 'id-1' } as never)).toBe('REF-1');
    expect(cmp.orderKey({ reference_code: '', id: ' id-2 ' } as never)).toBe('id-2');
    expect(cmp.orderKey({ reference_code: null, id: null } as never)).toBe('');
  });

  it('orderLabel appends mediumDate stamp when created_at present', () => {
    const cmp = createCmp();
    expect(cmp.orderLabel({ reference_code: 'R1', id: 'x', created_at: null } as never)).toBe('R1');
    const labeled = cmp.orderLabel({
      reference_code: 'R2',
      id: 'y',
      created_at: '2026-01-15T12:00:00.000Z',
    } as never);
    expect(labeled.startsWith('R2 · ')).toBe(true);
  });
});
