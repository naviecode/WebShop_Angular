import { Component, OnInit, ViewChild } from '@angular/core';
import { IUiAction } from 'src/app/ultilities/ui-action';
import { ToolBarComponent } from '../core/controls/toolbar/toolbar.component';
import { ProductModel } from 'src/app/model/Product.model';
import { ProductService } from 'src/app/service/product-service.service';
import { NotificationService } from 'src/app/service/notification.service';
import { LoadingService } from 'src/app/service/loading-service.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
})
export class ProductListComponent implements IUiAction<ProductModel>, OnInit {
  title:string = "Danh sách sản phẩm"
  datas: ProductModel[]=[];
  @ViewChild(ToolBarComponent,{read: ToolBarComponent,static : true}) appToolbar! : ToolBarComponent;

  constructor(private productService: ProductService,
    private notificationService: NotificationService, 
    private loadingService: LoadingService
  ){
  }

  ngOnInit(): void {
    // set ui action
    this.appToolbar.setUiAction(this);
    this.appToolbar.setRole("Product",true,false,true);
    this.getProductList();
  } 
  getProductList(){
    this.loadingService.show();
    this.productService.getAll().subscribe((res:any)=>{
      this.datas = res.items;
      this.loadingService.hide();
    })
  }

  onAdd(): void {
     this.appToolbar.navigatePassParam('/admin/productAdd', null, { });
  }

  onEdit(item: ProductModel): void {
    this.appToolbar.navigatePassParam('/admin/productEdit', {id: item.id} , { });
  }
  
  onDelete(item: ProductModel): void {
    if(confirm("Bạn có thật sự muốn xóa không?"))
    {
      this.loadingService.show();
      this.productService.delete(item.id).subscribe({
        next:(res:any)=>{
          if(res.code == 0)
          {
            this.getProductList();
            this.loadingService.hide();
          }
          else{
            this.notificationService.showErrorNoti(res.message, res.attr);
            this.loadingService.hide();
          }
        },
        error:(error: any)=>{
          this.notificationService.showErrorNoti("Lỗi hệ thống", error);
          this.loadingService.hide();
        }
          
      });
    }
   
  }
  onSave(): void {
    throw new Error('Method not implemented.');
  }
  onSearch(): void {
    this.loadingService.show();
    this.productService.getAll().subscribe((res:any)=>{
        this.datas = res.Items;
        this.loadingService.hide();
    })
  }

  onUpdate(item: ProductModel): void {
    
  }
}
