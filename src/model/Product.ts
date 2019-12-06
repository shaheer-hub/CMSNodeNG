export class Product{
    pName:string;
    pPrice:number;
    pDescription:string;
    pCategory:Number;
    pProdType:Number;
    pPhoto:String;
    constructor(config: IProduct) {
        this.pName = config.pName;
        this.pPrice = config.pPrice;
        this.pDescription = config.pDescription;
        this.pCategory = config.pCategory;
        this.pProdType = config.pProdType;
		this.pPhoto = config.pPhoto;
      }
}