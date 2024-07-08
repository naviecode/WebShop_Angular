import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class UploadFileService {
  private apiUrl = 'https://localhost:44361/api/HandleUploadFile';
  private token = localStorage.getItem("token") ?? "";
  private headers = new HttpHeaders().set(
    "Authorization", 
    this.token,    
  );
  constructor(private HttpClient:HttpClient) { }

  uploadFile(data: FormData):Observable<FormData>{
    return this.HttpClient.post<FormData>(this.apiUrl + "/uploadFile", data,{headers: this.headers}).pipe();
  }
  updateFile(data: FormData):Observable<FormData>{
    return this.HttpClient.post<FormData>(this.apiUrl + "/updateFile", data,{headers: this.headers}).pipe();
  }
}
