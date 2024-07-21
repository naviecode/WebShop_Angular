import { Component, OnInit, ViewChild } from '@angular/core';
import { IUiAction } from 'src/app/ultilities/ui-action';
import { ToolBarComponent } from '../core/controls/toolbar/toolbar.component';
import { ProductCategoryService } from 'src/app/service/product-category-service.service';
import { ProductCategoryModel } from 'src/app/model/ProductCategory/ProductCategory.model';
import { NotificationService } from 'src/app/admin/core/controls/service/notification.service';
import { LoadingService } from 'src/app/admin/core/controls/service/loading-service.service';
import { ProductCategoryRequestModel } from 'src/app/model/ProductCategory/ProductCategoryRequest.model';

@Component({
  selector: 'app-product-category-list',
  templateUrl: './product-category-list.component.html'
})
export class ProductCategoryComponent implements IUiAction<ProductCategoryModel>, OnInit {  
  title: string = "Danh sách danh mục sản phẩm";
  datas: ProductCategoryModel[]=[];
  inputModel: ProductCategoryRequestModel = new ProductCategoryRequestModel();
  totalItems!:number;
  currentPage:number = 1;
  itemsPerPage:number = 5;
  @ViewChild(ToolBarComponent,{read: ToolBarComponent,static : true}) appToolbar! : ToolBarComponent;

  constructor(private productCategoryService: ProductCategoryService,
  private notificationService: NotificationService, 
  private loadingService: LoadingService
  ){
  }

  ngOnInit(): void {
    // set ui action
    this.appToolbar.setUiAction(this);
    this.appToolbar.setRole("ProductCategory",true,false,true);
    this.getProductList();
  } 

  getProductList(){
    this.loadingService.show();
    this.productCategoryService.getAllFilter(this.inputModel).subscribe((res:any)=>{
      this.datas = res.items;
      this.totalItems = res.totalItem;
      if(Math.ceil(this.totalItems / this.itemsPerPage) < this.currentPage)
      {
        this.currentPage = Math.ceil(this.totalItems / this.itemsPerPage);
      }else{
        this.currentPage = 1;
      }
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      this.datas = this.datas.slice(startIndex, startIndex + this.itemsPerPage);

      this.loadingService.hide();
    })
  }

  selectedChange(event: any){
    this.inputModel.status = event.target.value == 'true' ? true : false;
  }

  onPageChanged(page: number) {
    this.currentPage = page;
    this.getProductList();
  }
  onSearch(): void {
    this.getProductList();
  }
  onAdd(): void {
     this.appToolbar.navigatePassParam('/admin/productCategoryAdd', null, { });
  }

  onEdit(item: ProductCategoryModel): void {
    this.appToolbar.navigatePassParam('/admin/productCategoryEdit', {id: item.id} , { });
  }
  
  onDelete(item: ProductCategoryModel): void {
    if(confirm("Bạn có thật sự muốn xóa không?"))
    {
      this.loadingService.show();
      this.productCategoryService.delete(item.id).subscribe({
        next:(res:any)=>{
          this.getProductList();
          this.notificationService.showSuccessNoti(res.message, res.attr);
          this.loadingService.hide();
        },
        error:(error: any)=>{
          this.notificationService.showSuccessNoti("Lỗi hệ thống", error.attr);
          this.loadingService.hide();
        }
      });
    }
   
  }
  
 
  onSave(): void {
    throw new Error('Method not implemented.');
  }
  onUpdate(item: ProductCategoryModel): void {
    throw new Error('Method not implemented.');
  }


}
