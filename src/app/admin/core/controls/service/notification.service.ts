import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NotifyMessageState } from '../../../../ultilities/enum/notify-message-state';
import { NotifyTypeState } from '../../../../ultilities/enum/notify-type-state';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notifications = new Subject<NotifyMessageState>();

  getNotifications() {
    return this.notifications.asObservable();
  }

  showNotification(title:string, message: string, type: NotifyTypeState) {
    this.notifications.next({title, message, type});
  }

  showSuccessNoti(title:string, message:string){
    this.showNotification(title, message, NotifyTypeState.Success);
  }
  showWarringNoti(title:string, message:string){
    this.showNotification(title, message, NotifyTypeState.Warning);
  }
  showErrorNoti(title:string, message:string){
    this.showNotification(title, message, NotifyTypeState.Error);
  }
}
