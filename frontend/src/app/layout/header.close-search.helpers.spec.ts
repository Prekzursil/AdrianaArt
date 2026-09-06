import { HeaderComponent } from './header.component';

/** Golden WU header-close-search — closeSearch. */
describe('HeaderComponent closeSearch (golden WU)', () => {
  it('sets searchOpen false', () => {
    const cmp = Object.create(HeaderComponent.prototype) as HeaderComponent;
    Object.assign(cmp as any, { searchOpen: true });
    cmp.closeSearch();
    expect((cmp as any).searchOpen).toBe(false);
  });
});
