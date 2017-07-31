import { Component, OnInit } from '@angular/core';
import { ImagesModel } from "../models/images.model";
import { FileUploader, FileDropDirective } from 'ng2-file-upload';
import { UserService } from "../services/user.service";
import { ImagesService } from "../services/images.service";


@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})


export class MediaComponent implements OnInit {
    imagesFromUser = [];


    constructor( private userService: UserService, private imagesService: ImagesService ) { }
    

    ngOnInit() {
        this.imagesService.getUserImages()
          .subscribe((imagesFromService) => {
              for( let i=0; i<imagesFromService.uploadedImages.length; i++ ){
                  this.imagesFromUser.push(imagesFromService.uploadedImages[i].imagePath);
              }
          });
      
        this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
            return this.imagesService.getUserImages()
            .subscribe((imagesFromService) => {
                for( let i=0; i<imagesFromService.uploadedImages.length; i++ ){
                  this.imagesFromUser.push(imagesFromService.uploadedImages[i].imagePath);
                }
            });
        };
    }


    /*=============================
        Ng-2 File Upload
    ===============================*/
    uploader:FileUploader = new FileUploader({
        url: 'http://localhost:3000/image', 
        allowedMimeType: ['image/png', 'image/gif', 'image/jpeg', 'image/jpg'] ,
        authToken: this.userService.userToken
    });
    hasBaseDropZoneOver:boolean    = false;
    hasAnotherDropZoneOver:boolean = false; 

    fileOverBase(e:any):void {
      this.hasBaseDropZoneOver = e;
    }


}
