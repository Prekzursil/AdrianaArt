import { pageBlockInnerClasses } from './page-blocks';

describe('pageBlockInnerClasses (golden WU)', () => {
  it('always includes w-full plus max_width/align modifiers', () => {
    expect(pageBlockInnerClasses(null)).toBe('w-full');
    expect(pageBlockInnerClasses({ max_width: 'narrow', align: 'center' } as any)).toBe(
      'w-full max-w-2xl mx-auto text-center',
    );
    expect(pageBlockInnerClasses({ max_width: 'prose', align: 'left' } as any)).toBe(
      'w-full max-w-prose',
    );
    expect(pageBlockInnerClasses({ max_width: 'wide', align: 'left' } as any)).toBe(
      'w-full max-w-4xl',
    );
  });
});
