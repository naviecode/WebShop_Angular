import { Component, OnInit, ViewChild } from '@angular/core';
import { UserModel } from 'src/app/model/User/User.model';
import { IUiAction } from 'src/app/ultilities/ui-action';
import { ToolBarComponent } from '../core/controls/toolbar/toolbar.component';
import { UserService } from 'src/app/service/user-service.service';
import { NotificationService } from 'src/app/admin/core/controls/service/notification.service';
import { LoadingService } from 'src/app/admin/core/controls/service/loading-service.service';
import { UserRequestModel } from 'src/app/model/User/UserRequest.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../core/ultils/validationCustom/password-match.validator';
import { RegisterModel } from 'src/app/model/Other/Register.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements IUiAction<UserModel>, OnInit  {
  title:string = "Danh sách nhân viên"
  datas: UserModel[]=[];
  inputModel: UserRequestModel = new UserRequestModel();

  isRegister: boolean = true;
  isShowError: boolean = false;
  boxShadowData: RegisterModel = new RegisterModel();
  titleBoxModal: string = "";
  myForm!: FormGroup;

  totalItems!:number;
  currentPage:number = 1;
  itemsPerPage:number = 5;
  @ViewChild(ToolBarComponent,{read: ToolBarComponent,static : true}) appToolbar! : ToolBarComponent;

  constructor(private userService: UserService,
    private notificationService: NotificationService, 
    private loadingService: LoadingService,
    private fb: FormBuilder
  ){
  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      passWord: ['',Validators.required],
      newPassword:['', Validators.required],
      confirmPassWord: ['', Validators.required]
    });
    // set ui action
    this.appToolbar.setUiAction(this);
    this.appToolbar.setRole("User",true,false,true);
    this.getProductList();
  } 
  
  getProductList(){
    this.loadingService.show();
    this.userService.getAllFilter(this.inputModel).subscribe((res:any)=>{
      this.datas = res.items;
      this.totalItems = res.totalItem;

      if(Math.ceil(this.totalItems / this.itemsPerPage) < this.currentPage)
      {
        this.currentPage = Math.ceil(this.totalItems / this.itemsPerPage);
      } else{
        this.currentPage = 1;
      }
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      this.datas = this.datas.slice(startIndex, startIndex + this.itemsPerPage);
      this.loadingService.hide();
    })
  }

  onAdd(): void {
     this.appToolbar.navigatePassParam('/admin/userAdd', null, { });
  }

  onEdit(item: UserModel): void {
    this.appToolbar.navigatePassParam('/admin/userEdit', {id: item.id} , { });
  }

  onRegister(item: UserModel): void {
    this.myForm = this.fb.group({
      passWord: ['',Validators.required],
      confirmPassWord: ['', Validators.required]
    },{
      validator: MustMatch('passWord', 'confirmPassWord')
    });
    this.titleBoxModal = "Đăng ký tài khoản";
    this.isRegister = true;
    this.loadingService.show();
    this.userService.getById(item.id).subscribe({
      next:(res:any)=>{
        if(res.code == 0)
        {
          this.boxShadowData = res.data;
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
  onChangePass(item: UserModel): void {
    this.myForm = this.fb.group({
      passWord: ['',Validators.required],
      newPassword:['', Validators.required],
      confirmNewPassword: ['', Validators.required]
    },{
      validator: MustMatch('newPassword', 'confirmNewPassword')
    });
    this.titleBoxModal = "Đổi mật khẩu";
    this.isRegister = false;
    this.loadingService.show();
    this.userService.getById(item.id).subscribe({
      next:(res:any)=>{
        if(res.code == 0)
        {
          this.boxShadowData = res.data;
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

  submitBoxModal(){
    if(this.myForm.invalid)
    {
      this.isShowError = true;
      return;
    }
    if(this.isRegister){
      this.loadingService.show();
      this.userService.register(this.boxShadowData).subscribe({
        next:(res:any)=>{
          if(res.code == 0)
          {
            this.notificationService.showSuccessNoti(res.message, "");
          }
          else{
            this.notificationService.showErrorNoti(res.message, res.attr);
          }
          this.loadingService.hide();
        },
        error:(error: any)=>{
          this.notificationService.showErrorNoti("Lỗi hệ thống", error);
          this.loadingService.hide();
        }
      });
    }else{
      this.loadingService.show();
      this.userService.changePassword(this.boxShadowData).subscribe({
        next:(res:any)=>{
          if(res.code == 0)
          {
            this.notificationService.showSuccessNoti(res.message, "");
          }
          else{
            this.notificationService.showErrorNoti(res.message, res.attr);
          }
          this.loadingService.hide();
        },
        error:(error: any)=>{
          this.notificationService.showErrorNoti("Lỗi hệ thống", error);
          this.loadingService.hide();
        }
      });
    }


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

  onPageChanged(page: number) {
    this.currentPage = page;
    this.getProductList();
  }
  onSearch(): void {
    this.getProductList();
  }

  onUpdate(item: UserModel): void {
    throw new Error('Method not implemented.');
  }
  onSave(): void {
    throw new Error('Method not implemented.');
  }
}
