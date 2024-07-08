export class ProductCategoryModel{
    id:number=0;
    name:string="";
    alias:string="";
    description:string="";
    parentID: number =0;
    displayOrder: number = 0;
    imageKey: string = "";
    image: string = "";
    homeFlag: boolean = false;
    createdDate:Date = new Date();
    createdBy: string = "";
    updatedDate: Date = new Date();
    updatedBy: string = "";
    metaKeyWord: string = "";
    metaDesc: string = "";
    status: Boolean = false;
}