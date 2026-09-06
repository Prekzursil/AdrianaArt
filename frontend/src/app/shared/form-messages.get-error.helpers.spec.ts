import { FormMessagesService } from './form-messages.service';

/** Golden WU form-messages-get-error — getError. */
describe('FormMessagesService getError (golden WU)', () => {
  it('maps common validation errors', () => {
    const svc = Object.create(FormMessagesService.prototype) as FormMessagesService;
    expect(svc.getError(null)).toBeNull();
    expect(svc.getError({ errors: null } as any)).toBeNull();
    expect(svc.getError({ errors: { required: true } } as any)).toBe('This field is required.');
    expect(svc.getError({ errors: { email: true } } as any)).toBe('Enter a valid email.');
    expect(
      svc.getError({ errors: { minlength: { requiredLength: 8 } } } as any),
    ).toBe('Minimum length is 8.');
  });
});
