import { pageBlockOuterClasses } from './page-blocks';

describe('pageBlockOuterClasses (golden WU)', () => {
  it('joins background + spacing; empty defaults', () => {
    expect(pageBlockOuterClasses(null)).toBe('');
    expect(pageBlockOuterClasses({ background: 'muted', spacing: 'sm' } as any)).toContain(
      'bg-slate-50',
    );
    expect(pageBlockOuterClasses({ background: 'muted', spacing: 'sm' } as any)).toContain('p-3');
    expect(pageBlockOuterClasses({ background: 'accent', spacing: 'lg' } as any)).toContain(
      'bg-indigo-50',
    );
    expect(pageBlockOuterClasses({ background: 'none', spacing: 'none' } as any)).toBe('');
  });
});
