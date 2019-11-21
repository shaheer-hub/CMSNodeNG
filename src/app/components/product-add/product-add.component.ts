import { Component, OnInit, NgZone } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ApiService } from "src/app/service/api.service";
@Component({
  selector: "app-product-add",
  templateUrl: "./product-add.component.html",
  styleUrls: ["./product-add.component.css"]
})
export class ProductAddComponent implements OnInit {
  submitted = false;
  productForm: FormGroup;

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
      prod_productType: ["", [Validators.required]]
    });
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
  onSubmit(){
    this.submitted = true;
    if (!this.productForm.valid) {
      return false;
    } else {
      this.apiService.createProduct(this.productForm.value).subscribe(
        (res) => {
          console.log('Product successfully created!')
          this.ngZone.run(() => this.router.navigateByUrl('product/products-get'))
        }, (error) => {
          console.log(error);
        });
  }
  }
  ngOnInit() {}
}
