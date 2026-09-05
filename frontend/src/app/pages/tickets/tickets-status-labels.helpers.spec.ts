import { TicketsComponent } from './tickets.component';

describe('TicketsComponent order + status helpers (golden WU)', () => {
  function make(): any {
    return Object.create(TicketsComponent.prototype);
  }

  describe('orderKey', () => {
    it('prefers reference_code then id', () => {
      const c = make();
      expect(c.orderKey({ reference_code: ' REF1 ', id: 'uuid' })).toBe('REF1');
      expect(c.orderKey({ reference_code: '', id: ' uuid-2 ' })).toBe('uuid-2');
      expect(c.orderKey({} as any)).toBe('');
    });
  });

  describe('orderLabel', () => {
    it('returns key alone without created_at', () => {
      expect(make().orderLabel({ reference_code: 'R1' })).toBe('R1');
    });

    it('appends mediumDate stamp when created_at present', () => {
      const label = make().orderLabel({
        reference_code: 'R2',
        created_at: '2024-06-15T12:00:00Z',
      });
      expect(label.startsWith('R2 · ')).toBe(true);
      expect(label.length).toBeGreaterThan(5);
    });
  });

  describe('statusPillClass', () => {
    it('maps resolved/triaged and defaults otherwise', () => {
      const c = make();
      expect(c.statusPillClass('resolved')).toContain('emerald');
      expect(c.statusPillClass('triaged')).toContain('amber');
      expect(c.statusPillClass('open')).toContain('slate');
      expect(c.statusPillClass('other')).toContain('slate');
    });
  });
});
