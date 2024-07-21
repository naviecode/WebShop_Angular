import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { ProductCategoryModel } from '../model/ProductCategory/ProductCategory.model';
import { ProductCategoryRequestModel } from '../model/ProductCategory/ProductCategoryRequest.model';


@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
  private apiUrl = 'https://localhost:44361/api/ProductCategory';

  constructor(private HttpClient:HttpClient) { }

  getAll():Observable<ProductCategoryModel[]>{
    return this.HttpClient.get<ProductCategoryModel[]>(this.apiUrl + "/getAll").pipe();
  }
  getAllFilter(filter: ProductCategoryRequestModel):Observable<ProductCategoryModel[]>{
    return this.HttpClient.post<ProductCategoryModel[]>(this.apiUrl + "/getAllFilter", filter).pipe();
  }
  getCombobox():Observable<ProductCategoryModel[]>{
    return this.HttpClient.get<ProductCategoryModel[]>(this.apiUrl + "/getCombobox").pipe();
  }
  getById(id: number):Observable<ProductCategoryModel>{
    return this.HttpClient.get<ProductCategoryModel>(this.apiUrl + `/getById?id=${id}`).pipe();
  }
  add(data: FormData):Observable<ProductCategoryModel>{
    return this.HttpClient.post<ProductCategoryModel>(this.apiUrl + "/create", data).pipe();
  }
  update(data: FormData):Observable<ProductCategoryModel>{
    return this.HttpClient.put<ProductCategoryModel>(this.apiUrl + "/update",data).pipe();
  }
  delete(id: number):Observable<unknown>{
    return this.HttpClient.delete(this.apiUrl + `/delete?id=${id}`).pipe();
 }
}
