import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from "@ng-bootstrap/ng-bootstrap";
import { ImagesService } from "../../../services/images.service";
import { ImagesModel } from "../../models/images.model";
import { select, NgRedux } from "ng2-redux";
import { GET_IMAGES_INFO } from "../../../redux/actions";
import { ImageInterface } from "../../../redux/interfaces";
import { UserService } from "../../../services/user.service";


@Component({
  selector: 'app-all-images',
  templateUrl: './all-images.component.html',
  styleUrls: ['./all-images.component.css']
})


export class AllImagesComponent implements OnInit {
    closeResult: string;
    imgName: string;
    newImgName: string;
    img: string;
    imgId: string;
    @select() imagesInfo;
    @select() imagesInfoLength;


    constructor (
        private imagesService: ImagesService, 
        private modalService: NgbModal, 
        private renderer: Renderer2, 
        private el: ElementRef,
        private ngRedux: NgRedux<ImageInterface>
    ){}


    ngOnInit() {
        this.imagesService.getUserImages()
        .subscribe( (userImgs) => {
            this.ngRedux.dispatch({ type: GET_IMAGES_INFO, imgPayload: userImgs.uploadedImages });
        });
    } 


    // Modal Dialog
    open(content, imgId:string, img: string, imgName: string, newImgName: string) {
        this.img        = img;
        this.imgName    = imgName;
        this.newImgName = newImgName;
        this.imgId      = imgId;
        this.modalService.open(content).result.then((result) => {
            //console.log(result);
        }, (reason) => {
            this.closeResult = 'Dismissed';
        });
    }

    // Delete Image
    deleteImage( selectedImageId: string, selctedImageName: string ){
        this.imagesService.deleteImage(this.imgId, this.newImgName)
        .subscribe( (deleteResult) => {
            //console.log(deleteResult);
        });
    }
}
