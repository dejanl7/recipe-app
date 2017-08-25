import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { RecipesService } from "../../../services/recipes.service";
import { Subscription } from "rxjs/Subscription";
import { RecipeModel } from "../../../models/recipe.model";
import { Router, ActivatedRoute } from "@angular/router";
declare var tinymce: any;


@Component({
  selector: 'app-add-new-recipe',
  templateUrl: './add-new-recipe.component.html',
  styleUrls: ['./add-new-recipe.component.css']
})


export class AddNewRecipeComponent implements OnInit, AfterViewInit, OnDestroy {
    editor: any;
    getRecipeCategories: Subscription;
    getRecipeAttachedImgs: Subscription;
    getRecipeGalleryImgs: Subscription;
    @ViewChild('recipeTitle') recipeTitle: ElementRef;
    recipeContent: string;
    recipeCategories: Array<string>;
    recipeAttachment: string;
    recipeGalleryImages: Array<string>;
    alertNotification: boolean = false;
    
    constructor( private recipeService: RecipesService, private route: ActivatedRoute, private router: Router ) { }


    // On Init
    ngOnInit(){
        this.getRecipeCategories = this.recipeService.categories
        .subscribe( (categories: Array<string>) => {
            this.recipeCategories = categories;
        });

        this.getRecipeAttachedImgs = this.recipeService.attachedImg
        .subscribe( (attachemnt: string) => {
            this.recipeAttachment = attachemnt;
        });

        this.getRecipeGalleryImgs = this.recipeService.galleryImgs
        .subscribe( (gallery: Array<string>) => { 
            this.recipeGalleryImages = gallery;
        });
        
    }

    // After View Init
    ngAfterViewInit() {
        tinymce.init({
            selector:'textarea',
            plugins: ['advlist', 'anchor', 'autolink', 'autoresize', 'bbcode',  'charmap', 'code', 'colorpicker', 'contextmenu', 'emoticons', 'image', 'link',  'lists', 'paste', 'print', 'preview', 'table'],
            setup: editor => {
                this.editor = editor;
                editor.on('keyup', () => {
                    this.recipeContent = editor.getContent();
                })
            }
        });
    }

    // Destroy
    ngOnDestroy() {
        tinymce.remove(this.editor);
        this.getRecipeCategories.unsubscribe();
        this.getRecipeAttachedImgs.unsubscribe();
        this.getRecipeGalleryImgs.unsubscribe();
    }


    /*========================
        Insert new recipe
    ==========================*/
    publishRecipe() {
        if ( this.recipeTitle.nativeElement.value.length === 0 || this.recipeContent.length === 0 ) {
            this.alertNotification = true;
            return alert('Title and content are important fields.');
        }
        let saveRecipe = new RecipeModel(
            this.recipeTitle.nativeElement.value ? this.recipeTitle.nativeElement.value : null, 
            this.recipeContent ? this.recipeContent : null,
            this.recipeCategories ? this.recipeCategories : null,
            this.recipeAttachment ? this.recipeAttachment : null,
            this.recipeGalleryImages ? this.recipeGalleryImages : null
        );
        this.recipeService.addNewRecipe(saveRecipe)
        .subscribe( (resut) => {
            this.router.navigate(['../account/recipes/edit']);
        });
    }

    /*========================
        Cancel recipe
    ==========================*/
    cancelRecipe() {
        if( confirm( 'Do you want to cancel new recipe?') ) {
            this.router.navigate(['account/recipes/edit']);
        }
    }
}
