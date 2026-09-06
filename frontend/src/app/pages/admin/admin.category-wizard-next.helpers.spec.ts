import { AdminComponent } from './admin.component';

/** Golden WU admin-category-wizard-next — categoryWizardNextLabelKey. */
describe('AdminComponent categoryWizardNextLabelKey (golden WU)', () => {
  function createCmp(step: number, stepsLen = 3) {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    (cmp as any).categoryWizardStep = () => step;
    (cmp as any).categoryWizardSteps = Array.from({ length: stepsLen }, (_, i) => `s${i}`);
    return cmp;
  }

  it('returns done on last step else next', () => {
    expect(createCmp(2, 3).categoryWizardNextLabelKey()).toBe('adminUi.actions.done');
    expect(createCmp(1, 3).categoryWizardNextLabelKey()).toBe('adminUi.actions.next');
    expect(createCmp(0, 3).categoryWizardNextLabelKey()).toBe('adminUi.actions.next');
  });
});
