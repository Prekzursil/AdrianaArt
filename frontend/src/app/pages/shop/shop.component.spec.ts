import { DOCUMENT } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { ShopComponent } from './shop.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Title, Meta } from '@angular/platform-browser';
import { of, Subject, throwError } from 'rxjs';
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

  it('loadMore advances page and fetches the next page when guards pass', () => {
    const fixture = TestBed.createComponent(ShopComponent);
    const cmp = fixture.componentInstance as any;
    cmp.paginationMode = 'load_more';
    cmp.pageMeta = { page: 1, total_pages: 3, total_items: 30, limit: 10 };
    cmp.filters.page = 1;
    cmp.loadingMore.set(false);
    spyOn(cmp, 'cancelFilterDebounce');
    spyOn(cmp, 'fetchProducts');
    cmp.loadMore();
    expect(cmp.cancelFilterDebounce).toHaveBeenCalled();
    expect(cmp.filters.page).toBe(2);
    expect(cmp.loadingMore()).toBeTrue();
    expect(cmp.hasError()).toBeFalse();
    expect(cmp.fetchProducts).toHaveBeenCalledWith(true);
    fixture.destroy();
  });

  it('fetchProducts append concatenates incoming products onto the existing list', () => {
    const listProducts = jasmine.createSpy('listProducts').and.returnValue(
      of({
        items: [{ id: 'b', slug: 'b', name: 'B', base_price: 2, currency: 'RON', tags: [] }],
        meta: { total_items: 2, total_pages: 2, page: 2, limit: 10 },
      }),
    );
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ShopComponent, TranslateModule.forRoot()],
      providers: [
        { provide: Title, useValue: title },
        { provide: Meta, useValue: meta },
        {
          provide: CatalogService,
          useValue: { listCategories: () => of([]), listProducts },
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
    const fixture = TestBed.createComponent(ShopComponent);
    const cmp = fixture.componentInstance as any;
    cmp.products = [
      { id: 'a', slug: 'a', name: 'A', base_price: 1, currency: 'RON', tags: [] },
    ];
    cmp.fetchProducts(true);
    expect(listProducts).toHaveBeenCalled();
    expect(cmp.products.map((p: { id: string }) => p.id)).toEqual(['a', 'b']);
    expect(cmp.pageMeta?.page).toBe(2);
    expect(cmp.loadingMore()).toBeFalse();
    fixture.destroy();
  });

  it('fetchProducts append error reverts the page and toasts', () => {
    const toastError = jasmine.createSpy('toastError');
    const listProducts = jasmine
      .createSpy('listProducts')
      .and.returnValue(throwError(() => new Error('network')));
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ShopComponent, TranslateModule.forRoot()],
      providers: [
        { provide: Title, useValue: title },
        { provide: Meta, useValue: meta },
        {
          provide: CatalogService,
          useValue: { listCategories: () => of([]), listProducts },
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
        { provide: ToastService, useValue: { error: toastError } },
        { provide: DOCUMENT, useValue: doc },
      ],
    });
    const fixture = TestBed.createComponent(ShopComponent);
    const cmp = fixture.componentInstance as any;
    cmp.filters.page = 2;
    cmp.loadingMore.set(true);
    cmp.products = [
      { id: 'a', slug: 'a', name: 'A', base_price: 1, currency: 'RON', tags: [] },
    ];
    cmp.fetchProducts(true);
    expect(cmp.filters.page).toBe(1);
    expect(cmp.loadingMore()).toBeFalse();
    expect(toastError).toHaveBeenCalled();
    expect(cmp.products.length).toBe(1);
    fixture.destroy();
  });
});
