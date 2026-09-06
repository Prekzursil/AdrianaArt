import { LocalizedTextEditorComponent } from './localized-text-editor.component';

/** Golden WU — copy between UI langs. */
describe('LocalizedTextEditorComponent copy (golden WU)', () => {
  function bare(): LocalizedTextEditorComponent {
    const cmp = Object.create(
      LocalizedTextEditorComponent.prototype,
    ) as LocalizedTextEditorComponent;
    (cmp as any).value = { en: 'Hello', ro: '' };
    return cmp;
  }

  it('copies source lang into target, treating missing as empty', () => {
    const cmp = bare();
    cmp.copy('en', 'ro');
    expect((cmp as any).value).toEqual({ en: 'Hello', ro: 'Hello' });
    (cmp as any).value = { en: 'x', ro: 'y' };
    (cmp as any).value.en = '';
    cmp.copy('en', 'ro');
    expect((cmp as any).value.ro).toBe('');
  });
});
