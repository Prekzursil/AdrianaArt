import { AddressFormComponent } from './address-form.component';

/** Golden WU address-form-apply-label-preset — applyLabelPreset. */
describe('AddressFormComponent applyLabelPreset (golden WU)', () => {
  it('applies preset or custom label onto the model', () => {
    const cmp = Object.create(AddressFormComponent.prototype) as AddressFormComponent;
    Object.assign(cmp as any, {
      labelPreset: 'home',
      labelCustom: 'ignored',
      model: { label: null },
    });
    cmp.applyLabelPreset();
    expect((cmp as any).model.label).toBe('home');
    Object.assign(cmp as any, { labelPreset: 'custom', labelCustom: '  Office  ' });
    cmp.applyLabelPreset();
    expect((cmp as any).model.label).toBe('Office');
    Object.assign(cmp as any, { labelCustom: '   ' });
    cmp.applyLabelPreset();
    expect((cmp as any).model.label).toBeNull();
  });
});
