import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductGetComponent} from '../app/components/product-get/product-get.component';
import {ProductAddComponent} from '../app/components/product-add/product-add.component';

const routes: Routes = [
  {path:"product", pathMatch:'full', redirectTo:'product-get'},
  {path:'product/products-get', component:ProductGetComponent},
  {path:"product/product-add", component:ProductAddComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
