import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/admin/core/authService/auth.service';
import { UserModel } from 'src/app/model/User.model';
import { AuthUserService } from 'src/app/service/auth-user-service.service';
import { LoadingService } from 'src/app/service/loading-service.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  inputModel: UserModel = new UserModel();
    constructor(private authService:AuthService, 
    private router: Router, 
    private authUserService: AuthUserService,
    private notificationService: NotificationService, 
    private loadingService: LoadingService){
        if(this.authService.isLoggedIn()){
          this.router.navigate(['/admin']);
        }else{
          this.router.navigate(['/login']);
        }
    }

    login(){
      this.loadingService.show();
      this.authUserService.login(this.inputModel).subscribe({
        next:(res:any)=>{
          if(res.code == 0)
          {
            this.authService.login(res.data.token);
            this.notificationService.showSuccessNoti(res.message, res.attr);
            this.router.navigate(['/admin']);
          }
          else{
            this.notificationService.showErrorNoti(res.message, res.attr);
          }
          this.loadingService.hide();
        },
        error:(error: any)=>{
          this.notificationService.showErrorNoti("Lỗi hệ thống", error);
          this.loadingService.hide();
        }
      });    
    }
}
