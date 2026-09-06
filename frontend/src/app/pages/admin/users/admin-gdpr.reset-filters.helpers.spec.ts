import { AdminGdprComponent } from './admin-gdpr.component';

/** Golden WU gdpr-reset-filters -- resetFilters. */
describe('AdminGdprComponent resetFilters (golden WU)', () => {
  it('clears q/exportStatus and applies filters', () => {
    const cmp = Object.create(AdminGdprComponent.prototype) as AdminGdprComponent;
    Object.assign(cmp as any, {
      q: 'alice',
      exportStatus: 'pending',
      applyFilters: jasmine.createSpy('applyFilters'),
    });
    cmp.resetFilters();
    expect((cmp as any).q).toBe('');
    expect((cmp as any).exportStatus).toBe('all');
    expect((cmp as any).applyFilters).toHaveBeenCalled();
  });
});
