import { Component, OnInit, ViewChild } from '@angular/core';
import { UserModel } from 'src/app/model/User.model';
import { IUiAction } from 'src/app/ultilities/ui-action';
import { ToolBarComponent } from '../core/controls/toolbar/toolbar.component';
import { UserService } from 'src/app/service/user-service.service';
import { NotificationService } from 'src/app/service/notification.service';
import { LoadingService } from 'src/app/service/loading-service.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements IUiAction<UserModel>, OnInit  {
  title:string = "Danh sách nhân viên"
  datas: UserModel[]=[];
  @ViewChild(ToolBarComponent,{read: ToolBarComponent,static : true}) appToolbar! : ToolBarComponent;

  constructor(private userService: UserService,
    private notificationService: NotificationService, 
    private loadingService: LoadingService
  ){
  }

  ngOnInit(): void {
    // set ui action
    this.appToolbar.setUiAction(this);
    this.appToolbar.setRole("User",true,false,true);
    this.getProductList();
  } 
  
  getProductList(){
    this.loadingService.show();
    this.userService.getAll().subscribe((res:any)=>{
      this.datas = res.items;
      console.log(res.items);
      this.loadingService.hide();
    })
  }

  onAdd(): void {
     this.appToolbar.navigatePassParam('/admin/userAdd', null, { });
  }

  onEdit(item: UserModel): void {
    this.appToolbar.navigatePassParam('/admin/userEdit', {id: item.id} , { });
  }
  
  onDelete(item: UserModel): void {
    if(confirm("Bạn có thật sự muốn xóa không?"))
    {
      this.loadingService.show();
      this.userService.delete(item.id).subscribe({
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


  onSearch(): void {
    this.loadingService.show();
    this.userService.getAll().subscribe((res:any)=>{
        this.datas = res.Items;
        this.loadingService.hide();
    })
  }

  onUpdate(item: UserModel): void {
    throw new Error('Method not implemented.');
  }
  onSave(): void {
    throw new Error('Method not implemented.');
  }
}
