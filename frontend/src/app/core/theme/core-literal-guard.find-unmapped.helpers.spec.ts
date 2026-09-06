import { findUnmappedCoreLiterals } from './core-literal-guard';

/** Golden WU find-unmapped-core-literals -- findUnmappedCoreLiterals. */
describe('findUnmappedCoreLiterals (golden WU)', () => {
  it('filters allowlisted literals and respects kinds', () => {
    const src = 'color: #ff00aa; class="bg-red-500 text-white"';
    const all = findUnmappedCoreLiterals(src, []);
    expect(all.some((f) => f.text.includes('#ff00aa') || f.kind === 'hex')).toBeTrue();
    const filtered = findUnmappedCoreLiterals(src, ['#ff00aa'], ['hex']);
    expect(filtered.every((f) => f.text !== '#ff00aa')).toBeTrue();
  });
});
