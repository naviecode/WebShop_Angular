import { Component, OnInit, ViewChild } from '@angular/core';
import { UserModel } from 'src/app/model/User/User.model';
import { IUiAction } from 'src/app/ultilities/ui-action';
import { EditPageState } from 'src/app/ultilities/enum/edit-page-state';

import { ToolBarComponent } from '../core/controls/toolbar/toolbar.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service/user-service.service';
import { NotificationService } from 'src/app/admin/core/controls/service/notification.service';
import { LoadingService } from 'src/app/admin/core/controls/service/loading-service.service';
import { RoleService } from 'src/app/service/role-service.service copy';
import { RoleModel } from 'src/app/model/Role/Role.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html'
})
export class UserEditComponent implements IUiAction<UserModel>, OnInit {
  @ViewChild(ToolBarComponent,{read: ToolBarComponent,static : true}) appToolbar! : ToolBarComponent;
  myForm!: FormGroup;
  title:string = "Thêm mới người dùng";
  EditPageState = EditPageState;
  editPageState:EditPageState;
  activeRoute!: ActivatedRoute;
  selectedFile!: File;
  fileInfo: any;
  selectedFiles!: FileList;
  isShowError = false;
  listUser:UserModel[] = [];
  listRole: RoleModel[] = [];
  filterInput: UserModel;
  inputModel: UserModel = new UserModel();

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private roleService: RoleService,
    private notificationService: NotificationService, 
    private loadingService: LoadingService,
    private fb: FormBuilder){
      this.filterInput = new UserModel();
      this.editPageState = this.getRouteData('editPageState');
      this.inputModel.id = this.getRouteParam('id');
  }

  getRouteData(key: string): any {
    return (this.activatedRoute.data as any).value[key];
  }
  getRouteParam(key: string): any {
    return (this.activatedRoute.params as any).value[key];
  }
  ngOnInit(): void {
    //Khởi tạo validation từ submit
    this.myForm = this.fb.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      userName: ['', Validators.required],
      imageName: ['',null],
      imageKey: ['',null],
      email: ['',null],
      phoneNumber: ['',null]
   });

    // set ui action
    this.appToolbar.setUiAction(this);
    this.appToolbar.setRole("User",false,false,false);
    switch(this.editPageState)
    {
        case EditPageState.add:
          this.title = "Thêm mới thông tin người dùng";
          break;
        case EditPageState.edit:
          this.title = "Điều chỉnh thông tin người dùng";
          this.loadingService.show();
          this.userService.getById(this.inputModel.id).subscribe({
            next:(res:any)=>{
              if(res.code == 0)
              {
                this.inputModel = res.data;
                console.log(this.inputModel);
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
          })      
          break;
    }


    //get combobox role
    this.roleService.getCombobox().subscribe((res:any)=>{
      this.listRole = res.items;
    })    
  } 

  onBack():void{
    this.appToolbar.navigatePassParam('/admin/user', null, { });
  }

  SaveInput(): void{
    if(this.myForm.invalid)
    {
      this.isShowError = true;
      return;
    }
    console.log(this.inputModel)

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('userData', JSON.stringify(this.inputModel));
    this.loadingService.show();
    if(this.inputModel.id == null)
    {
      this.userService.add(formData).subscribe({
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
    else{
      this.userService.update(formData).subscribe({
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

  onSelectFile(event: any) {
    this.selectedFile = event.target.files[0];
    this.inputModel.imageName = event.target.files[0].name;
  }

  onSelectRoleId(id:number){
    this.inputModel.roleId = id;
  }

  onSave(): void {
    throw new Error('Method not implemented.');
  }
  onUpdate(item: UserModel): void {
    throw new Error('Method not implemented.');
  }

  onAdd(): void {
    throw new Error('Method not implemented.');
  }
  onDelete(item: UserModel): void {
    throw new Error('Method not implemented.');
  }
  
  onSearch(): void {
    throw new Error('Method not implemented.');
  }

  onEdit(item: UserModel): void {
    throw new Error('Method not implemented.');
  }

}
