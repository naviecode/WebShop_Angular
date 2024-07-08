import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http';
import { UserModel } from '../model/User.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:44361/api/User';
  private token = localStorage.getItem("token") ?? "";
  private headers = new HttpHeaders().set(
    "Authorization", 
    this.token
  );
  constructor(private HttpClient:HttpClient) { }

  getAll():Observable<UserModel[]>{    
    return this.HttpClient.get<UserModel[]>(this.apiUrl + "/getAll",{headers: this.headers}).pipe();
  }
  getById(id: number):Observable<UserModel>{
    return this.HttpClient.get<UserModel>(this.apiUrl + `/getById?id=${id}`,{headers: this.headers}).pipe();
  }
  add(data: FormData):Observable<UserModel>{
    return this.HttpClient.post<UserModel>(this.apiUrl + "/create", data,{headers: this.headers}).pipe();
  }
  update(data: FormData):Observable<UserModel>{
    return this.HttpClient.put<UserModel>(this.apiUrl + "/update",data, {headers: this.headers}).pipe();
  }
  delete(id: number):Observable<unknown>{
     return this.HttpClient.delete(this.apiUrl + `/delete?id=${id}`, {headers: this.headers}).pipe();
  }
  
}
