import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http';
import { UserModel } from '../model/User/User.model';
import { Observable } from 'rxjs';
import { UserRequestModel } from '../model/User/UserRequest.model';
import { RegisterModel } from '../model/Other/Register.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:44361/api/User';
  constructor(private HttpClient:HttpClient) { }

  getAll():Observable<UserModel[]>{    
    return this.HttpClient.get<UserModel[]>(this.apiUrl + "/getAll").pipe();
  }
  getAllFilter(filter: UserRequestModel):Observable<UserModel[]>{
    return this.HttpClient.post<UserModel[]>(this.apiUrl + "/getAllFilter", filter).pipe();
  }
  getById(id: number):Observable<UserModel>{
    return this.HttpClient.get<UserModel>(this.apiUrl + `/getById?id=${id}`).pipe();
  }
  add(data: FormData):Observable<UserModel>{
    return this.HttpClient.post<UserModel>(this.apiUrl + "/create", data).pipe();
  }
  update(data: FormData):Observable<UserModel>{
    return this.HttpClient.put<UserModel>(this.apiUrl + "/update",data).pipe();
  }
  delete(id: number):Observable<unknown>{
     return this.HttpClient.delete(this.apiUrl + `/delete?id=${id}`).pipe();
  }
  register(data: RegisterModel):Observable<UserModel>{
    return this.HttpClient.post<UserModel>(this.apiUrl + "/register", data).pipe();
  }
  changePassword(data: RegisterModel):Observable<UserModel>{
    return this.HttpClient.post<UserModel>(this.apiUrl + "/changePassword", data).pipe();
  }
  
}
