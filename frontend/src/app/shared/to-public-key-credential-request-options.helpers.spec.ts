import { toPublicKeyCredentialRequestOptions } from './webauthn';

describe('toPublicKeyCredentialRequestOptions (golden WU)', () => {
  it('decodes challenge and allowCredentials when present', () => {
    const result = toPublicKeyCredentialRequestOptions({
      challenge: 'aGk',
      allowCredentials: [{ type: 'public-key', id: 'aGk' }],
    });
    expect(new Uint8Array(result.challenge)).toEqual(new Uint8Array([104, 105]));
    expect(result.allowCredentials?.length).toBe(1);
    expect(new Uint8Array(result.allowCredentials![0].id)).toEqual(new Uint8Array([104, 105]));
  });

  it('leaves allowCredentials undefined when not an array', () => {
    const result = toPublicKeyCredentialRequestOptions({ challenge: 'aGk' });
    expect(result.allowCredentials).toBeUndefined();
  });
});
