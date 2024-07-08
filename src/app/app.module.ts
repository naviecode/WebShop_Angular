import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { ClientHomeComponent } from './client/client-home/client-home.component';
import { ClientComponent } from './client/client.component';
import { ClientRoutingModule } from './client/client-routing.module';
import { AdminRoutingModule } from './admin/admin-routing.module';
import { ProductCategoryComponent } from './admin/product-category/product-category-list.component';
import { ToolBarComponent } from './admin/core/controls/toolbar/toolbar.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductCategoryEditComponent } from './admin/product-category/product-category-edit.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductListComponent } from './admin/product/product-list.component';
import { ProductEditComponent } from './admin/product/product-edit.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { LoginComponent } from './admin/login/login.component';
import { JwtModule } from '@auth0/angular-jwt';
import { NotificationComponent } from './admin/core/controls/notification/notification.component';
import { LoadingComponent } from './admin/core/controls/loading/loading.component';
import { UserListComponent } from './admin/user/user-list.component';
import { UserEditComponent } from './admin/user/user-edit.component';

export function tokenGetter(){
  return localStorage.getItem("token");
}
@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    ClientHomeComponent,
    ClientComponent,
    ProductCategoryComponent,
    ProductCategoryEditComponent,
    ToolBarComponent,
    ProductListComponent,
    ProductEditComponent,
    LoginComponent,
    NotificationComponent,
    LoadingComponent,
    UserListComponent,
    UserEditComponent
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClientRoutingModule,
    AdminRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    CKEditorModule,
    JwtModule.forRoot({
      config: {
         tokenGetter: tokenGetter,
         allowedDomains: ['https://localhost:44361'],
         disallowedRoutes: ['https://localhost:44361/api/Auth/login']
      }
    })
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
