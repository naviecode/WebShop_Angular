import { Component, OnInit, ViewChild } from '@angular/core';
import { RoleModel } from 'src/app/model/Role/Role.model';
import { IUiAction } from 'src/app/ultilities/ui-action';
import { ToolBarComponent } from '../core/controls/toolbar/toolbar.component';
import { EditPageState } from 'src/app/ultilities/enum/edit-page-state';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from 'src/app/service/role-service.service copy';
import { NotificationService } from 'src/app/admin/core/controls/service/notification.service';
import { LoadingService } from 'src/app/admin/core/controls/service/loading-service.service';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html'
})
export class RoleEditComponent  implements IUiAction<RoleModel>, OnInit{
  @ViewChild(ToolBarComponent,{read: ToolBarComponent,static : true}) appToolbar! : ToolBarComponent;
  title:string = "Thêm mới quyền";
  EditPageState = EditPageState;
  editPageState:EditPageState;
  activeRoute!: ActivatedRoute;
  isShowError = false;
  selectedFile!: File;
  fileInfo: any;
  listProductCategory:RoleModel[] = [];
  filterInput: RoleModel;
  inputModel: RoleModel = new RoleModel();
  myForm!: FormGroup;

  constructor(
  private activatedRoute: ActivatedRoute,
  private roleService: RoleService,
  private notificationService: NotificationService, 
  private loadingService: LoadingService,
  private fb: FormBuilder){

    this.filterInput = new RoleModel();
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
    this.myForm = this.fb.group({
      name: ['',Validators.required],
      nomalizeName: ['',Validators.required],
      metaKeyWord: ['', Validators.required],
      metaDesc: ['', Validators.required],
      status: ['',null]
   });

    // set ui action
    this.appToolbar.setUiAction(this);
    this.appToolbar.setRole("Role",false,false,false);
    switch(this.editPageState)
    {
        case EditPageState.add:
          break;
        case EditPageState.edit:
          this.loadingService.show();
          this.roleService.getById(this.inputModel.id).subscribe({
            next:(res:any)=>{
              this.inputModel = res.data;
              this.loadingService.hide();
            },
            error:(error: any)=>{
              this.notificationService.showErrorNoti("Lỗi hệ thống", error);
              this.loadingService.hide();
            }
          })      
          break;
    }  
  } 

 

  onBack():void{
    this.appToolbar.navigatePassParam('/admin/role', null, { });
  }

  SaveInput(): void{
    if(this.myForm.invalid)
    {
      this.isShowError = true;
      return;
    }
    this.loadingService.show();
    if(this.inputModel.id == null)
    {
      this.roleService.add(this.inputModel).subscribe({
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
      this.roleService.update(this.inputModel).subscribe({
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
 
  onSave(): void {
    throw new Error('Method not implemented.');
  }
  onUpdate(item: RoleModel): void {
    throw new Error('Method not implemented.');
  }

  onAdd(): void {
    throw new Error('Method not implemented.');
  }
  onDelete(item: RoleModel): void {
    throw new Error('Method not implemented.');
  }
  
  onSearch(): void {
    throw new Error('Method not implemented.');
  }

  onEdit(item: RoleModel): void {
    throw new Error('Method not implemented.');
  }

}
