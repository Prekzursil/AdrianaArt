import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { AccountWishlistComponent } from './account-wishlist.component';
import { AccountComponent } from './account.component';
import { CartStore } from '../../core/cart.store';
import { CatalogService } from '../../core/catalog.service';
import { ToastService } from '../../core/toast.service';

describe('AccountWishlistComponent selection helpers (golden WU)', () => {
  const wishlistItems = signal<Array<{ id: string; name: string }>>([]);

  beforeEach(() => {
    wishlistItems.set([]);
    TestBed.configureTestingModule({
      imports: [AccountWishlistComponent, TranslateModule.forRoot()],
      providers: [
        {
          provide: AccountComponent,
          useValue: {
            wishlist: {
              items: wishlistItems.asReadonly(),
              isLoaded: () => true,
              removeLocal: jasmine.createSpy('removeLocal'),
            },
          },
        },
        {
          provide: CartStore,
          useValue: { addFromProduct: jasmine.createSpy('addFromProduct') },
        },
        {
          provide: CatalogService,
          useValue: {
            getProduct: () => of(null),
            requestBackInStock: () => of(null),
            cancelBackInStock: () => of(null),
          },
        },
        {
          provide: ToastService,
          useValue: { success: () => {}, error: () => {}, info: () => {} },
        },
      ],
    });
  });

  function create() {
    const fixture = TestBed.createComponent(AccountWishlistComponent);
    return { fixture, cmp: fixture.componentInstance };
  }

  it('isSelected mirrors the selected set', () => {
    const { fixture, cmp } = create();
    cmp.selected = new Set();
    expect(cmp.isSelected('p1')).toBe(false);
    cmp.selected.add('p1');
    expect(cmp.isSelected('p1')).toBe(true);
    fixture.destroy();
  });

  it('allSelected is true only when every wishlist item id is selected', () => {
    const { fixture, cmp } = create();
    wishlistItems.set([
      { id: 'a', name: 'A' },
      { id: 'b', name: 'B' },
    ]);
    cmp.selected = new Set();
    expect(cmp.allSelected()).toBe(false);
    cmp.selected = new Set(['a']);
    expect(cmp.allSelected()).toBe(false);
    cmp.selected = new Set(['a', 'b']);
    expect(cmp.allSelected()).toBe(true);
    wishlistItems.set([]);
    expect(cmp.allSelected()).toBe(false);
    fixture.destroy();
  });

  it('toggleSelected / toggleSelectAll / clearSelection mutate selection', () => {
    const { fixture, cmp } = create();
    wishlistItems.set([
      { id: 'a', name: 'A' },
      { id: 'b', name: 'B' },
    ]);
    cmp.selected = new Set();
    cmp.toggleSelected('a', true);
    expect(cmp.isSelected('a')).toBe(true);
    cmp.toggleSelected('a', false);
    expect(cmp.isSelected('a')).toBe(false);
    cmp.toggleSelectAll(true);
    expect(cmp.allSelected()).toBe(true);
    expect(cmp.selected.size).toBe(2);
    cmp.toggleSelectAll(false);
    expect(cmp.selected.size).toBe(0);
    cmp.toggleSelectAll(true);
    cmp.clearSelection();
    expect(cmp.selected.size).toBe(0);
    fixture.destroy();
  });
});
