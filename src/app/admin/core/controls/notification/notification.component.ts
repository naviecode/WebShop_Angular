import { Component, OnInit, Renderer2 } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotificationService, NotifyMessage, NotifyType } from 'src/app/service/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  message!: string;
  type!: string;
  title!:string;
  private subscription!: Subscription;
  constructor(private notificationService: NotificationService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.subscription = this.notificationService.getNotifications().subscribe((notifyMessage: NotifyMessage) => {
      this.message = notifyMessage.message;
      this.type = notifyMessage.type;
      this.title = notifyMessage.title;
      this.showNotification();
    });
  }

 
  
  showNotification() {
    const duration = 3000;
    const mainNotify = document.getElementById('notification');
    if(mainNotify){
      const notify = this.renderer.createElement("div");


      //Auto remove
      const autoRemove = setTimeout(()=>{
        mainNotify.removeChild(notify);
      }, duration + 1000);

      this.renderer.listen(notify, "click",(e)=>{
        mainNotify.removeChild(notify);
        clearTimeout(autoRemove);
      });

      const icons = {
        success: 'mdi mdi-shield-outline',
        info: 'mdi mdi-incognito',
        warning: 'mdi mdi-incognito',
        error: 'mdi mdi-close-circle-outline',
      };
      var icon = "";

      switch(this.type)
      {
        case 'success':
          icon = "mdi mdi-shield-outline";
          break;
        case 'info':
          icon = "mdi mdi-incognito";
          break;
        case 'warning':
          icon = "mdi mdi-incognito";
          break;
        case 'error':
          icon = "mdi mdi-close-circle-outline";
          break;
        default:
          icon = "mdi mdi-shield-outline";
          break;
      }


      const delay = (duration / 1000).toFixed(2);

      this.renderer.addClass(notify, "notification");
      this.renderer.addClass(notify, `notification--${this.type}`);
      this.renderer.setStyle(notify, 'animation', `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`)

      this.renderer.setProperty(notify, 'innerHTML',`
              <div class="notification__icon">
                    <i class="${icon}"></i>
              </div>
              <div class="notification__body">
                  <h3 class="notification__title">${this.title}</h3>
                  <p class="notification__msg">${this.message}</p>
              </div>
              <div class="notification__close">
                  <i class="mdi mdi-close"></i>
              </div>
      `);
      
      this.renderer.appendChild(mainNotify, notify);
    };
  }

  

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
