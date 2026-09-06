import { CmsBlockLibraryComponent } from './cms-block-library.component';

/** Golden WU cms-block-library-on-drag-start -- onDragStart. */
describe('CmsBlockLibraryComponent onDragStart (golden WU)', () => {
  it('writes drag payload and emits dragActive true', () => {
    const cmp = Object.create(
      CmsBlockLibraryComponent.prototype,
    ) as CmsBlockLibraryComponent;
    const setData = jasmine.createSpy('setData');
    const dataTransfer = { setData, effectAllowed: 'none' } as any;
    Object.assign(cmp as any, {
      context: 'home',
      template: jasmine.createSpy('template').and.returnValue('blank'),
      dragActive: { emit: jasmine.createSpy('emit') },
    });
    cmp.onDragStart({ dataTransfer } as any, 'hero' as any);
    expect(setData).toHaveBeenCalled();
    expect(dataTransfer.effectAllowed).toBe('copy');
    expect((cmp as any).dragActive.emit).toHaveBeenCalledWith(true);
  });
});
