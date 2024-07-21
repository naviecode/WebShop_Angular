export class RoleModel{
    id: number = 0;
    name:string = "";
    nomalizeName:string="";
    createdDate!:Date;
    createdBy: string = "";
    updatedDate!: Date;
    updatedBy: string = "";
    metaKeyWord: string = "";
    metaDesc: string = "";
    status: Boolean = false;
}