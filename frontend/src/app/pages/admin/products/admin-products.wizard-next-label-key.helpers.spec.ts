import { signal } from '@angular/core';
import { AdminProductsComponent } from './admin-products.component';

/** Golden WU products-wizard-next-label-key — wizardNextLabelKey. */
describe('AdminProductsComponent wizardNextLabelKey (golden WU)', () => {
  function bare(step: number, steps: string[]): AdminProductsComponent {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    Object.assign(cmp as any, {
      wizardStep: signal(step),
      wizardSteps: signal(steps),
    });
    return cmp;
  }

  it('returns next/done based on wizard position', () => {
    expect(bare(0, []).wizardNextLabelKey()).toBe('adminUi.actions.next');
    expect(bare(0, ['a', 'b']).wizardNextLabelKey()).toBe('adminUi.actions.next');
    expect(bare(1, ['a', 'b']).wizardNextLabelKey()).toBe('adminUi.actions.done');
  });
});
