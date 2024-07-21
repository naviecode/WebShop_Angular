import { Component } from '@angular/core';
import { AuthService } from './core/authService/auth.service';
import { Router } from '@angular/router';
import { UserResponseModel } from '../model/User/UserResponse.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: [
    './admin.component.scss',  
  ]
})
export class AdminComponent {
  dateNow: Date = new Date();
  user: UserResponseModel;

  constructor(private authService : AuthService, private router: Router){
    this.user = this.authService.currentUserValue;
  }
  

  logout(){
    this.authService.logout();
    
    this.router.navigate(['/login']);
  }

}
