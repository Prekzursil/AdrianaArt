import { AdminComponent } from './admin.component';

/** Golden WU — categoryWizardDescriptionKey from step metadata. */
describe('AdminComponent categoryWizardDescriptionKey (golden WU)', () => {
  function bare(step: number, steps: Array<{ descriptionKey?: string }>): AdminComponent {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    (cmp as any).categoryWizardStep = () => step;
    (cmp as any).categoryWizardSteps = steps;
    return cmp;
  }

  it('returns step descriptionKey or basics fallback', () => {
    expect(
      bare(1, [{ descriptionKey: 'a' }, { descriptionKey: 'adminUi.categories.wizard.desc.media' }])
        .categoryWizardDescriptionKey(),
    ).toBe('adminUi.categories.wizard.desc.media');
    expect(bare(0, []).categoryWizardDescriptionKey()).toBe(
      'adminUi.categories.wizard.desc.basics',
    );
  });
});
