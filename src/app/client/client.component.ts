import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { jwtDecode } from "jwt-decode";

declare var CKFinder: any;
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent {
  public Editor = ClassicEditor;
  constructor(private jwtHelper: JwtHelperService 

  ){


  }
  public editorConfig = {
    ckfinder: {
      uploadUrl: 'URL_TO_YOUR_CKFINDER_CONNECTOR',
      options: {
        resourceType: 'Images'
      }
    }
  };
  test(){
    const token = localStorage.getItem('token') || "";
    //kiểm tra thời hạn token
    console.log(this.jwtHelper.isTokenExpired(token));
    const tokenPayload = jwtDecode(token);
    console.log(tokenPayload);
  }

  public product = {
    name: '',
    description: '',
    imageUrl: ''
  };

  onImageSelected(event: any) {
    this.product.imageUrl = event.url;
  }

  openCKFinder() {
    CKFinder.popup({
      chooseFiles: true,
      onInit: (finder: any) => {
        finder.on('files:choose', (evt: any) => {
          const file = evt.data.files.first();
          this.onImageSelected({ url: file.getUrl() });
        });

        finder.on('file:choose:resizedImage', (evt: any) => {
          this.onImageSelected({ url: evt.data.resizedUrl });
        });
      }
    });
  }
}
