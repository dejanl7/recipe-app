import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { ImagesModel } from "../../models/images.model";
import { FileUploader, FileDropDirective } from 'ng2-file-upload';
import { UserService } from "../../../services/user.service";
import { ImagesService } from "../../../services/images.service";
import { GET_IMAGES_INFO } from "../../../redux/actions";
import { NgRedux, select } from "ng2-redux";
import { ImageInterface } from "../../../redux/interfaces";


@Component({
  selector: 'app-new-images',
  templateUrl: './new-images.component.html',
  styleUrls: ['./new-images.component.css']
})


export class NewImagesComponent implements OnInit {
    @ViewChild('drop') element: ElementRef;
    @select() imagesInfo;
    imagesFromUser = [];
    imagesName = [];


    constructor ( private userService: UserService, private imagesService: ImagesService, private ngRedux: NgRedux<ImageInterface> ) { }
    

    ngOnInit() {
        this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
            return this.imagesService.getUserImages()
            .subscribe((imagesFromService) => {
                for( let i=0; i<imagesFromService.uploadedImages.length; i++ ){
                  this.imagesFromUser.push(imagesFromService.uploadedImages[i].imagePath);
                  this.imagesName.push(imagesFromService.uploadedImages[i].imageName);
                }
            });
        };

        this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
            this.imagesService.getUserImages()
            .subscribe( (result) => {
                this.ngRedux.dispatch({ type: GET_IMAGES_INFO, imgPayload: result.uploadedImages });
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
    hasBaseDropZoneOver:boolean = false;

    fileOverBase(e:any) {
        this.hasBaseDropZoneOver = e;
        console.log(e);
        //this.renderer.setStyle(this.element.nativeElement , 'backgroundColor', '#ecf0f1')
    }
}
