import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { ClientHomeComponent } from './client-home/client-home.component';

const routes: Routes = [
  {
    path:'',
    component: ClientComponent,
    children:[
      {
        path: 'home',
        component: ClientHomeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
