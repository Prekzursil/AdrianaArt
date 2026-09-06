import { findUnmappedCoreLiterals } from './core-literal-guard';

/** Golden WU find-unmapped-literals-fn -- findUnmappedCoreLiterals. */
describe('findUnmappedCoreLiterals (golden WU)', () => {
  it('drops allowlisted literals and keeps the rest', () => {
    const found = findUnmappedCoreLiterals('bg-white #94a3b8', ['#94a3b8']);
    expect(found.map((f) => f.text)).toEqual(['bg-white']);
  });
});
