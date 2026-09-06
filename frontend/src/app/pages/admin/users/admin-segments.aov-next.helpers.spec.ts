import { AdminSegmentsComponent } from './admin-segments.component';

/** Golden WU admin-segments-aov-next -- aovNext. */
describe('AdminSegmentsComponent aovNext (golden WU)', () => {
  it('increments aov page and reloads', () => {
    const cmp = Object.create(AdminSegmentsComponent.prototype) as AdminSegmentsComponent;
    Object.assign(cmp as any, {
      aovPage: 3,
      loadAov: jasmine.createSpy('loadAov'),
    });
    cmp.aovNext();
    expect((cmp as any).aovPage).toBe(4);
    expect((cmp as any).loadAov).toHaveBeenCalled();
  });
});
