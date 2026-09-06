import { toPublicKeyCredentialCreationOptions } from './webauthn';

describe('toPublicKeyCredentialCreationOptions (golden WU)', () => {
  it('decodes challenge, user id, and excludeCredentials ids', () => {
    const result = toPublicKeyCredentialCreationOptions({
      challenge: 'aGk',
      user: { id: 'aGk', name: 'ada', displayName: 'Ada' },
      excludeCredentials: [{ type: 'public-key', id: 'aGk' }, { type: 'public-key' }],
    });
    expect(new Uint8Array(result.challenge as ArrayBuffer)).toEqual(new Uint8Array([104, 105]));
    expect(new Uint8Array(result.user.id as ArrayBuffer)).toEqual(new Uint8Array([104, 105]));
    expect(result.user.name).toBe('ada');
    expect(result.excludeCredentials?.length).toBe(2);
    expect(new Uint8Array(result.excludeCredentials![0].id as ArrayBuffer)).toEqual(new Uint8Array([104, 105]));
    expect(new Uint8Array(result.excludeCredentials![1].id as ArrayBuffer).length).toBe(0);
  });

  it('defaults missing fields to empty buffers/lists', () => {
    const result = toPublicKeyCredentialCreationOptions({});
    expect(new Uint8Array(result.challenge as ArrayBuffer).length).toBe(0);
    expect(new Uint8Array(result.user.id as ArrayBuffer).length).toBe(0);
    expect(result.excludeCredentials).toEqual([]);
  });
});
