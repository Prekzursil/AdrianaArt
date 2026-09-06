import { AdminComponent } from './admin.component';

/** Golden WU — categoryWizardNextLabelKey done vs next. */
describe('AdminComponent categoryWizardNextLabelKey (golden WU)', () => {
  function bare(step: number, len: number): AdminComponent {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    (cmp as any).categoryWizardStep = () => step;
    (cmp as any).categoryWizardSteps = Array.from({ length: len });
    return cmp;
  }

  it('returns done on last step else next', () => {
    expect(bare(2, 3).categoryWizardNextLabelKey()).toBe('adminUi.actions.done');
    expect(bare(1, 3).categoryWizardNextLabelKey()).toBe('adminUi.actions.next');
  });
});
