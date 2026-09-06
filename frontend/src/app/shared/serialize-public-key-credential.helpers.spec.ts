import { bufferToBase64url, serializePublicKeyCredential } from './webauthn';

describe('serializePublicKeyCredential (golden WU)', () => {
  it('base64url-encodes attestation response fields', () => {
    const rawId = new Uint8Array([1, 2, 3]).buffer;
    const clientDataJSON = new Uint8Array([9]).buffer;
    const attestationObject = new Uint8Array([7, 8]).buffer;
    const credential = {
      id: 'cred-1',
      rawId,
      type: 'public-key',
      response: { clientDataJSON, attestationObject },
      getClientExtensionResults: () => ({ uvm: true }),
    } as unknown as PublicKeyCredential;

    const json = serializePublicKeyCredential(credential);
    expect(json.id).toBe('cred-1');
    expect(json.type).toBe('public-key');
    expect(json.rawId).toBe(bufferToBase64url(rawId));
    expect(json.response.clientDataJSON).toBe(bufferToBase64url(clientDataJSON));
    expect(json.response.attestationObject).toBe(bufferToBase64url(attestationObject));
    expect(json.clientExtensionResults).toEqual({ uvm: true });
  });

  it('encodes assertion fields and null userHandle', () => {
    const credential = {
      id: 'cred-2',
      rawId: new Uint8Array([4]).buffer,
      type: 'public-key',
      response: {
        clientDataJSON: new Uint8Array([5]).buffer,
        authenticatorData: new Uint8Array([6]).buffer,
        signature: new Uint8Array([7]).buffer,
        userHandle: null,
      },
      getClientExtensionResults: undefined,
    } as unknown as PublicKeyCredential;

    const json = serializePublicKeyCredential(credential);
    expect(json.response.authenticatorData).toBe(bufferToBase64url(new Uint8Array([6])));
    expect(json.response.signature).toBe(bufferToBase64url(new Uint8Array([7])));
    expect(json.response.userHandle).toBeNull();
    expect(json.clientExtensionResults).toEqual({});
  });
});
