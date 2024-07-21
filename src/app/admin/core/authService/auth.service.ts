import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { error } from 'jquery';
import { jwtDecode } from "jwt-decode";
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserResponseModel } from 'src/app/model/User/UserResponse.model';
import { AuthUserService } from 'src/app/service/auth-user-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private accessToken!:string;
  private refreshToken!:string;
  private currentUserSubject!: BehaviorSubject<any>;
  private currentUser!: Observable<any>;

  constructor(private jwtHelper: JwtHelperService, 
  private http: HttpClient, 
  private authUserService: AuthUserService) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') ?? "123"));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  login(user: UserResponseModel ,accessToken: string, refreshToken: string){
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    localStorage.setItem('accessToken', this.accessToken);
    localStorage.setItem('refreshToken', this.refreshToken);
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);

  }

  refreshTokenRequest():Observable<any>{
    return this.authUserService.refreshToken(this.accessToken, this.refreshToken).pipe(
      tap(response => {
        this.accessToken = response.data.token;
        this.refreshToken = response.data.refreshToken;
        localStorage.setItem('accessToken', this.accessToken);
        localStorage.setItem('refreshToken', this.refreshToken);
      })
    );

  }

  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  //kiểm tra xem người dùng đã đăng nhập hay chưa
  isLoggedIn():boolean{
    let isLogin = false;
    const token = this.getAccessToken() || "";
    if(token != null && token != "" && token != "undefined" && !this.jwtHelper.isTokenExpired(token)){
      isLogin = true;
    }
    return isLogin;
  }

 //Phương thức đăng xuất
 logout():void{
    this.accessToken = "";
    this.refreshToken = "";
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
  test(){
    //Kiểm tra role
    // const tokenPayload = jwtDecode(token);
    // console.log(tokenPayload);
  }


 
}
