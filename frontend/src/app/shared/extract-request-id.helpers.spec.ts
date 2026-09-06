import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { extractRequestId } from './http-error';

describe('extractRequestId (golden WU)', () => {
  it('returns null for non-HttpErrorResponse', () => {
    expect(extractRequestId(null)).toBeNull();
    expect(extractRequestId(new Error('x'))).toBeNull();
  });

  it('prefers X-Request-ID header then body.request_id / nested', () => {
    const headers = new HttpHeaders({ 'X-Request-ID': '  hdr-1  ' });
    expect(
      extractRequestId(new HttpErrorResponse({ status: 500, headers, error: { request_id: 'body' } })),
    ).toBe('hdr-1');

    expect(
      extractRequestId(new HttpErrorResponse({ status: 500, error: { requestId: '  body-2 ' } })),
    ).toBe('body-2');

    expect(
      extractRequestId(
        new HttpErrorResponse({ status: 500, error: { error: { request_id: 'nested' } } }),
      ),
    ).toBe('nested');

    expect(extractRequestId(new HttpErrorResponse({ status: 500, error: 'string' }))).toBeNull();
    expect(extractRequestId(new HttpErrorResponse({ status: 500, error: {} }))).toBeNull();
  });
});
