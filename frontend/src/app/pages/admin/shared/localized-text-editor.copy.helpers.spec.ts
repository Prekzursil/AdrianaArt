import { LocalizedTextEditorComponent } from './localized-text-editor.component';

/** Golden WU localized-text-editor-copy — copy. */
describe('LocalizedTextEditorComponent copy (golden WU)', () => {
  it('copies from one language into another', () => {
    const cmp = Object.create(LocalizedTextEditorComponent.prototype) as LocalizedTextEditorComponent;
    Object.assign(cmp as any, { value: { en: 'Hello', ro: '' } });
    cmp.copy('en', 'ro');
    expect((cmp as any).value.ro).toBe('Hello');
    Object.assign(cmp as any, { value: { en: '', ro: 'keep' } });
    cmp.copy('en', 'ro');
    expect((cmp as any).value.ro).toBe('');
  });
});
