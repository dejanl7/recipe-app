import { Component, OnInit, Renderer2, ElementRef } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ImagesService } from "../../../services/images.service";
import { select, NgRedux } from "ng2-redux";
import { GET_IMAGES_INFO, DELETE_PROFILE_IMAGE } from "../../../redux/actions";
import { ImageInterface } from "../../../redux/interfaces";
import { UserService } from "../../../services/user.service";
import { Router } from "@angular/router";


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
    userImg: string;
    @select() imagesInfo;
    @select() imagesInfoLength;


    constructor (
        private imagesService: ImagesService, 
        private userService: UserService,
        private modalService: NgbModal, 
        private modalActive: NgbActiveModal,
        private renderer: Renderer2, 
        private el: ElementRef,
        private ngRedux: NgRedux<ImageInterface>,
        private router: Router
    ){}


    ngOnInit() {
        this.userService.getProfileImageAndEmail()
        .subscribe( (userProfile) => {
            this.userImg = userProfile.profileImage;
            console.log(this.userImg);
        });

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
        if(confirm("Are you sure to delete?")) {
            this.imagesService.deleteImage(this.imgId, this.newImgName)
            .subscribe( (deleteResult) => { 
                return this.imagesService.getUserImages()
                .subscribe( (userImg) => {
                    this.ngRedux.dispatch({ type: GET_IMAGES_INFO, imgPayload: userImg.uploadedImages });
                    if ( this.img == this.userImg ){
                        this.ngRedux.dispatch({ type: DELETE_PROFILE_IMAGE, profileImgPayload: 'none' });
                    }
                });
            });
        }
    }
}
