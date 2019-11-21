import { Injectable } from '@angular/core';
import { HttpHeaders,HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError , map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUri:string = "http://localhost:4000/product";
  headers = new HttpHeaders().set('Content-Type','application/json');
  constructor(private http:HttpClient) { 

  }
  createProduct(data): Observable<any> {
    let url = `${this.baseUri}/add`;
    return this.http.post(url, data).pipe(
      catchError(this.errorMgmt)
    )
  }
  getProducts() {
    let url = `${this.baseUri}/get`;
    return this.http.get(url).pipe(
      catchError(this.errorMgmt)
    )
  }
  getProduct(id): Observable<any> {
    let url = `${this.baseUri}/get/${id}`;
    return this.http.get(url, {headers: this.headers}).pipe(
      map((res: Response) => {
        return res || {}
      }),
      catchError(this.errorMgmt)
    )
  }

  // Update employee
  updateProduct(id, data): Observable<any> {
    let url = `${this.baseUri}/update/${id}`;
    return this.http.put(url, data, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }

  // Delete employee
  deleteProduct(id): Observable<any> {
    let url = `${this.baseUri}/delete/${id}`;
    return this.http.delete(url, { headers: this.headers }).pipe(
      catchError(this.errorMgmt)
    )
  }
  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
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
