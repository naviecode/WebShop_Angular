import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ProductCategoryComponent } from './product-category/product-category-list.component';
import { ProductCategoryEditComponent } from './product-category/product-category-edit.component';
import { EditPageState } from '../ultilities/enum/edit-page-state';
import { ProductListComponent } from './product/product-list.component';
import { ProductEditComponent } from './product/product-edit.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './core/authService/auth.guard';
import { UserListComponent } from './user/user-list.component';
import { UserEditComponent } from './user/user-edit.component';

const routes: Routes = [
  {path:'login', component: LoginComponent},
  {
    path : 'admin',
    component : AdminComponent,
    children:[
      {
        path: 'productCategory',
        component: ProductCategoryComponent,
        data:{permission:'Pages.Administration.ProductCategory'}
      },
      {
        path: 'productCategoryAdd',
        component: ProductCategoryEditComponent,
        data:{permission:'Pages.Administration.ProductCategory.Create', editPageState: EditPageState.add}
      },
      {
        path: 'productCategoryEdit',
        component: ProductCategoryEditComponent,
        data:{permission:'Pages.Administration.ProductCategory.Edit', editPageState: EditPageState.edit}
      },
      {
        path: 'product',
        component: ProductListComponent,
        data:{permission:'Pages.Administration.Product'}
      },
      {
        path: 'productAdd',
        component: ProductEditComponent,
        data:{permission:'Pages.Administration.Product.Create',  editPageState: EditPageState.add}
      },
      {
        path: 'productEdit',
        component: ProductEditComponent,
        data:{permission:'Pages.Administration.Product.Edit',  editPageState: EditPageState.edit}
      },
      {
        path: 'user',
        component: UserListComponent,
        data:{permission:'Pages.Administration.User'}
      },
      {
        path: 'userAdd',
        component: UserEditComponent,
        data:{permission:'Pages.Administration.User.Create',  editPageState: EditPageState.add}
      },
      {
        path: 'userEdit',
        component: UserEditComponent,
        data:{permission:'Pages.Administration.User.Edit',  editPageState: EditPageState.edit}
      }
    ],
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
