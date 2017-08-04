import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { ImagesService } from "../../services/images.service";
import { ImagesModel } from "../../models/images.model";


@Component({
  selector: 'app-all-images',
  templateUrl: './all-images.component.html',
  styleUrls: ['./all-images.component.css']
})


export class AllImagesComponent implements OnInit {
    closeResult: string;
    imgName: string;
    img: string;
    imagesFromUser = [];
    imagesName = [];


    constructor (
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
