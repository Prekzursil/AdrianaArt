import { parsePageBlocks } from './page-blocks';

/** Golden WU parse-page-blocks -- parsePageBlocks. */
describe('parsePageBlocks (golden WU)', () => {
  it('returns empty for missing or empty blocks', () => {
    const md = (s: string) => s;
    expect(parsePageBlocks(null, 'en', md)).toEqual([]);
    expect(parsePageBlocks({ blocks: [] }, 'en', md)).toEqual([]);
    expect(parsePageBlocks({ blocks: [{ type: 'unknown' }] }, 'en', md)).toEqual([]);
  });

  it('parses an enabled text block', () => {
    const blocks = parsePageBlocks(
      {
        blocks: [
          {
            type: 'text',
            key: 'intro',
            title: { en: 'Hello' },
            body_markdown: { en: 'Hi **there**' },
          },
        ],
      },
      'en',
      (s) => `<p>${s}</p>`,
    );
    expect(blocks).toHaveSize(1);
    expect(blocks[0].type).toBe('text');
    expect(blocks[0].key).toBe('intro');
  });
});
