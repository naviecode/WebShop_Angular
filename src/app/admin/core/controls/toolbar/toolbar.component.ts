import { Component, Injector, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUiAction } from 'src/app/ultilities/ui-action';
import * as $ from 'jquery';

@Component({
  selector: 'appToolBar',
  templateUrl: './toolbar.component.html',
  styleUrls: [
    './toolbar.component.scss',  
  ]
})
export class ToolBarComponent implements OnInit {
  router!: Router;
  uiAction!: IUiAction<any>;

  buttonAdd!: boolean;
  buttonSearch!: boolean;
  buttonUpdate!: boolean;
  @Input() title!:string;

  constructor(injector:Injector){
    this.router = injector.get(Router);
  }

  ngOnInit(): void {
    
  }

  public setUiAction(uiAction: IUiAction<any>): void {
    this.uiAction = uiAction;
  }

  navigatePassParam(url: string, params: any, deepParams: any, skipLocationChange: boolean = true) {
    var array = [url];
    if (params) {
        array.push(params);
    }
    this.router.navigate(array, { queryParams: deepParams, skipLocationChange: skipLocationChange });
    if (params) {
        url = url + ';' + $.map(params, (v, k) => { return k.toString() + '=' + (v || '').toString(); }).join(';')
    }
    window.history.pushState('', '', url);
  }

  add(): void {
    if (this.uiAction) {
        this.uiAction.onAdd();
    }
  }

  search(): void{
    if(this.uiAction){
       this.uiAction.onSearch();
    }
  }
  setRole(funct:string, add: boolean, update:boolean, search:boolean){
    this.setButtonAdd(add);
    this.setButtonUpdate(update);
    this.setButtonSearch(search);
  }

  setButtonAdd(enable: boolean): void {
    this.buttonAdd = enable;
  }
  setButtonUpdate(enable: boolean): void {
    this.buttonUpdate = enable;
  }
  setButtonSearch(enable: boolean): void {
    this.buttonSearch = enable;
  }
}
