import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductModel } from 'src/app/model/Product.model';
import { IUiAction } from 'src/app/ultilities/ui-action';
import { ToolBarComponent } from '../core/controls/toolbar/toolbar.component';
import { EditPageState } from 'src/app/ultilities/enum/edit-page-state';
import { ActivatedRoute } from '@angular/router';
import { ProductCategoryModel } from 'src/app/model/ProductCategory.model';
import { ProductCategoryService } from 'src/app/service/product-category-service.service';
import { ProductService } from 'src/app/service/product-service.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/service/notification.service';
import { LoadingService } from 'src/app/service/loading-service.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
})
export class ProductEditComponent implements IUiAction<ProductModel>, OnInit {

    @ViewChild(ToolBarComponent,{read: ToolBarComponent,static : true}) appToolbar! : ToolBarComponent;
    myForm!: FormGroup;
    title:string = "Thêm mới sản phẩm";
    EditPageState = EditPageState;
    editPageState:EditPageState;
    activeRoute!: ActivatedRoute;
    isLoading: boolean = false;
    loadingTitle: string = "Loading";
    selectedFile!: File;
    fileInfo: any;
    selectedFiles!: FileList;
    isShowError = false;
    //fileInfos!: FileInfo[];
    listProduct:ProductModel[] = [];
    listProductCategory:ProductCategoryModel[] = [];
    filterInput: ProductModel;
    inputModel: ProductModel = new ProductModel();

    public Editor = ClassicEditor;

    constructor(
      private activatedRoute: ActivatedRoute,
      private productCategoryService: ProductCategoryService,
      private productService: ProductService,
      private notificationService: NotificationService, 
      private loadingService: LoadingService,
      private fb: FormBuilder){
        this.filterInput = new ProductModel();
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
        name: ['',Validators.required],
        alias: ['',Validators.required],
        categoryID: ['', Validators.required],
        warranty: ['',Validators.required],
        price: ['',[
          Validators.required,
          Validators.min(0),
          Validators.pattern("[0-9]+")
        ]],
        promotion: ['',[
          Validators.min(0),
          Validators.pattern("[0-9]+")
        ]],
        image: ['',null],
        tags:['',Validators.required],
        status: ['',null],
        metaKeyWord:['',null],
        metaDesc:['',null],
        description:['',null],
        homeFlag:['',null],
        hotFlag:['',null]
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
            this.productService.getById(this.inputModel.id).subscribe({
              next:(res:any)=>{
                if(res.code == 0)
                {
                  this.inputModel = res;
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
  
      //Combobox ProductCategory
      this.productCategoryService.getAll().subscribe((res:any)=>{
        this.listProductCategory = res.items;
      })    
    } 
  
    onSave(): void {
      throw new Error('Method not implemented.');
    }
    onUpdate(item: ProductModel): void {
      throw new Error('Method not implemented.');
    }
  
    onAdd(): void {
    }
    onDelete(item: ProductModel): void {
    }
    
    onSearch(): void {

    }
  
    onEdit(item: ProductModel): void {
      
    }
  
    onBack():void{
      this.appToolbar.navigatePassParam('/admin/product', null, { });
    }
  
    SaveInput(): void{
      if(this.myForm.invalid)
      {
          this.isShowError = true;
          return;
      }

      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('productData', JSON.stringify(this.inputModel));
      this.loadingService.show();
      if(this.inputModel.id == null)
      {
        this.productService.add(formData).subscribe({
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
        this.productService.update(formData).subscribe({
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
    selectedChange(event: any){
      this.inputModel.categoryID = event.target.value;
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
}
