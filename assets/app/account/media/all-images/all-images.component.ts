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
    img: string;
    @select() imagesInfo;


    constructor (
        private imagesService: ImagesService, 
        private modalService: NgbModal, 
        private renderer: Renderer2, 
        private el: ElementRef,
        private ngRedux: NgRedux<ImageInterface>
    ) { }


    ngOnInit() {
        return this.imagesService.getUserImages()
        .subscribe( (userImgs) => {
            console.log(userImgs);
            return this.ngRedux.dispatch({ type: GET_IMAGES_INFO, imgPayload: userImgs.uploadedImages });
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
