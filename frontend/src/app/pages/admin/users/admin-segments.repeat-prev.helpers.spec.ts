import { AdminSegmentsComponent } from './admin-segments.component';

/** Golden WU admin-segments-repeat-prev -- repeatPrev. */
describe('AdminSegmentsComponent repeatPrev (golden WU)', () => {
  it('decrements repeat page with a floor of 1', () => {
    const cmp = Object.create(AdminSegmentsComponent.prototype) as AdminSegmentsComponent;
    Object.assign(cmp as any, {
      repeatPage: 1,
      loadRepeat: jasmine.createSpy('loadRepeat'),
    });
    cmp.repeatPrev();
    expect((cmp as any).repeatPage).toBe(1);
    (cmp as any).repeatPage = 2;
    cmp.repeatPrev();
    expect((cmp as any).repeatPage).toBe(1);
    expect((cmp as any).loadRepeat).toHaveBeenCalledTimes(2);
  });
});
