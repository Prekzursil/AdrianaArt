import { CommonModule, CurrencyPipe, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CatalogService, Product } from '../../core/catalog.service';
import { ContainerComponent } from '../../layout/container.component';
import { ButtonComponent } from '../../shared/button.component';
import { SkeletonComponent } from '../../shared/skeleton.component';
import { ToastService } from '../../core/toast.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    NgOptimizedImage,
    ContainerComponent,
    ButtonComponent,
    SkeletonComponent,
    CurrencyPipe
  ],
  template: `
    <app-container classes="py-10">
      <ng-container *ngIf="loading; else content">
        <div class="grid gap-6 lg:grid-cols-2">
          <app-skeleton height="420px"></app-skeleton>
          <div class="space-y-4">
            <app-skeleton height="32px"></app-skeleton>
            <app-skeleton height="24px"></app-skeleton>
            <app-skeleton height="18px" *ngFor="let i of [1, 2, 3]"></app-skeleton>
          </div>
        </div>
      </ng-container>

      <ng-template #content>
        <ng-container *ngIf="product; else missing">
          <div class="grid gap-10 lg:grid-cols-2">
            <div class="space-y-4">
              <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                <img
                  [ngSrc]="activeImage"
                  [alt]="product.name"
                  class="w-full object-cover"
                  width="960"
                  height="960"
                />
              </div>
              <div class="flex gap-3">
                <button
                  *ngFor="let image of product.images ?? []; let idx = index"
                  class="h-20 w-20 rounded-xl border"
                  [ngClass]="idx === activeImageIndex ? 'border-slate-900' : 'border-slate-200'"
                  type="button"
                  (click)="setActiveImage(idx)"
                >
                  <img [ngSrc]="image.url" [alt]="image.alt_text ?? product.name" class="h-full w-full object-cover" />
                </button>
              </div>
            </div>

            <div class="space-y-5">
              <div class="space-y-2">
                <p class="text-xs uppercase tracking-[0.3em] text-slate-500">Handmade collection</p>
                <h1 class="text-3xl font-semibold text-slate-900">{{ product.name }}</h1>
                <p class="text-lg font-semibold text-slate-900">
                  {{ product.base_price | currency : product.currency }}
                </p>
                <div class="flex items-center gap-2 text-sm text-amber-700" *ngIf="product.rating_count">
                  ★ {{ product.rating_average?.toFixed(1) ?? '0.0' }} · {{ product.rating_count }} review(s)
                </div>
              </div>

              <p class="text-sm text-slate-700 leading-relaxed" *ngIf="product.long_description">
                {{ product.long_description }}
              </p>

              <div class="rounded-xl bg-amber-50 border border-amber-200 p-3 text-sm text-amber-900">
                Each piece is hand-thrown and glazed, so subtle variations in color and form are intentional. Expect
                one-of-a-kind character in every item.
              </div>

              <div class="space-y-3">
                <label *ngIf="product.variants?.length" class="grid gap-1 text-sm font-medium text-slate-800">
                  Variant
                  <select
                    class="rounded-lg border border-slate-200 px-3 py-2 text-sm"
                    [(ngModel)]="selectedVariantId"
                  >
                    <option *ngFor="let variant of product.variants" [value]="variant.id">
                      {{ variant.name }} <span *ngIf="variant.stock_quantity !== null">({{ variant.stock_quantity }} left)</span>
                    </option>
                  </select>
                </label>

                <label class="grid gap-1 text-sm font-medium text-slate-800">
                  Quantity
                  <input
                    type="number"
                    min="1"
                    class="w-24 rounded-lg border border-slate-200 px-3 py-2"
                    [(ngModel)]="quantity"
                  />
                </label>
              </div>

              <div class="flex gap-3">
                <app-button label="Add to cart" size="lg" (action)="addToCart()"></app-button>
                <app-button label="Back to shop" variant="ghost" [routerLink]="['/shop']"></app-button>
              </div>

              <div class="flex flex-wrap gap-2" *ngIf="product.tags?.length">
                <span
                  *ngFor="let tag of product.tags"
                  class="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                >
                  {{ tag.name ?? tag }}
                </span>
              </div>
            </div>
          </div>
        </ng-container>
      </ng-template>

      <ng-template #missing>
        <div class="border border-dashed border-slate-200 rounded-2xl p-10 text-center">
          <p class="text-lg font-semibold text-slate-900">Product not found</p>
          <a routerLink="/shop" class="text-indigo-600 font-medium">Back to shop</a>
        </div>
      </ng-template>
    </app-container>
  `
})
export class ProductComponent implements OnInit {
  product: Product | null = null;
  loading = true;
  selectedVariantId: string | null = null;
  quantity = 1;
  activeImageIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private catalog: CatalogService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.catalog.getProduct(slug).subscribe({
        next: (product) => {
          this.product = product;
          this.selectedVariantId = product.variants?.[0]?.id ?? null;
          this.loading = false;
        },
        error: () => {
          this.product = null;
          this.loading = false;
        }
      });
    } else {
      this.loading = false;
    }
  }

  get activeImage(): string {
    if (!this.product || !this.product.images?.length) {
      return 'https://via.placeholder.com/960x960?text=Product';
    }
    return this.product.images[this.activeImageIndex]?.url ?? this.product.images[0].url;
  }

  setActiveImage(index: number): void {
    this.activeImageIndex = index;
  }

  addToCart(): void {
    const name = this.product?.name ?? 'item';
    this.toast.success('Added to cart', `${this.quantity} × ${name}`);
  }
}
