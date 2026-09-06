import { pageBlocksToPlainText } from './page-blocks';

describe('pageBlocksToPlainText (golden WU)', () => {
  it('skips disabled; strips html; joins titles/bodies/cta/faq', () => {
    const text = pageBlocksToPlainText([
      { enabled: false, title: 'Nope', type: 'text', body_html: '<p>x</p>' } as any,
      { enabled: true, title: 'Hello', type: 'text', body_html: '<p>World</p>' } as any,
      {
        enabled: true,
        type: 'cta',
        body_html: '<b>Go</b>',
        cta_label: 'Shop',
      } as any,
      {
        enabled: true,
        type: 'faq',
        items: [{ question: 'Q?', answer_html: '<i>A</i>' }],
      } as any,
    ] as any);
    expect(text).toBe('Hello World Go Shop Q? A');
  });
});
