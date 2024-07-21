import { Injectable } from '@angular/core';
import{HttpClient, HttpEvent, HttpHandler, HttpHeaders, HttpRequest,} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { ProductModel } from '../model/Product/Product.model';
import { ProductRequestModel } from '../model/Product/ProductRequest.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://localhost:44361/api/Product';
  constructor(private HttpClient:HttpClient) { }

  getAll():Observable<ProductModel[]>{    
    return this.HttpClient.get<ProductModel[]>(this.apiUrl + "/getAll").pipe();
  }
  getAllFilter(filter: ProductRequestModel):Observable<ProductModel[]>{
    return this.HttpClient.post<ProductModel[]>(this.apiUrl + "/getAllFilter", filter).pipe();
  }
  getById(id: number):Observable<ProductModel>{
    return this.HttpClient.get<ProductModel>(this.apiUrl + `/getById?id=${id}`).pipe();
  }
  add(data: FormData):Observable<ProductModel>{
    return this.HttpClient.post<ProductModel>(this.apiUrl + "/create",data).pipe();
  }
  delete(id: number):Observable<unknown>{
     return this.HttpClient.delete(this.apiUrl + `/delete?id=${id}`).pipe();
  }
  update(data: FormData):Observable<ProductModel>{
    return this.HttpClient.put<ProductModel>(this.apiUrl + "/update",data).pipe();
  }
}
