import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { Subscription } from "rxjs/Subscription";
import { ImagesService } from "../../../../services/images.service";
import { RecipesService } from "../../../../services/recipes.service";

@Component({
  selector: 'app-attached-image',
  templateUrl: './attached-image.component.html',
  styleUrls: ['./attached-image.component.css']
})


export class AttachedImageComponent implements OnInit, OnDestroy {
    closeResult: string;
    userImages: Array<string> = [];
    userImageIds: Array<string> = [];
    getUserImgs: Subscription;
    attachedImg: string;


    constructor( private modalService: NgbModal, private imagesService: ImagesService, private recipeService: RecipesService ) { }

    // Initialization
    ngOnInit() {
      this.getUserImgs = this.imagesService.getUserImages()
      .subscribe( (userImgs) => {
          const allUserImages = userImgs.uploadedImages;
          for( let im=0; im<allUserImages.length; im++) {
              this.userImages.push(allUserImages[im].imagePath);
              this.userImageIds.push(allUserImages[im]._id);
          }
      });
    }


    // Destroy
    ngOnDestroy() {
        this.getUserImgs.unsubscribe();
    }


    /*=======================
        Open Modal Dialog
    =========================*/
    open(content) {
        this.modalService.open(content, {size: 'lg'}).result.then((result) => {
            //console.log('Opened');
        }, (reason) => {
            this.closeResult = `Dismissed`;
        });
    }

    /*=======================
        Show Attachment Img
    =========================*/
    getAttachmentPath(img: string) {
        this.attachedImg = img;
        this.recipeService.attachedImg.next(this.attachedImg);
    }

}
