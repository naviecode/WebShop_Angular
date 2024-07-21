import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { UserResponseModel } from '../model/User/UserResponse.model';
import { LoginModel } from '../model/Other/Login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {
  private apiUrl = 'https://localhost:44361/api/Auth';


  constructor(private HttpClient:HttpClient) { }

  login(data: LoginModel):Observable<UserResponseModel>{
    return this.HttpClient.post<UserResponseModel>(`${this.apiUrl}/login`, data).pipe();
  }

  refreshToken(accessToken: string, refreshToken: string):Observable<any>{
    return this.HttpClient.post<any>(`${this.apiUrl}/refreshToken`, {accessToken: accessToken, refreshToken: refreshToken}).pipe();
  }
}
