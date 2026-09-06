import { buildCspReportOnly } from './theme-head';

/** Golden WU build-csp-report-only -- buildCspReportOnly. */
describe('buildCspReportOnly (golden WU)', () => {
  it('pins style-src hash and hardening directives', () => {
    const csp = buildCspReportOnly('abc123');
    expect(csp).toContain("style-src 'sha256-abc123'");
    expect(csp).toContain("base-uri 'self'");
    expect(csp).toContain("object-src 'none'");
    expect(csp).toContain("frame-ancestors 'self'");
  });
});
