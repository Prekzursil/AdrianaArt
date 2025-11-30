import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ErrorComponent } from './pages/error/error.component';
import { ShopComponent } from './pages/shop/shop.component';
import { ProductComponent } from './pages/product/product.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'AdrianaArt' },
  { path: 'shop', component: ShopComponent, title: 'Shop | AdrianaArt' },
  { path: 'products/:slug', component: ProductComponent, title: 'Product | AdrianaArt' },
  { path: 'error', component: ErrorComponent, title: 'Something went wrong' },
  { path: '**', component: NotFoundComponent, title: 'Not Found' }
];
