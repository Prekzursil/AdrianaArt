import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { BreadcrumbComponent } from '../../shared/breadcrumb.component';
import { ContainerComponent } from '../../layout/container.component';
import { CardComponent } from '../../shared/card.component';
import { ButtonComponent } from '../../shared/button.component';
import { InputComponent } from '../../shared/input.component';
import { LocalizedCurrencyPipe } from '../../shared/localized-currency.pipe';
import { SkeletonComponent } from '../../shared/skeleton.component';
import {
  AdminService,
  AdminSummary,
  AdminProduct,
  AdminOrder,
  AdminUser,
  AdminContent,
  AdminCoupon,
  AdminAudit,
  LowStockItem,
  AdminCategory,
  AdminProductDetail
} from '../../core/admin.service';
import { ToastService } from '../../core/toast.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    ContainerComponent,
    BreadcrumbComponent,
    CardComponent,
    ButtonComponent,
    InputComponent,
    LocalizedCurrencyPipe,
    SkeletonComponent
  ],
  template: `
    <app-container classes="py-8 grid gap-6">
      <app-breadcrumb [crumbs]="crumbs"></app-breadcrumb>
      <div *ngIf="error()" class="rounded-lg bg-rose-50 border border-rose-200 text-rose-800 p-3 text-sm">
        {{ error() }}
      </div>
      <div class="grid lg:grid-cols-[260px_1fr] gap-6">
        <aside class="rounded-2xl border border-slate-200 bg-white p-4 grid gap-2 text-sm text-slate-700">
          <a class="font-semibold text-slate-900">Dashboard</a>
          <a class="hover:text-slate-900 text-slate-700">Products</a>
          <a class="hover:text-slate-900 text-slate-700">Orders</a>
          <a class="hover:text-slate-900 text-slate-700">Users</a>
          <a class="hover:text-slate-900 text-slate-700">Content</a>
        </aside>

        <div class="grid gap-6" *ngIf="!loading(); else loadingTpl">
          <section class="grid gap-3">
            <h1 class="text-2xl font-semibold text-slate-900">Admin dashboard</h1>
            <div class="grid md:grid-cols-3 gap-4">
              <app-card title="Products" [subtitle]="summary()?.products + ' total'"></app-card>
              <app-card title="Orders" [subtitle]="summary()?.orders + ' total'"></app-card>
              <app-card title="Users" [subtitle]="summary()?.users + ' total'"></app-card>
            </div>
            <div class="grid md:grid-cols-3 gap-4">
              <app-card title="Low stock" [subtitle]="summary()?.low_stock + ' items'"></app-card>
              <app-card title="Sales (30d)" [subtitle]="(summary()?.sales_30d || 0) | localizedCurrency : 'USD'"></app-card>
              <app-card title="Orders (30d)" [subtitle]="summary()?.orders_30d + ' orders'"></app-card>
            </div>
          </section>

          <section class="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold text-slate-900">Products</h2>
              <div class="flex gap-2">
                <app-button size="sm" label="New" (action)="startNewProduct()"></app-button>
                <app-button size="sm" variant="ghost" label="Delete" [disabled]="!selectedIds.size" (action)="deleteSelected()"></app-button>
              </div>
            </div>
            <div class="overflow-auto">
              <table class="min-w-full text-sm text-left">
                <thead>
                  <tr class="border-b border-slate-200">
                    <th class="py-2">
                      <input type="checkbox" [checked]="allSelected" (change)="toggleAll($event)" />
                    </th>
                    <th class="py-2">Name</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Category</th>
                    <th>Stock</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr *ngFor="let product of products" class="border-b border-slate-100">
                    <td class="py-2">
                      <input
                        type="checkbox"
                        [checked]="selectedIds.has(product.id)"
                        (change)="toggleSelect(product.id, $event)"
                      />
                    </td>
                    <td class="py-2 font-semibold text-slate-900">{{ product.name }}</td>
                    <td>{{ product.price | localizedCurrency : product.currency || 'USD' }}</td>
                    <td><span class="text-xs rounded-full bg-slate-100 px-2 py-1">{{ product.status }}</span></td>
                    <td>{{ product.category }}</td>
                    <td>{{ product.stock_quantity }}</td>
                    <td class="flex gap-2 py-2">
                      <app-button size="sm" variant="ghost" label="Edit" (action)="loadProduct(product.slug)"></app-button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section class="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold text-slate-900">{{ editingId ? 'Edit product' : 'Create product' }}</h2>
              <app-button size="sm" variant="ghost" label="Reset" (action)="startNewProduct()"></app-button>
            </div>
            <div class="grid md:grid-cols-2 gap-3 text-sm">
              <app-input label="Name" [(value)]="form.name"></app-input>
              <app-input label="Slug" [(value)]="form.slug"></app-input>
              <label class="grid text-sm font-medium text-slate-700">
                Category
                <select class="rounded-lg border border-slate-200 px-3 py-2" [(ngModel)]="form.category_id">
                  <option *ngFor="let c of categories" [value]="c.id">{{ c.name }}</option>
                </select>
              </label>
              <app-input label="Price" type="number" [(value)]="form.price"></app-input>
              <app-input label="Stock" type="number" [(value)]="form.stock"></app-input>
              <label class="grid text-sm font-medium text-slate-700">
                Status
                <select class="rounded-lg border border-slate-200 px-3 py-2" [(ngModel)]="form.status">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </label>
              <app-input label="SKU" [(value)]="form.sku"></app-input>
              <app-input label="Image URL" [(value)]="form.image"></app-input>
            </div>
            <label class="grid gap-1 text-sm font-medium text-slate-700">
              Description
              <textarea rows="3" class="rounded-lg border border-slate-200 px-3 py-2" [(ngModel)]="form.description"></textarea>
            </label>
            <div class="flex gap-3">
              <app-button label="Save product" (action)="saveProduct()"></app-button>
              <label class="text-sm text-indigo-600 font-medium cursor-pointer">
                Upload image
                <input type="file" class="hidden" accept="image/*" (change)="onImageUpload($event)" />
              </label>
            </div>
            <div class="grid gap-2" *ngIf="productImages().length">
              <p class="text-xs uppercase tracking-[0.2em] text-slate-500">Images</p>
              <div *ngFor="let img of productImages()" class="flex items-center gap-3 rounded-lg border border-slate-200 p-2">
                <img [src]="img.url" [alt]="img.alt_text || 'image'" class="h-12 w-12 rounded object-cover" />
                <div class="flex-1">
                  <p class="font-semibold text-slate-900">{{ img.alt_text || 'Image' }}</p>
                </div>
                <app-button size="sm" variant="ghost" label="Delete" (action)="deleteImage(img.id)"></app-button>
              </div>
            </div>
            <p *ngIf="formMessage" class="text-sm text-emerald-700">{{ formMessage }}</p>
          </section>

          <section class="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold text-slate-900">Orders</h2>
              <label class="text-sm text-slate-700">
                Status
                <select class="rounded-lg border border-slate-200 px-3 py-2" [(ngModel)]="orderFilter">
                  <option value="">All</option>
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="shipped">Shipped</option>
                  <option value="refunded">Refunded</option>
                </select>
              </label>
            </div>
            <div class="grid md:grid-cols-[1.5fr_1fr] gap-4">
              <div class="grid gap-2 text-sm text-slate-700">
                <div *ngFor="let order of filteredOrders()" class="rounded-lg border border-slate-200 p-3 cursor-pointer" (click)="selectOrder(order)">
                  <div class="flex items-center justify-between">
                    <span class="font-semibold text-slate-900">Order #{{ order.id }}</span>
                    <span class="text-xs rounded-full bg-slate-100 px-2 py-1">{{ order.status }}</span>
                  </div>
                  <p>{{ order.customer }} — {{ order.total_amount | localizedCurrency : order.currency || 'USD' }}</p>
                </div>
              </div>
              <div class="rounded-lg border border-slate-200 p-4 text-sm text-slate-700" *ngIf="activeOrder">
                <div class="flex items-center justify-between">
                  <h3 class="font-semibold text-slate-900">Order #{{ activeOrder.id }}</h3>
                  <select class="rounded-lg border border-slate-200 px-2 py-1 text-sm" [ngModel]="activeOrder.status" (ngModelChange)="changeOrderStatus($event)">
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="shipped">Shipped</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="refunded">Refunded</option>
                  </select>
                </div>
                <p class="text-xs text-slate-500">Customer: {{ activeOrder.customer }}</p>
                <p class="text-xs text-slate-500">Placed: {{ activeOrder.created_at | date: 'medium' }}</p>
                <p class="font-semibold text-slate-900 mt-2">{{ activeOrder.total_amount | localizedCurrency : activeOrder.currency || 'USD' }}</p>
              </div>
            </div>
          </section>

          <section class="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold text-slate-900">Users</h2>
              <app-button size="sm" variant="ghost" label="Force logout selected" [disabled]="!selectedUserId" (action)="forceLogout()"></app-button>
            </div>
            <div class="grid gap-2 text-sm text-slate-700">
              <div *ngFor="let user of users" class="flex items-center justify-between rounded-lg border border-slate-200 p-3">
                <div>
                  <p class="font-semibold text-slate-900">{{ user.name || user.email }}</p>
                  <p class="text-xs text-slate-500">{{ user.email }}</p>
                </div>
                <label class="flex items-center gap-2 text-xs">
                  <input type="radio" name="userSelect" [value]="user.id" [(ngModel)]="selectedUserId" /> Select
                </label>
              </div>
            </div>
          </section>

          <section class="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold text-slate-900">Content</h2>
            </div>
            <div class="grid gap-2 text-sm text-slate-700">
              <div *ngFor="let c of contentBlocks" class="flex items-center justify-between rounded-lg border border-slate-200 p-3">
                <div>
                  <p class="font-semibold text-slate-900">{{ c.title }}</p>
                  <p class="text-xs text-slate-500">{{ c.key }}</p>
                </div>
                <span class="text-xs text-slate-500">v{{ c.version }}</span>
              </div>
            </div>
          </section>

          <section class="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold text-slate-900">Coupons</h2>
            </div>
            <div class="grid gap-2 text-sm text-slate-700">
              <div class="grid md:grid-cols-3 gap-2 items-end">
                <app-input label="Code" [(value)]="newCoupon.code"></app-input>
                <app-input label="% off" type="number" [(value)]="newCoupon.percentage_off"></app-input>
                <app-button size="sm" label="Add coupon" (action)="createCoupon()"></app-button>
              </div>
              <div *ngFor="let coupon of coupons" class="flex items-center justify-between rounded-lg border border-slate-200 p-3">
                <div>
                  <p class="font-semibold text-slate-900">{{ coupon.code }}</p>
                  <p class="text-xs text-slate-500">
                    <ng-container *ngIf="coupon.percentage_off">-{{ coupon.percentage_off }}%</ng-container>
                    <ng-container *ngIf="coupon.amount_off">-{{ coupon.amount_off | localizedCurrency : coupon.currency || 'USD' }}</ng-container>
                    <ng-container *ngIf="!coupon.percentage_off && !coupon.amount_off">No discount set</ng-container>
                  </p>
                </div>
                <button
                  type="button"
                  class="text-xs rounded-full px-2 py-1 border"
                  [class.bg-emerald-100]="coupon.active"
                  [class.text-emerald-800]="coupon.active"
                  (click)="toggleCoupon(coupon)"
                >
                  {{ coupon.active ? 'Active' : 'Inactive' }}
                </button>
              </div>
            </div>
          </section>

          <section class="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold text-slate-900">Audit log</h2>
              <app-button size="sm" variant="ghost" label="Refresh" (action)="loadAudit()"></app-button>
            </div>
            <div class="grid md:grid-cols-2 gap-4 text-sm text-slate-700">
              <div class="grid gap-2">
                <p class="text-xs uppercase tracking-[0.2em] text-slate-500">Product changes</p>
                <div *ngFor="let log of productAudit" class="rounded-lg border border-slate-200 p-3">
                  <p class="font-semibold text-slate-900">{{ log.action }}</p>
                  <p class="text-xs text-slate-500">Product ID: {{ log.product_id }}</p>
                  <p class="text-xs text-slate-500">At: {{ log.created_at | date: 'short' }}</p>
                </div>
              </div>
              <div class="grid gap-2">
                <p class="text-xs uppercase tracking-[0.2em] text-slate-500">Content changes</p>
                <div *ngFor="let log of contentAudit" class="rounded-lg border border-slate-200 p-3">
                  <p class="font-semibold text-slate-900">{{ log.action }}</p>
                  <p class="text-xs text-slate-500">Block ID: {{ log.block_id }}</p>
                  <p class="text-xs text-slate-500">At: {{ log.created_at | date: 'short' }}</p>
                </div>
              </div>
            </div>
          </section>

          <section class="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold text-slate-900">Low stock</h2>
              <span class="text-xs text-slate-500">Below 5 units</span>
            </div>
            <div class="grid gap-2 text-sm text-slate-700">
              <div *ngFor="let item of lowStock" class="flex items-center justify-between rounded-lg border border-slate-200 p-3">
                <div>
                  <p class="font-semibold text-slate-900">{{ item.name }}</p>
                  <p class="text-xs text-slate-500">{{ item.sku }} — {{ item.slug }}</p>
                </div>
                <span class="text-xs rounded-full bg-amber-100 px-2 py-1 text-amber-900">Stock: {{ item.stock_quantity }}</span>
              </div>
            </div>
          </section>
        </div>
        <ng-template #loadingTpl>
          <div class="rounded-2xl border border-slate-200 bg-white p-4">
            <app-skeleton [rows]="6"></app-skeleton>
          </div>
        </ng-template>
      </div>
    </app-container>
  `
})
export class AdminComponent implements OnInit {
  crumbs = [
    { label: 'Home', url: '/' },
    { label: 'Admin' }
  ];

  summary = signal<AdminSummary | null>(null);
  loading = signal<boolean>(true);
  error = signal<string | null>(null);

  products: AdminProduct[] = [];
  categories: AdminCategory[] = [];
  selectedIds = new Set<string>();
  allSelected = false;

  formMessage = '';
  editingId: string | null = null;
  productDetail: AdminProductDetail | null = null;
  productImages = signal<{ id: string; url: string; alt_text?: string | null }[]>([]);
  form = {
    name: '',
    slug: '',
    category_id: '',
    price: 0,
    stock: 0,
    status: 'draft',
    sku: '',
    image: '',
    description: ''
  };

  orders: AdminOrder[] = [];
  activeOrder: AdminOrder | null = null;
  orderFilter = '';

  users: AdminUser[] = [];
  selectedUserId: string | null = null;

  contentBlocks: AdminContent[] = [];
  coupons: AdminCoupon[] = [];
  newCoupon: Partial<AdminCoupon> = { code: '', percentage_off: 0, active: true, currency: 'USD' };

  productAudit: AdminAudit['products'] = [];
  contentAudit: AdminAudit['content'] = [];
  lowStock: LowStockItem[] = [];

  constructor(private admin: AdminService, private toast: ToastService) {}

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): void {
    this.loading.set(true);
    this.error.set(null);
    this.admin.summary().subscribe({ next: (s) => this.summary.set(s) });
    this.admin.products().subscribe({ next: (p) => (this.products = p) });
    this.admin.orders().subscribe({
      next: (o) => {
        this.orders = o;
        this.activeOrder = o[0] || null;
      }
    });
    this.admin.users().subscribe({ next: (u) => (this.users = u) });
    this.admin.content().subscribe({ next: (c) => (this.contentBlocks = c) });
    this.admin.coupons().subscribe({ next: (c) => (this.coupons = c) });
    this.admin.lowStock().subscribe({ next: (items) => (this.lowStock = items) });
    this.admin.audit().subscribe({
      next: (logs) => {
        this.productAudit = logs.products;
        this.contentAudit = logs.content;
      }
    });
    this.admin.getCategories().subscribe({ next: (cats) => (this.categories = cats) });
    this.loading.set(false);
  }

  startNewProduct(): void {
    this.editingId = null;
    this.productDetail = null;
    this.productImages.set([]);
    this.form = {
      name: '',
      slug: '',
      category_id: this.categories[0]?.id || '',
      price: 0,
      stock: 0,
      status: 'draft',
      sku: '',
      image: '',
      description: ''
    };
  }

  loadProduct(slug: string): void {
    this.admin.getProduct(slug).subscribe({
      next: (prod) => {
        this.productDetail = prod;
        this.editingId = prod.slug;
        this.form = {
          name: prod.name,
          slug: prod.slug,
          category_id: prod.category_id || '',
          price: prod.price,
          stock: prod.stock_quantity,
          status: prod.status,
          sku: (prod as any).sku || '',
          image: '',
          description: prod.long_description || ''
        };
        this.productImages.set((prod as any).images || []);
      },
      error: () => this.toast.error('Unable to load product')
    });
  }

  saveProduct(): void {
    const payload: Partial<AdminProductDetail> = {
      name: this.form.name,
      slug: this.form.slug,
      category_id: this.form.category_id,
      base_price: this.form.price,
      stock_quantity: this.form.stock,
      status: this.form.status as any,
      short_description: this.form.description,
      long_description: this.form.description,
      sku: this.form.sku
    } as any;
    const op = this.editingId
      ? this.admin.updateProduct(this.editingId, payload)
      : this.admin.createProduct(payload);
    op.subscribe({
      next: () => {
        this.toast.success('Product saved');
        this.loadAll();
        this.startNewProduct();
      },
      error: () => this.toast.error('Failed to save product')
    });
  }

  deleteSelected(): void {
    if (!this.selectedIds.size) return;
    const ids = Array.from(this.selectedIds);
    const target = this.products.find((p) => p.id === ids[0]);
    if (!target) return;
    this.admin.deleteProduct(target.slug).subscribe({
      next: () => {
        this.toast.success('Product deleted');
        this.products = this.products.filter((p) => !this.selectedIds.has(p.id));
        this.selectedIds.clear();
        this.computeAllSelected();
      },
      error: () => this.toast.error('Failed to delete product')
    });
  }

  onImageUpload(event: Event): void {
    if (!this.editingId) {
      this.toast.error('Save product before uploading images');
      return;
    }
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;
    this.admin.uploadProductImage(this.editingId, file).subscribe({
      next: (prod) => {
        this.productImages.set((prod as any).images || []);
        this.toast.success('Image uploaded');
      },
      error: () => this.toast.error('Image upload failed')
    });
  }

  deleteImage(id: string): void {
    if (!this.editingId) return;
    this.admin.deleteProductImage(this.editingId, id).subscribe({
      next: (prod) => {
        this.productImages.set((prod as any).images || []);
        this.toast.success('Image deleted');
      },
      error: () => this.toast.error('Failed to delete image')
    });
  }

  selectOrder(order: AdminOrder): void {
    this.activeOrder = { ...order };
  }

  filteredOrders(): AdminOrder[] {
    return this.orders.filter((o) => (this.orderFilter ? o.status === this.orderFilter : true));
  }

  toggleAll(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.allSelected = checked;
    if (checked) this.selectedIds = new Set(this.products.map((p) => p.id));
    else this.selectedIds.clear();
  }

  toggleSelect(id: string, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) this.selectedIds.add(id);
    else this.selectedIds.delete(id);
    this.computeAllSelected();
  }

  computeAllSelected(): void {
    this.allSelected = this.selectedIds.size > 0 && this.selectedIds.size === this.products.length;
  }

  changeOrderStatus(status: string): void {
    if (!this.activeOrder) return;
    this.admin.updateOrderStatus(this.activeOrder.id, status).subscribe({
      next: (order) => {
        this.toast.success('Order status updated');
        this.activeOrder = order;
        this.orders = this.orders.map((o) => (o.id === order.id ? order : o));
      },
      error: () => this.toast.error('Failed to update order status')
    });
  }

  forceLogout(): void {
    if (!this.selectedUserId) return;
    this.admin.revokeSessions(this.selectedUserId).subscribe({
      next: () => this.toast.success('Sessions revoked'),
      error: () => this.toast.error('Failed to revoke sessions')
    });
  }

  createCoupon(): void {
    if (!this.newCoupon.code) {
      this.toast.error('Coupon code is required');
      return;
    }
    this.admin.createCoupon(this.newCoupon).subscribe({
      next: (c) => {
        this.coupons = [c, ...this.coupons];
        this.toast.success('Coupon created');
      },
      error: () => this.toast.error('Failed to create coupon')
    });
  }

  toggleCoupon(coupon: AdminCoupon): void {
    this.admin.updateCoupon(coupon.id, { active: !coupon.active }).subscribe({
      next: (c) => {
        this.coupons = this.coupons.map((x) => (x.id === c.id ? c : x));
        this.toast.success('Coupon updated');
      },
      error: () => this.toast.error('Failed to update coupon')
    });
  }
}
