import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { RoleModel } from '../model/Role/Role.model';
import { RoleRequestModel } from '../model/Role/RoleRequest.model';


@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private apiUrl = 'https://localhost:44361/api/Role';

  constructor(private HttpClient:HttpClient) { }

  getAll():Observable<RoleModel[]>{
    return this.HttpClient.get<RoleModel[]>(this.apiUrl + "/getAll").pipe();
  }
  getAllFilter(filter: RoleRequestModel):Observable<RoleModel[]>{
    return this.HttpClient.post<RoleModel[]>(this.apiUrl + "/getAllFilter", filter).pipe();
  }
  getCombobox():Observable<RoleModel[]>{
    return this.HttpClient.get<RoleModel[]>(this.apiUrl + "/getCombobox").pipe();
  }
  getById(id: number):Observable<RoleModel>{
    return this.HttpClient.get<RoleModel>(this.apiUrl + `/getById?id=${id}`).pipe();
  }
  add(data: RoleModel):Observable<RoleModel>{
    return this.HttpClient.post<RoleModel>(this.apiUrl + "/create", data).pipe();
  }
  update(data: RoleModel):Observable<RoleModel>{
    return this.HttpClient.put<RoleModel>(this.apiUrl + "/update",data).pipe();
  }
  delete(id: number):Observable<unknown>{
    return this.HttpClient.delete(this.apiUrl + `/delete?id=${id}`).pipe();
 }
}
