import { signal } from '@angular/core';
import { AdminProductsComponent } from './admin-products.component';

/** Golden WU products-saved-status — savedStatus. */
describe('AdminProductsComponent savedStatus (golden WU)', () => {
  function bare(saved: any, formStatus: string): AdminProductsComponent {
    const cmp = Object.create(AdminProductsComponent.prototype) as AdminProductsComponent;
    Object.assign(cmp as any, {
      lastSavedState: signal(saved),
      form: { status: formStatus },
    });
    return cmp;
  }

  it('prefers lastSavedState status then form.status', () => {
    expect(bare({ status: 'draft', isActive: true }, 'published').savedStatus()).toBe('draft');
    expect(bare(null, 'published').savedStatus()).toBe('published');
  });
});
