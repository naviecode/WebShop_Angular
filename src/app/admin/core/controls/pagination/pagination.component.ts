import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {
  @Input() totalItems: number = 0;
  @Input() itemsPerPage :number = 5;
  @Input() currentPage :number = 1; 
  isHide: boolean = false;
  @Output() pageChanged = new EventEmitter<number>();

  pages: number[] = [];
  totalPages!: number;
  constructor(){
  }

  ngOnChanges(): void {
    if(this.totalItems == 0 || this.totalItems == undefined){
      this.isHide = true;
    }
    else{
      this.isHide = false;
    }
    
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.pages = [];
    for(let i = 1; i <= this.totalPages; i++)
    {
       this.pages.push(i);
    };
  }

  selectPage(page: number){
    if(page >= 1 && page <= this.totalPages && this.currentPage != page)
    {
      this.currentPage = page;
      this.pageChanged.emit(this.currentPage);
    }
  }

  preivousPage(){
    if(this.currentPage > 1)
    {
      this.selectPage(this.currentPage - 1);
    }
  }

  nextPage(){
    console.log(this.currentPage);
    if(this.currentPage < this.totalPages)
    {
      this.selectPage(this.currentPage + 1);
    }
  }
  
}
