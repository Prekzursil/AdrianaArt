import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { ShopComponent } from './shop.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Title, Meta } from '@angular/platform-browser';
import { of, Subject } from 'rxjs';
import { CatalogService } from '../../core/catalog.service';
import { ActivatedRoute, Router, convertToParamMap } from '@angular/router';
import { ToastService } from '../../core/toast.service';

describe('ShopComponent i18n meta', () => {
  let meta: jasmine.SpyObj<Meta>;
  let title: jasmine.SpyObj<Title>;
  let doc: Document;

  beforeEach(() => {
    meta = jasmine.createSpyObj<Meta>('Meta', ['updateTag']);
    title = jasmine.createSpyObj<Title>('Title', ['setTitle']);
    doc = document.implementation.createHTMLDocument('shop-seo-test');

    TestBed.configureTestingModule({
      imports: [ShopComponent, TranslateModule.forRoot()],
      providers: [
        { provide: Title, useValue: title },
        { provide: Meta, useValue: meta },
        {
          provide: CatalogService,
          useValue: {
            listProducts: () => of({ items: [], meta: null }),
            listCategories: () => of([]),
          },
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { data: {}, queryParams: {} },
            paramMap: of(convertToParamMap({})),
            queryParams: of({}),
          },
        },
        { provide: Router, useValue: { navigate: () => {} } },
        { provide: ToastService, useValue: { error: () => {} } },
        { provide: DOCUMENT, useValue: doc },
      ],
    });
  });

  it('updates meta tags based on current language', () => {
    const fixture = TestBed.createComponent(ShopComponent);
    const cmp = fixture.componentInstance as any;
    const translate = TestBed.inject(TranslateService);
    translate.setTranslation(
      'en',
      {
        shop: {
          metaTitle: 'EN title',
          metaDescription: 'EN desc',
          metaTitleCategory: 'EN title {{category}}',
          metaDescriptionCategory: 'EN desc {{category}}',
        },
      },
      true,
    );
    translate.setTranslation(
      'ro',
      {
        shop: {
          metaTitle: 'RO title',
          metaDescription: 'RO desc',
          metaTitleCategory: 'RO title {{category}}',
          metaDescriptionCategory: 'RO desc {{category}}',
        },
      },
      true,
    );
    translate.use('en');

    cmp.setMetaTags();
    expect(title.setTitle).toHaveBeenCalledWith('EN title');
    expect(meta.updateTag).toHaveBeenCalledWith({ name: 'description', content: 'EN desc' });
    const canonicalEn = doc.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    expect(canonicalEn?.getAttribute('href')).toContain('/shop');
    expect(canonicalEn?.getAttribute('href')).not.toContain('lang=en');
    expect(doc.querySelectorAll('link[rel="alternate"][data-seo-managed="true"]').length).toBe(3);
    expect(doc.querySelector('script#seo-route-schema-1')?.textContent || '').toContain(
      '"CollectionPage"',
    );

    meta.updateTag.calls.reset();
    title.setTitle.calls.reset();
    cmp.activeCategorySlug = 'featured';
    cmp.categoriesBySlug.set('featured', { slug: 'featured', name: 'Featured' } as any);
    cmp.setMetaTags();
    expect(title.setTitle).toHaveBeenCalledWith('EN title Featured');
    expect(meta.updateTag).toHaveBeenCalledWith({
      name: 'description',
      content: 'EN desc Featured',
    });

    meta.updateTag.calls.reset();
    title.setTitle.calls.reset();
    cmp.activeCategorySlug = null;
    translate.use('ro');
    cmp.setMetaTags();
    expect(title.setTitle).toHaveBeenCalledWith('RO title');
    expect(meta.updateTag).toHaveBeenCalledWith({ name: 'description', content: 'RO desc' });
    const canonicalRo = doc.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    expect(canonicalRo?.getAttribute('href')).toContain('/shop?lang=ro');
  });

  it('ignores stale product list responses when multiple loads overlap', () => {
    const first$ = new Subject<any>();
    const second$ = new Subject<any>();
    const listProducts = jasmine
      .createSpy('listProducts')
      .and.returnValues(first$.asObservable(), second$.asObservable());
    const catalog = {
      listCategories: () => of([]),
      listProducts,
    };

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ShopComponent, TranslateModule.forRoot()],
      providers: [
        { provide: Title, useValue: title },
        { provide: Meta, useValue: meta },
        { provide: CatalogService, useValue: catalog },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { data: {}, queryParams: {} },
            paramMap: of(convertToParamMap({})),
            queryParams: of({}),
          },
        },
        { provide: Router, useValue: { navigate: () => {} } },
        { provide: ToastService, useValue: { error: () => {} } },
      ],
    });

    const fixture = TestBed.createComponent(ShopComponent);
    const cmp = fixture.componentInstance as any;

    // Force two sequential loads; only the last should win.
    cmp.loadProducts(false);
    cmp.loadProducts(false);

    second$.next({
      items: [{ id: 'new', slug: 'new', name: 'New', base_price: 1, currency: 'RON', tags: [] }],
      meta: { total_items: 1, total_pages: 1, page: 1, limit: 20 },
    });
    second$.complete();

    expect(cmp.products.length).toBe(1);
    expect(cmp.products[0].id).toBe('new');

    first$.next({
      items: [{ id: 'old', slug: 'old', name: 'Old', base_price: 1, currency: 'RON', tags: [] }],
      meta: { total_items: 1, total_pages: 1, page: 1, limit: 20 },
    });
    first$.complete();

    expect(cmp.products.length).toBe(1);
    expect(cmp.products[0].id).toBe('new');
  });

  it('filterChips uses category map name for non-sale category chips', () => {
    const fixture = TestBed.createComponent(ShopComponent);
    const cmp = fixture.componentInstance as any;
    cmp.activeCategorySlug = 'prints';
    cmp.activeSubcategorySlug = '';
    cmp.categoriesBySlug.clear();
    cmp.categoriesBySlug.set('prints', { id: '1', slug: 'prints', name: 'Fine Prints' });
    const chips = cmp.filterChips();
    const cat = chips.find((c: any) => c.type === 'category');
    expect(cat).toBeTruthy();
    expect(cat.id).toBe('category:prints');
    expect(cat.label).toBe('Fine Prints');
    fixture.destroy();
  });

  it('filterChips falls back to category slug when the map misses', () => {
    const fixture = TestBed.createComponent(ShopComponent);
    const cmp = fixture.componentInstance as any;
    cmp.activeCategorySlug = 'ghost-cat';
    cmp.activeSubcategorySlug = '';
    cmp.categoriesBySlug.clear();
    const chips = cmp.filterChips();
    const cat = chips.find((c: any) => c.type === 'category');
    expect(cat).toBeTruthy();
    expect(cat.id).toBe('category:ghost-cat');
    expect(cat.label).toBe('ghost-cat');
    fixture.destroy();
  });

  it('filterChips omits category chips when activeCategorySlug is empty', () => {
    const fixture = TestBed.createComponent(ShopComponent);
    const cmp = fixture.componentInstance as any;
    cmp.activeCategorySlug = '';
    cmp.activeSubcategorySlug = 'kids';
    cmp.categoriesBySlug.clear();
    cmp.categoriesBySlug.set('kids', { id: '2', slug: 'kids', name: 'Kids' });
    const chips = cmp.filterChips();
    expect(chips.some((c: any) => c.type === 'category')).toBe(false);
    const sub = chips.find((c: any) => c.type === 'subcategory');
    expect(sub?.label).toBe('Kids');
    fixture.destroy();
  });

  it('clampPrice snaps to step and clamps to [priceMinBound, priceMaxBound]', () => {
    const fixture = TestBed.createComponent(ShopComponent);
    const cmp = fixture.componentInstance as any;
    cmp.priceMinBound = 0;
    cmp.priceMaxBound = 1000;
    cmp.priceStep = 10;
    expect(cmp.clampPrice(Number.NaN)).toBe(0);
    expect(cmp.clampPrice(-50)).toBe(0);
    expect(cmp.clampPrice(1500)).toBe(1000);
    expect(cmp.clampPrice(25)).toBe(30);
    expect(cmp.clampPrice(24)).toBe(20);
    fixture.destroy();
  });

  it('normalizePriceRange enforces min<=max using the changed side', () => {
    const fixture = TestBed.createComponent(ShopComponent);
    const cmp = fixture.componentInstance as any;
    cmp.priceMinBound = 0;
    cmp.priceMaxBound = 1000;
    cmp.priceStep = 1;
    cmp.filters.min_price = 80;
    cmp.filters.max_price = 40;
    cmp.normalizePriceRange('min');
    expect(cmp.filters.max_price).toBe(80);
    cmp.filters.min_price = 90;
    cmp.filters.max_price = 20;
    cmp.normalizePriceRange('max');
    expect(cmp.filters.min_price).toBe(20);
    cmp.filters.min_price = 70;
    cmp.filters.max_price = 10;
    cmp.normalizePriceRange();
    expect(cmp.filters.max_price).toBe(70);
    fixture.destroy();
  });

  it('mergeReasonKey maps known reasons and falls back', () => {
    const fixture = TestBed.createComponent(ShopComponent);
    const cmp = fixture.componentInstance as any;
    expect(cmp.mergeReasonKey('same_category')).toBe(
      'adminUi.storefront.categories.mergeReasonSame',
    );
    expect(cmp.mergeReasonKey('different_parent')).toBe(
      'adminUi.storefront.categories.mergeReasonParent',
    );
    expect(cmp.mergeReasonKey('source_has_children')).toBe(
      'adminUi.storefront.categories.mergeReasonChildren',
    );
    expect(cmp.mergeReasonKey('nope')).toBe('adminUi.storefront.categories.mergeNotAllowed');
    expect(cmp.mergeReasonKey(null)).toBe('adminUi.storefront.categories.mergeNotAllowed');
    fixture.destroy();
  });
});
