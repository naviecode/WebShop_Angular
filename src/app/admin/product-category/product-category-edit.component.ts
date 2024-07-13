import { Component, OnInit, ViewChild } from '@angular/core';
import { IUiAction } from 'src/app/ultilities/ui-action';
import { ToolBarComponent } from '../core/controls/toolbar/toolbar.component';
import { ProductCategoryService } from 'src/app/service/product-category-service.service';
import { ProductCategoryModel } from 'src/app/model/ProductCategory.model';
import { EditPageState } from 'src/app/ultilities/enum/edit-page-state';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/service/notification.service';
import { LoadingService } from 'src/app/service/loading-service.service';

@Component({
  selector: 'app-product-category-edit',
  templateUrl: './product-category-edit.component.html'
})
export class ProductCategoryEditComponent implements IUiAction<ProductCategoryModel>, OnInit {
  
  @ViewChild(ToolBarComponent,{read: ToolBarComponent,static : true}) appToolbar! : ToolBarComponent;
  title:string = "Thêm mới danh mục sản phẩm";
  EditPageState = EditPageState;
  editPageState:EditPageState;
  activeRoute!: ActivatedRoute;
  isShowError = false;
  selectedFile!: File;
  fileInfo: any;
  listProductCategory:ProductCategoryModel[] = [];
  filterInput: ProductCategoryModel;
  inputModel: ProductCategoryModel = new ProductCategoryModel();
  myForm!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productCategoryService: ProductCategoryService,
    private notificationService: NotificationService, 
    private loadingService: LoadingService,
    private fb: FormBuilder){
      this.filterInput = new ProductCategoryModel();
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
      alias: ['',Validators.required],
      image: ['',null],
      description: ['', null],
      parentID: ['', null],
      displayOrder: ['', null],
      metaKeyWord: ['', Validators.required],
      metaDesc: ['', Validators.required],
      status: ['',null],
      homeFlag: ['',null],
   });

    // set ui action
    this.appToolbar.setUiAction(this);
    this.appToolbar.setRole("ProductCategory",false,false,false);
    switch(this.editPageState)
    {
        case EditPageState.add:
          break;
        case EditPageState.edit:
          this.loadingService.show();
          this.productCategoryService.getById(this.inputModel.id).subscribe({
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

    //combobx ProductCategory
    this.productCategoryService.getAll().subscribe((res:any)=>{
      this.listProductCategory = res.items;
      this.listProductCategory = this.listProductCategory.filter(x=>x.id != this.inputModel.id);
    })    

  } 

 

  onBack():void{
    this.appToolbar.navigatePassParam('/admin/productCategory', null, { });
  }

  SaveInput(): void{
    if(this.myForm.invalid)
    {
      this.isShowError = true;
      return;
    }

    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('productCategoryData', JSON.stringify(this.inputModel));
    this.loadingService.show();
    if(this.inputModel.id == null)
    {
      this.productCategoryService.add(formData).subscribe({
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
      this.productCategoryService.update(formData).subscribe({
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
    this.inputModel.image = event.target.files[0].name;
  }
   
  aliasChange(event:any){
    this.inputModel.alias = this.generateSeoTitle(event.target.value)
  }

  generateSeoTitle(title: string): string {
    if(title == null) return "";
    title = title.toLowerCase();
    title = title.trimStart();
    title = title.trimEnd();
    title = title.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    title = title.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    title = title.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    title = title.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    title = title.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    title = title.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    title = title.replace(/đ/g, "d");
    // Loại bỏ ký tự đặc biệt
    let sanitizedTitle = title.replaceAll(' ', '-'); 

    // Cắt ngắn tiêu đề nếu quá dài
    const maxLength = 55;
    if (sanitizedTitle.length > maxLength) {
      sanitizedTitle = sanitizedTitle.substring(0, maxLength) + '...';
    }
    return sanitizedTitle;
  }

  onSave(): void {
    throw new Error('Method not implemented.');
  }
  onUpdate(item: ProductCategoryModel): void {
    throw new Error('Method not implemented.');
  }

  onAdd(): void {
    throw new Error('Method not implemented.');
  }
  onDelete(item: ProductCategoryModel): void {
    throw new Error('Method not implemented.');
  }
  
  onSearch(): void {
    throw new Error('Method not implemented.');
  }

  onEdit(item: ProductCategoryModel): void {
    throw new Error('Method not implemented.');
  }


}
