import { bufferToBase64url } from './webauthn';

describe('bufferToBase64url (golden WU)', () => {
  it('encodes ArrayBuffer and TypedArray views', () => {
    const buf = new Uint8Array([255, 0, 1]).buffer;
    const a = bufferToBase64url(buf);
    const b = bufferToBase64url(new Uint8Array([255, 0, 1]));
    expect(a).toBe(b);
    expect(a).toMatch(/^[A-Za-z0-9_-]+$/);
  });
});
