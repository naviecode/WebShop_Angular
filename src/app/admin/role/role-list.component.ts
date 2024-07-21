import { Component, OnInit, ViewChild } from '@angular/core';
import { IUiAction } from 'src/app/ultilities/ui-action';
import { ToolBarComponent } from '../core/controls/toolbar/toolbar.component';
import { NotificationService } from 'src/app/admin/core/controls/service/notification.service';
import { LoadingService } from 'src/app/admin/core/controls/service/loading-service.service';
import { RoleModel } from 'src/app/model/Role/Role.model';
import { RoleService } from 'src/app/service/role-service.service copy';
import { RoleRequestModel } from 'src/app/model/Role/RoleRequest.model';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html'
})
export class RoleListComponent implements IUiAction<RoleModel>, OnInit {
  title: string = "Danh sách quyền";
  datas: RoleModel[]=[];
  inputModel: RoleRequestModel = new RoleRequestModel();
  totalItems!:number;
  currentPage:number = 1;
  itemsPerPage:number = 5;

  @ViewChild(ToolBarComponent,{read: ToolBarComponent,static : true}) appToolbar! : ToolBarComponent;

  constructor(private roleService: RoleService,
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
    this.roleService.getAllFilter(this.inputModel).subscribe((res:any)=>{
      this.datas = res.items;
      this.totalItems = res.totalItem;
      if(Math.ceil(this.totalItems / this.itemsPerPage) < this.currentPage)
      {
        this.currentPage = Math.ceil(this.totalItems / this.itemsPerPage);
      }
      else{
        this.currentPage = 1;
      }
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      this.datas = this.datas.slice(startIndex, startIndex + this.itemsPerPage);
      this.loadingService.hide();
    })
  }

  onAdd(): void {
     this.appToolbar.navigatePassParam('/admin/roleAdd', null, { });
  }

  onEdit(item: RoleModel): void {
    this.appToolbar.navigatePassParam('/admin/roleEdit', {id: item.id} , { });
  }
  
  onDelete(item: RoleModel): void {
    if(confirm("Bạn có thật sự muốn xóa không?"))
    {
      this.loadingService.show();
      this.roleService.delete(item.id).subscribe({
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
  
  onSearch(): void {
    this.getProductList();
  }
  selectedChange(event: any){
    this.inputModel.status = event.target.value == 'true' ? true : false;
  }
  onPageChanged(page: number) {
    this.currentPage = page;
    this.getProductList();
  }
  onSave(): void {
    throw new Error('Method not implemented.');
  }
  onUpdate(item: RoleModel): void {
    throw new Error('Method not implemented.');
  }

}
