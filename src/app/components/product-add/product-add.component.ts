import { Component, OnInit, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators, NgForm } from "@angular/forms";
import { ApiService } from "src/app/service/api.service";
import { Category } from 'src/model/Category';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload';



@Component({
  selector: "app-product-add",
  templateUrl: "./product-add.component.html",
  styleUrls: ["./product-add.component.css"]
})

export class ProductAddComponent implements OnInit {
  submitted = false;
  productForm: FormGroup;
  Category:any = [];
  ProductType:any = [];
  prodAdduri: string = "http://localhost:4000/product/add";
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private apiService: ApiService
  ) {
    this.mainForm();
  }
  
  mainForm() {
    this.productForm = this.fb.group({
      prod_name: ["", [Validators.required]],
      prod_price: ["", [Validators.required, Validators.pattern("^[0-9]+$")]],
      prod_description: ["", [Validators.required]],
      prod_category: ["", [Validators.required]],
      prod_productType: ["", [Validators.required]],
      prod_photo: [""]
    });
  }

  getAllCategories(){
    this.apiService.getCategory().subscribe((data) => {
      this.Category = data;
    })
  }
  getAllProdType(){
    this.apiService.getProdTypes().subscribe((data) => {
      this.ProductType = data;
    })
  }
  
  updateCategory(e) {
    this.productForm.get("prod_category").setValue(e, {
      onlySelf: true
    });
  }
  updateProductType(e) {
    this.productForm.get("prod_productType").setValue(e, {
      onlySelf: true
    });
  }
  get myForm() {
    return this.productForm.controls;
  }
  onSubmit(form:NgForm){
    this.submitted = true;
    if (!this.productForm.valid) {
      return false;
    } else {
      
      this.apiService.createProduct(form).subscribe(
        (res) => {
          console.log('Product successfully created!')
          this.ngZone.run(() => this.router.navigateByUrl('product/products-get'))
        }, (error) => {
          console.log(error);
        });
  }
  }
  public uploader: FileUploader = new FileUploader({url: this.prodAdduri, itemAlias: 'photo'});
  ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         console.log('ImageUpload:uploaded:', item, status, response);
         alert('File uploaded successfully');
     };
    this.getAllCategories();
    this.getAllProdType();
  }
}
