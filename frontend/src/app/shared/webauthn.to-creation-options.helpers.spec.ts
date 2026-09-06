import { toPublicKeyCredentialCreationOptions } from './webauthn';

/** Golden WU passkeys-to-public-key-credential-creation-options. */
describe('toPublicKeyCredentialCreationOptions (golden WU)', () => {
  it('decodes challenge and user id buffers', () => {
    const opts = toPublicKeyCredentialCreationOptions({
      challenge: 'aGk',
      user: { id: 'aGk', name: 'u' },
      excludeCredentials: [{ id: 'aGk', type: 'public-key' }],
    });
    expect(opts.challenge).toEqual(jasmine.any(ArrayBuffer));
    expect(opts.user.id).toEqual(jasmine.any(ArrayBuffer));
    expect(opts.excludeCredentials?.length).toBe(1);
    expect(opts.excludeCredentials?.[0].id).toEqual(jasmine.any(ArrayBuffer));
  });
});
