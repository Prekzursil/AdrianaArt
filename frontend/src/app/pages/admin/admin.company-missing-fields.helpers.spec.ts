import { AdminComponent } from './admin.component';

/** Golden WU admin-company-missing-fields — companyMissingFields. */
describe('AdminComponent companyMissingFields (golden WU)', () => {
  it('lists missing company form field keys', () => {
    const cmp = Object.create(AdminComponent.prototype) as AdminComponent;
    (cmp as any).companyForm = {
      name: '',
      registration_number: '',
      cui: '',
      address: '',
      phone: '',
      email: '',
    };
    expect(cmp.companyMissingFields()).toEqual([
      'adminUi.site.company.fields.name',
      'adminUi.site.company.fields.registrationNumber',
      'adminUi.site.company.fields.cui',
      'adminUi.site.company.fields.address',
      'adminUi.site.company.fields.phone',
      'adminUi.site.company.fields.email',
    ]);

    (cmp as any).companyForm = {
      name: 'Acme',
      registration_number: 'J40/1/2020',
      cui: 'RO123',
      address: 'Str 1',
      phone: '0700',
      email: 'a@b.c',
    };
    expect(cmp.companyMissingFields()).toEqual([]);
  });
});
