import { Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { UserModel } from '../model/User.model';
import { UserResponseModel } from '../model/UserResponse.model';

const httpOptions={
  Headers: new HttpHeaders({'Content-Type':'Application/json'})
}

const apiUrl = 'https://localhost:44361/api/Auth';

@Injectable({
  providedIn: 'root'
})
export class AuthUserService {

  constructor(private HttpClient:HttpClient) { }

  login(data: UserModel):Observable<UserResponseModel>{
    return this.HttpClient.post<UserResponseModel>(`${apiUrl}/login`, data).pipe();
  }
}
