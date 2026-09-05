import { ShopComponent } from './shop.component';

/** Golden WU shop-scroll-filters-sort — scrollToFilters/scrollToSort. */
describe('ShopComponent scroll helpers (golden WU)', () => {
  it('scrollToFilters no-ops when element missing', () => {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    spyOn(document, 'getElementById').and.returnValue(null);
    expect(() => cmp.scrollToFilters()).not.toThrow();
  });

  it('scrollToFilters scrolls element into view when present', () => {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    const el = { scrollIntoView: jasmine.createSpy('scrollIntoView') } as any;
    spyOn(document, 'getElementById').and.returnValue(el);
    cmp.scrollToFilters();
    expect(document.getElementById).toHaveBeenCalledWith('shop-filters');
    expect(el.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
  });

  it('scrollToSort scrolls actions and focuses sort select after delay', () => {
    const cmp = Object.create(ShopComponent.prototype) as ShopComponent;
    const select = { focus: jasmine.createSpy('focus') } as any;
    const actions = { scrollIntoView: jasmine.createSpy('scrollIntoView') } as any;
    spyOn(document, 'getElementById').and.callFake((id: string) => {
      if (id === 'shop-actions') return actions;
      if (id === 'shop-sort-select') return select;
      return null;
    });
    jasmine.clock().install();
    try {
      cmp.scrollToSort();
      expect(actions.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'start' });
      expect(select.focus).not.toHaveBeenCalled();
      jasmine.clock().tick(350);
      expect(select.focus).toHaveBeenCalled();
    } finally {
      jasmine.clock().uninstall();
    }
  });
});
