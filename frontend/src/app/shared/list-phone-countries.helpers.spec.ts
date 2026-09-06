import { listPhoneCountries } from './phone';

describe('listPhoneCountries (golden WU)', () => {
  it('puts RO first, locale-normalized, and caches', () => {
    const en = listPhoneCountries('en-US');
    expect(en[0].code).toBe('RO');
    expect(en[0].dial).toBe('+40');
    expect(en.length).toBeGreaterThan(10);
    const en2 = listPhoneCountries('en');
    expect(en2).toBe(en); // same cache entry
    const ro = listPhoneCountries('ro-RO');
    expect(ro[0].code).toBe('RO');
    expect(ro).not.toBe(en);
    expect(listPhoneCountries('').length).toBeGreaterThan(10);
  });
});
