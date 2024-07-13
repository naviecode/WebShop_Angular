import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { ProductCategoryModel } from '../model/ProductCategory.model';

const apiUrl = 'https://localhost:44361/api/ProductCategory';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
  private token = localStorage.getItem("accessToken") ?? "";
  private headers = new HttpHeaders().set(
    "Authorization", 
    this.token
  );
  constructor(private HttpClient:HttpClient) { }

  getAll():Observable<ProductCategoryModel[]>{
    return this.HttpClient.get<ProductCategoryModel[]>(apiUrl + "/getAll").pipe();
  }
  getCombobox():Observable<ProductCategoryModel[]>{
    return this.HttpClient.get<ProductCategoryModel[]>(apiUrl + "/getCombobox").pipe();
  }
  getById(id: number):Observable<ProductCategoryModel>{
    return this.HttpClient.get<ProductCategoryModel>(apiUrl + `/getById?id=${id}`).pipe();
  }
  add(data: FormData):Observable<ProductCategoryModel>{
    return this.HttpClient.post<ProductCategoryModel>(apiUrl + "/create", data).pipe();
  }
  update(data: FormData):Observable<ProductCategoryModel>{
    return this.HttpClient.put<ProductCategoryModel>(apiUrl + "/update",data).pipe();
  }
  delete(id: number):Observable<unknown>{
    return this.HttpClient.delete(apiUrl + `/delete?id=${id}`).pipe();
 }
}
