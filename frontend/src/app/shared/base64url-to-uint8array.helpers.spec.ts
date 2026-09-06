import { base64urlToUint8Array, bufferToBase64url } from './webauthn';

describe('base64urlToUint8Array (golden WU)', () => {
  it('round-trips with bufferToBase64url', () => {
    const bytes = new Uint8Array([1, 2, 250, 255]);
    const b64 = bufferToBase64url(bytes);
    expect(b64).not.toContain('+');
    expect(b64).not.toContain('/');
    expect(Array.from(base64urlToUint8Array(b64))).toEqual([1, 2, 250, 255]);
  });
});
