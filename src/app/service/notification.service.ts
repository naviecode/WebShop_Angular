import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export enum NotifyType {
  Success = 'success',
  Warning = 'warning',
  Error = 'error'
}

export interface NotifyMessage {
  title:string,
  message: string;
  type: NotifyType;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notifications = new Subject<NotifyMessage>();

  getNotifications() {
    return this.notifications.asObservable();
  }

  showNotification(title:string, message: string, type: NotifyType) {
    this.notifications.next({title, message, type});
  }

  showSuccessNoti(title:string, message:string){
    this.showNotification(title, message, NotifyType.Success);
  }
  showWarringNoti(title:string, message:string){
    this.showNotification(title, message, NotifyType.Warning);
  }
  showErrorNoti(title:string, message:string){
    this.showNotification(title, message, NotifyType.Error);
  }
}
