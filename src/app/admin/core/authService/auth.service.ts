import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(private jwtHelper: JwtHelperService ) { }

  //kiểm tra xem người dùng đã đăng nhập hay chưa
  isLoggedIn():boolean{
    let isLogin = false;
    const token = localStorage.getItem('token') || "";
    if(token != null && token != "" && token != "undefined" && !this.jwtHelper.isTokenExpired(token)){
      isLogin = true;
    }
    return isLogin;
  }

  test(){
    //Kiểm tra role
    // const tokenPayload = jwtDecode(token);
    // console.log(tokenPayload);
  }

  //Phương thức đăng nhập giả lập
  login(token: string):void{
    localStorage.setItem('token',token);
  }

  //Phương thức đăng xuất
  logout():void{
    localStorage.removeItem('token');
  }
}
