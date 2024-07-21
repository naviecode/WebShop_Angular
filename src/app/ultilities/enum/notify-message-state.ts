import { NotifyTypeState } from "./notify-type-state";

  
export interface NotifyMessageState {
    title:string,
    message: string;
    type: NotifyTypeState;
}
  