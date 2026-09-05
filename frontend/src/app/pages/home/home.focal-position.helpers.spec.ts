import { HomeComponent } from './home.component';

describe('HomeComponent focalPosition (golden WU)', () => {
  function createCmp() {
    return Object.create(HomeComponent.prototype) as HomeComponent;
  }

  it('defaults to 50% 50% and clamps to 0..100', () => {
    const cmp = createCmp();
    expect(cmp.focalPosition()).toBe('50% 50%');
    expect(cmp.focalPosition(-10, 150)).toBe('0% 100%');
    expect(cmp.focalPosition(33.4, 66.6)).toBe('33% 67%');
  });
});
