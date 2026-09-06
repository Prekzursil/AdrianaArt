import { ModalComponent } from './modal.component';

/** Golden WU modal-effective-confirm-disabled — effectiveConfirmDisabled. */
describe('ModalComponent effectiveConfirmDisabled (golden WU)', () => {
  function bare(opts: {
    confirmDisabled?: boolean;
    requireScrollToConfirm?: boolean;
    scrollGateReady?: boolean;
  }): ModalComponent {
    const cmp = Object.create(ModalComponent.prototype) as ModalComponent;
    Object.assign(cmp as any, {
      confirmDisabled: Boolean(opts.confirmDisabled),
      requireScrollToConfirm: Boolean(opts.requireScrollToConfirm),
      scrollGateReady: Boolean(opts.scrollGateReady),
    });
    return cmp;
  }

  it('honors confirmDisabled and scroll gate', () => {
    expect(bare({ confirmDisabled: true }).effectiveConfirmDisabled()).toBe(true);
    expect(bare({ requireScrollToConfirm: false }).effectiveConfirmDisabled()).toBe(false);
    expect(
      bare({ requireScrollToConfirm: true, scrollGateReady: false }).effectiveConfirmDisabled(),
    ).toBe(true);
    expect(
      bare({ requireScrollToConfirm: true, scrollGateReady: true }).effectiveConfirmDisabled(),
    ).toBe(false);
  });
});
