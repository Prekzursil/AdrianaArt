import { CartApi } from './cart.api';

/** Golden WU cart-api-headers — headers. */
describe('CartApi headers (golden WU)', () => {
  it('includes X-Session-Id only when session id present', () => {
    const api = Object.create(CartApi.prototype) as CartApi;
    Object.assign(api as any, { getSessionId: () => '' });
    expect(api.headers()).toEqual({});
    Object.assign(api as any, { getSessionId: () => 'guest-1' });
    expect(api.headers()).toEqual({ 'X-Session-Id': 'guest-1' });
  });
});
