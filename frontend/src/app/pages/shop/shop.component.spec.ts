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

  it('resolveActiveCategoryLabel returns null, sale label, mapped name, or title-case fallback', () => {
    const fixture = TestBed.createComponent(ShopComponent);
    const cmp = fixture.componentInstance as any;
    const translate = TestBed.inject(TranslateService);
    translate.setTranslation('en', { shop: { sale: 'Sale deals' } }, true);
    translate.use('en');

    cmp.activeCategorySlug = '';
    expect(cmp.resolveActiveCategoryLabel()).toBeNull();

    cmp.activeCategorySlug = 'sale';
    expect(cmp.resolveActiveCategoryLabel()).toBe('Sale deals');

    cmp.categoriesBySlug.set('prints', { id: '1', slug: 'prints', name: 'Fine Prints', parent_id: null });
    cmp.activeCategorySlug = 'prints';
    expect(cmp.resolveActiveCategoryLabel()).toBe('Fine Prints');

    cmp.activeCategorySlug = 'wall_art';
    expect(cmp.resolveActiveCategoryLabel()).toBe('Wall Art');
    fixture.destroy();
  });

  it('shouldKeepSubcategoryInCanonical requires matching parent/child relationship', () => {
    const fixture = TestBed.createComponent(ShopComponent);
    const cmp = fixture.componentInstance as any;
    cmp.activeCategorySlug = 'sale';
    cmp.activeSubcategorySlug = 'kids';
    expect(cmp.shouldKeepSubcategoryInCanonical()).toBe(false);

    cmp.activeCategorySlug = 'prints';
    cmp.activeSubcategorySlug = '';
    expect(cmp.shouldKeepSubcategoryInCanonical()).toBe(false);

    cmp.categoriesBySlug.set('prints', { id: 'p1', slug: 'prints', name: 'Prints', parent_id: null });
    cmp.categoriesBySlug.set('kids', { id: 'c1', slug: 'kids', name: 'Kids', parent_id: 'p1' });
    cmp.activeSubcategorySlug = 'kids';
    expect(cmp.shouldKeepSubcategoryInCanonical()).toBe(true);

    cmp.categoriesBySlug.set('kids', { id: 'c1', slug: 'kids', name: 'Kids', parent_id: 'other' });
    expect(cmp.shouldKeepSubcategoryInCanonical()).toBe(false);
    fixture.destroy();
  });

  it('rebuildCategoryTree indexes categories and sorts children by sort_order then name', () => {
    const fixture = TestBed.createComponent(ShopComponent);
    const cmp = fixture.componentInstance as any;
    cmp.categories = [
      { id: 'p', slug: 'parent', name: 'Parent', parent_id: null, sort_order: 1 },
      { id: 'b', slug: 'beta', name: 'Beta', parent_id: 'p', sort_order: 2 },
      { id: 'a', slug: 'alpha', name: 'Alpha', parent_id: 'p', sort_order: 1 },
      { id: 'c', slug: 'gamma', name: 'Gamma', parent_id: 'p', sort_order: 1 },
    ];
    cmp.rebuildCategoryTree();
    expect(cmp.categoriesBySlug.get('parent')?.id).toBe('p');
    expect(cmp.categoriesById.get('a')?.slug).toBe('alpha');
    expect(cmp.rootCategories.map((c: any) => c.slug)).toEqual(['parent']);
    expect(cmp.childrenByParentId.get('p').map((c: any) => c.slug)).toEqual(['alpha', 'gamma', 'beta']);
    fixture.destroy();
  });
});
