import { AdminComponent } from './admin.component';

/** Golden WU admin-category-wizard-description — categoryWizardDescriptionKey. */
describe('AdminComponent categoryWizardDescriptionKey (golden WU)', () => {
  function createCmp(step: number, steps: Array<{ descriptionKey?: string }>) {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    (cmp as any).categoryWizardStep = () => step;
    (cmp as any).categoryWizardSteps = steps;
    return cmp;
  }

  it('returns step descriptionKey or basics fallback', () => {
    const steps = [
      { descriptionKey: 'adminUi.categories.wizard.desc.basics' },
      { descriptionKey: 'adminUi.categories.wizard.desc.media' },
      {},
    ];
    expect(createCmp(0, steps).categoryWizardDescriptionKey()).toBe(
      'adminUi.categories.wizard.desc.basics',
    );
    expect(createCmp(1, steps).categoryWizardDescriptionKey()).toBe(
      'adminUi.categories.wizard.desc.media',
    );
    expect(createCmp(2, steps).categoryWizardDescriptionKey()).toBe(
      'adminUi.categories.wizard.desc.basics',
    );
    expect(createCmp(9, steps).categoryWizardDescriptionKey()).toBe(
      'adminUi.categories.wizard.desc.basics',
    );
  });
});
