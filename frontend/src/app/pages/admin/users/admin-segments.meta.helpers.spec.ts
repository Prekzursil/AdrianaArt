import { AdminSegmentsComponent } from './admin-segments.component';

/** Golden WU segments-meta-helpers. */
describe('AdminSegmentsComponent meta helpers (golden WU)', () => {
  function bare(overrides: Record<string, unknown> = {}): AdminSegmentsComponent {
    const cmp = Object.create(AdminSegmentsComponent.prototype) as AdminSegmentsComponent;
    Object.assign(cmp as any, {
      repeatMeta: () => null,
      aovMeta: () => null,
      translate: {
        instant: jasmine
          .createSpy('instant')
          .and.callFake((k: string, m?: any) => `${k}:${JSON.stringify(m || {})}`),
      },
      ...overrides,
    });
    return cmp;
  }

  it('repeatMetaText / aovMetaText translate pagination or empty', () => {
    expect(bare().repeatMetaText()).toBe('');
    expect(bare().aovMetaText()).toBe('');
    expect(bare({ repeatMeta: () => ({ page: 1 }) }).repeatMetaText()).toContain(
      'adminUi.segments.pagination',
    );
    expect(bare({ aovMeta: () => ({ page: 2 }) }).aovMetaText()).toContain(
      'adminUi.segments.pagination',
    );
  });

  it('formatMoney renders finite RON amounts', () => {
    const cmp = bare();
    expect(cmp.formatMoney(12.5)).toBe('12.50 RON');
    expect(cmp.formatMoney('3')).toBe('3.00 RON');
    expect(cmp.formatMoney('nope')).toBe('0.00 RON');
  });
});
