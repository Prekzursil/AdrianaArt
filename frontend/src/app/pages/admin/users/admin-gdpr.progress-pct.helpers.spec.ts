import { AdminGdprComponent } from './admin-gdpr.component';

/** Golden WU — progressPct clamps export job progress. */
describe('AdminGdprComponent progressPct (golden WU)', () => {
  function bare(): AdminGdprComponent {
    return Object.create(AdminGdprComponent.prototype) as AdminGdprComponent;
  }

  it('clamps finite progress into 0..100', () => {
    const cmp = bare();
    expect(cmp.progressPct({ progress: 42 } as any)).toBe(42);
    expect(cmp.progressPct({ progress: -5 } as any)).toBe(0);
    expect(cmp.progressPct({ progress: 150 } as any)).toBe(100);
    expect(cmp.progressPct({ progress: Number.NaN } as any)).toBe(0);
    expect(cmp.progressPct({} as any)).toBe(0);
  });
});
