import { AdminComponent } from './admin.component';

/** Golden WU admin-category-wizard-can-next — categoryWizardCanNext. */
describe('AdminComponent categoryWizardCanNext (golden WU)', () => {
  function createCmp(opts: {
    open: boolean;
    step: number;
    stepsLen?: number;
    slug: string;
  }) {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    (cmp as any).categoryWizardOpen = () => opts.open;
    (cmp as any).categoryWizardStep = () => opts.step;
    (cmp as any).categoryWizardSteps = Array.from({ length: opts.stepsLen ?? 3 }, (_, i) => `s${i}`);
    (cmp as any).categoryWizardSlug = () => opts.slug;
    return cmp;
  }

  it('requires open wizard; last step always ok; else needs slug', () => {
    expect(createCmp({ open: false, step: 0, slug: 'x' }).categoryWizardCanNext()).toBe(false);
    expect(createCmp({ open: true, step: 2, slug: '' }).categoryWizardCanNext()).toBe(true);
    expect(createCmp({ open: true, step: 1, slug: '' }).categoryWizardCanNext()).toBe(false);
    expect(createCmp({ open: true, step: 1, slug: 'shoes' }).categoryWizardCanNext()).toBe(true);
  });
});
