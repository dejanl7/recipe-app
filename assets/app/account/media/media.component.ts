import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { ImagesModel } from "../models/images.model";
import { FileUploader, FileDropDirective } from 'ng2-file-upload';
import { UserService } from "../services/user.service";
import { ImagesService } from "../services/images.service";
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})


export class MediaComponent implements OnInit {
    @ViewChild('drop') element: ElementRef;
    imagesFromUser = [];
    imagesName = [];
    closeResult: string;
    imgName: string;
    img: string;


    constructor ( 
            private userService: UserService, 
            private imagesService: ImagesService, 
            private modalService: NgbModal, 
            private renderer: Renderer2, 
            private el: ElementRef 
    ) { }
    

    ngOnInit() {
        this.imagesService.getUserImages()
          .subscribe((imagesFromService) => {
              for( let i=0; i<imagesFromService.uploadedImages.length; i++ ){
                  this.imagesFromUser.push(imagesFromService.uploadedImages[i].imagePath);
                  this.imagesName.push(imagesFromService.uploadedImages[i].imageName);
              }
          });
      
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
            console.log("ImageUpload:uploaded:", item, status);
            
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

    fileOverBase(e:any) {
        this.hasBaseDropZoneOver = e
        this.renderer.setStyle(this.element.nativeElement , 'backgroundColor', '#ecf0f1')
    }

    


    // Modal Dialog
    open(content, img: string, imgName: string) {
        this.img = img;
        this.imgName = imgName;
        this.modalService.open(content).result.then((result) => {
            
        }, (reason) => {
            this.closeResult = 'Dismissed';
        });
    }

}
