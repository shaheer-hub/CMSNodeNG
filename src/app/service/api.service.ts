import { Injectable } from "@angular/core";
import {
  HttpHeaders,
  HttpClient,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Product } from "../../model/Product";
import { FileUploader } from 'ng2-file-upload';
const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};
@Injectable({
  providedIn: "root"
})
export class ApiService {
  baseUri: string = "http://localhost:4000/product";
  caturi: string = "http://localhost:4000/category";
  prodtypeuri: string = "http://localhost:4000/producttype";
  data: Product[];
  
  constructor(private http: HttpClient) {}
  createProduct(data): Observable<any> {
    let url = `${this.baseUri}/add`;   
    return this.http
      .post(url, data, httpOptions)
      .pipe(catchError(this.errorMgmt));
  }
  // createProduct(
  //   prod_name,
  //   prod_price,
  //   prod_description,
  //   prod_category,
  //   prod_type
  // ) {
  //   const data = {
  //     prod_name: prod_name,
  //     prod_price: prod_price,
  //     prod_description: prod_description,
  //     prod_category: prod_category,
  //     prod_type: prod_type
  //   };
  //   let url = `${this.baseUri}/add`;
  //   return this.http.post(url, data, { headers: this.headers }).pipe(map(data => new Product()));
  // }

  getProducts() {
    let url = `${this.baseUri}/get`;
    return this.http.get(url, httpOptions).pipe(catchError(this.errorMgmt));
  }
  getCategory() {
    let url = `${this.caturi}/get`;
    return this.http.get(url, httpOptions).pipe(catchError(this.errorMgmt));
  }
  getProdTypes() {
    let url = `${this.prodtypeuri}/get`;
    return this.http.get(url, httpOptions).pipe(catchError(this.errorMgmt));
  }
  getProduct(id): Observable<any> {
    let url = `${this.baseUri}/get/${id}`;
    return this.http.get(url, httpOptions).pipe(
      map((res: Response) => {
        return res || {};
      }),
      catchError(this.errorMgmt)
    );
  }
  // getCategory(){
  //   let url = `${this.caturi}/get`;
  //   return this.http.get(url, httpOptions).pipe( map((response: any) => {
  //     if (response && response.success) {
  //       let messages: Array<Category> = [];
  //       if (response.count > 0) {
  //         messages = response.messages.map(
  //           message => mapCategory(message)
  //         );
  //       }
  //       return messages;
  //     }
  //     throw new Error(response.errorMessage);
  //   }),catchError(this.errorMgmt));
  // }

  // Update employee
  updateProduct(id, data): Observable<any> {
    let url = `${this.baseUri}/update/${id}`;
    return this.http
      .put(url, data, httpOptions)
      .pipe(catchError(this.errorMgmt));
  }

  // Delete employee
  deleteProduct(id): Observable<any> {
    let url = `${this.baseUri}/delete/${id}`;
    return this.http.delete(url, httpOptions).pipe(catchError(this.errorMgmt));
  }
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = "";
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
