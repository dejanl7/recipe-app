import { Component, OnInit } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ImagesService } from "../../../../../services/images.service";
import { RecipesService } from "../../../../../services/recipes.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-attached-img',
  templateUrl: './attached-img.component.html',
  styleUrls: ['./attached-img.component.css']
})
export class AttachedImgComponent implements OnInit {
    closeResultEdit: string;
    userImagesEdit: Array<string> = [];
    userImageIdsEdit: Array<string> = [];
    getUserImgsEdit: Subscription;
    getRecipeInfoAttachment: Subscription;
    attachedImgEdit: string;
    itemsPerPageEdit: number = 8;

    constructor( private modalService: NgbModal, private imagesService: ImagesService, private recipeService: RecipesService, private activatedRoute: ActivatedRoute ) { }

    // Initialization
    ngOnInit() {
        this.getUserImgsEdit = this.imagesService.getUserImages()
        .subscribe( (userImgs) => {
            const allUserImages = userImgs.uploadedImages;
            for( let im=0; im<allUserImages.length; im++) {
                this.userImagesEdit.push(allUserImages[im].imagePath);
                this.userImageIdsEdit.push(allUserImages[im]._id);
            }
        });

        this.getRecipeInfoAttachment = this.activatedRoute.params
        .subscribe( (pathElements) => {
            this.recipeService.getRecipeUnique(pathElements.id)
            .subscribe( (result) => {
                this.attachedImgEdit = result.recipeImage;
            });
        });

    }

    // Destroy
    ngOnDestroy() {
        this.getUserImgsEdit.unsubscribe();
        this.getRecipeInfoAttachment.unsubscribe();
    }


    /*=======================
        Open Modal Dialog
    =========================*/
    openEdit(content) {
        this.modalService.open(content, {size: 'lg'}).result.then((result) => {
            //console.log('Opened');
        }, (reason) => {
            this.closeResultEdit = `Dismissed`;
        });
    }

    /*=======================
        Show Attachment Img
    =========================*/
    getAttachmentPathEdit(img: string) {
        this.attachedImgEdit = img;
        this.recipeService.attachedImg.next(this.attachedImgEdit);
    }

}
