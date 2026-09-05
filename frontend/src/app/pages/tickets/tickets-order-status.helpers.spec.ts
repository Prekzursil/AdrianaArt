import { TicketsComponent } from './tickets.component';
import type { Order } from '../../core/account.service';

describe('TicketsComponent orderKey/orderLabel/statusPillClass (golden WU)', () => {
  function createCmp(): TicketsComponent {
    return Object.create(TicketsComponent.prototype) as TicketsComponent;
  }

  function order(overrides: Partial<Order> = {}): Order {
    return {
      id: 'oid-1',
      reference_code: 'MS-100',
      created_at: '2026-01-15T12:00:00.000Z',
      ...overrides,
    } as Order;
  }

  it('orderKey prefers reference_code then id and trims', () => {
    const cmp = createCmp();
    expect(cmp.orderKey(order({ reference_code: ' ABC ', id: 'x' }))).toBe('ABC');
    expect(cmp.orderKey(order({ reference_code: '', id: ' oid-2 ' }))).toBe('oid-2');
    expect(cmp.orderKey(order({ reference_code: '  ', id: '  ' }))).toBe('');
  });

  it('orderLabel joins key with mediumDate stamp when created_at present', () => {
    const cmp = createCmp();
    spyOn(cmp, 'orderKey').and.returnValue('MS-100');
    const withDate = cmp.orderLabel(order({ created_at: '2026-01-15T12:00:00.000Z' }));
    expect(withDate.startsWith('MS-100 · ')).toBeTrue();
    expect(withDate.length).toBeGreaterThan('MS-100 · '.length);

    (cmp.orderKey as jasmine.Spy).and.returnValue('ONLY');
    expect(cmp.orderLabel(order({ created_at: '' as any }))).toBe('ONLY');
    expect(cmp.orderLabel(order({ created_at: undefined as any }))).toBe('ONLY');
  });

  it('statusPillClass maps resolved/triaged and defaults otherwise', () => {
    const cmp = createCmp();
    expect(cmp.statusPillClass('resolved')).toContain('emerald');
    expect(cmp.statusPillClass('triaged')).toContain('amber');
    expect(cmp.statusPillClass('open')).toContain('slate');
    expect(cmp.statusPillClass('other')).toContain('slate');
  });
});
