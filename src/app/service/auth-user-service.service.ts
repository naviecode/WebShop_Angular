import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { UserResponseModel } from '../model/UserResponse.model';
import { LoginModel } from '../model/Login.model';

const httpOptions={
  Headers: new HttpHeaders({'Content-Type':'Application/json'})
}

const apiUrl = 'https://localhost:44361/api/Auth';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  constructor(private HttpClient:HttpClient) { }

  login(data: LoginModel):Observable<UserResponseModel>{
    return this.HttpClient.post<UserResponseModel>(`${apiUrl}/login`, data).pipe();
  }

  refreshToken(accessToken: string, refreshToken: string):Observable<any>{
    return this.HttpClient.post<any>(`${apiUrl}/refreshToken`, {accessToken: accessToken, refreshToken: refreshToken}).pipe();
  }
}
