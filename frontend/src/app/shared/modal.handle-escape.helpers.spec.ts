import { ModalComponent } from './modal.component';

/** Golden WU modal-handle-escape — handleEscape. */
describe('ModalComponent handleEscape (golden WU)', () => {
  it('closes only when open', () => {
    const cmp = Object.create(ModalComponent.prototype) as ModalComponent;
    const close = jasmine.createSpy('close');
    Object.assign(cmp as any, { open: false, close });
    cmp.handleEscape();
    expect(close).not.toHaveBeenCalled();
    Object.assign(cmp as any, { open: true });
    cmp.handleEscape();
    expect(close).toHaveBeenCalled();
  });
});
