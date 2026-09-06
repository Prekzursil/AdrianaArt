import { signal } from '@angular/core';
import { CopyButtonComponent } from './copy-button.component';

/** Golden WU copy-button-flash-copied — flashCopied. */
describe('CopyButtonComponent flashCopied (golden WU)', () => {
  it('sets the copied signal true', () => {
    const cmp = Object.create(CopyButtonComponent.prototype) as CopyButtonComponent;
    (cmp as any).copied = signal(false);
    (cmp as any).flashCopied();
    expect(cmp.copied()).toBe(true);
  });
});
