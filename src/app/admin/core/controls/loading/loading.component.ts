import { Component } from '@angular/core';
import { LoadingService } from 'src/app/service/loading-service.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {
  isLoading!: boolean;

  constructor(private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.loadingService.loading$.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }
}
