import { base64urlToUint8Array } from './webauthn';

/** Golden WU base64url-to-uint8-array -- base64urlToUint8Array. */
describe('base64urlToUint8Array (golden WU)', () => {
  it('decodes base64url; empty/whitespace -> empty bytes', () => {
    expect(Array.from(base64urlToUint8Array(''))).toEqual([]);
    expect(Array.from(base64urlToUint8Array('   '))).toEqual([]);
    expect(Array.from(base64urlToUint8Array('YQ'))).toEqual([97]);
    expect(Array.from(base64urlToUint8Array('YWI'))).toEqual([97, 98]);
  });
});
