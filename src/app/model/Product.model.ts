export class ProductModel{
    id:number=0;
    name:string="";
    alias:string="";
    categoryID!:number;
    image: string = "";
    imageKey: string = "";
    moreImages:string = "";
    price: number = 0;
    promotion!: number;
    warranty!: number;
    description:string="";
    content: string = "";
    hotFlag!: boolean;
    homeFlag: boolean = false;
    viewCount!: number;
    createdDate!:Date;
    createdBy: string = "";
    updatedDate!: Date;
    updatedBy: string = "";
    metaKeyWord: string = "";
    metaDesc: string = "";
    status: Boolean = false;
    tags: string = "";
}