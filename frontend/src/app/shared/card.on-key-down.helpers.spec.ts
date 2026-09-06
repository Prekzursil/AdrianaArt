import { EventEmitter } from '@angular/core';
import { CardComponent } from './card.component';

/** Golden WU card-on-key-down — onKeyDown. */
describe('CardComponent onKeyDown (golden WU)', () => {
  it('emits action on Enter when clickable', () => {
    const cmp = Object.create(CardComponent.prototype) as CardComponent;
    (cmp as any).clickable = true;
    const emitted: void[] = [];
    (cmp as any).action = new EventEmitter<void>();
    (cmp as any).action.subscribe(() => emitted.push(undefined));
    const ev = { key: 'Enter', preventDefault: () => undefined } as KeyboardEvent;
    cmp.onKeyDown(ev);
    expect(emitted.length).toBe(1);
    (cmp as any).clickable = false;
    cmp.onKeyDown(ev);
    expect(emitted.length).toBe(1);
  });
});
