import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbTabsetConfig } from '@ng-bootstrap/ng-bootstrap';
import { RecipesService } from '../../services/recipes.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { Lightbox, LightboxConfig } from 'angular2-lightbox';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css'],
  providers: [ { provide: 'Window',  useValue: window }]
})


export class MediaComponent implements OnInit, OnDestroy {
    recipeIdSubscr: Subscription;
    createdBySubscr: Subscription;
    recipeId: string;
    createdBy: string;
    recipeContent: any;
    recipeGallery: Array<any> = [];
    recipeGalleryCount: number;
    attachmentImg: string;
    defaultSelected: string = 'attachedImg';
    

    constructor( private recipeService: RecipesService, private activatedRoute: ActivatedRoute, private lightbox: Lightbox, private lightboxConfig: LightboxConfig ) { }

    // Init
    ngOnInit() {
        this.recipeIdSubscr = this.activatedRoute.params
        .subscribe( (params: Params) => {
            this.recipeId = params.id;
            this.recipeService.getSingleRecipe(this.recipeId)
            .subscribe( (result) => {
                this.attachmentImg = result.recipeImage;
                
                if( result.recipeGallery ) {
                    this.recipeGalleryCount = +result.recipeGallery.length;
                    for (let i = 1; i < result.recipeGallery.length; i++) {
                        const src = result.recipeGallery[i];
                        const album = {
                            src: src,
                            caption: 'Caption-name',
                            thumb: src
                        };
                        this.recipeGallery.push(album);
                    }
                }
                    else {
                        this.recipeGalleryCount = 0;
                    }

                // Lightbox config
                this.lightboxConfig.positionFromTop = 77;
                this.lightboxConfig.showImageNumberLabel = true;
                this.lightboxConfig.wrapAround = true;
            })
        });

        this.createdBySubscr = this.activatedRoute.queryParams
        .subscribe( (queryParams) => {
            this.createdBy = queryParams.createdBy;
        });
    }

    // Destroy
    ngOnDestroy() {
        this.recipeIdSubscr.unsubscribe();
        this.createdBySubscr.unsubscribe();
    }


    /*============================
        Change selected
    ==============================*/
    changeSelected(selected: string) {
        if ( selected === 'gallery' ) {
            this.defaultSelected = 'gallery';
        }
          else {
              this.defaultSelected = 'attachedImg';
          }
    }

    /*============================
        Lightbox open
    ==============================*/
    open(index: number) {
        this.lightbox.open(this.recipeGallery, index);
    }
 

}