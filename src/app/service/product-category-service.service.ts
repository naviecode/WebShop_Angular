import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { ProductCategoryModel } from '../model/ProductCategory.model';

const apiUrl = 'https://localhost:44361/api/ProductCategory';

@Injectable({
  providedIn: 'root'
})
export class ProductCategoryService {
  private token = localStorage.getItem("token") ?? "";
  private headers = new HttpHeaders().set(
    "Authorization", 
    this.token
  );
  constructor(private HttpClient:HttpClient) { }

  getAll():Observable<ProductCategoryModel[]>{
    return this.HttpClient.get<ProductCategoryModel[]>(apiUrl + "/getAll", {headers: this.headers}).pipe();
  }
  getById(id: number):Observable<ProductCategoryModel>{
    return this.HttpClient.get<ProductCategoryModel>(apiUrl + `/getById?id=${id}`, {headers: this.headers}).pipe();
  }
  add(data: FormData):Observable<ProductCategoryModel>{

    return this.HttpClient.post<ProductCategoryModel>(apiUrl + "/create", data, {headers: this.headers}).pipe();
  }
  update(data: FormData):Observable<ProductCategoryModel>{
    return this.HttpClient.put<ProductCategoryModel>(apiUrl + "/update",data, {headers: this.headers}).pipe();
  }
  delete(id: number):Observable<unknown>{
    return this.HttpClient.delete(apiUrl + `/delete?id=${id}`, {headers: this.headers}).pipe();
 }
}
