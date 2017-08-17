import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { RecipesService } from "../../../services/recipes.service";
import { Subscription } from "rxjs/Subscription";
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
    
    constructor(private recipeService: RecipesService) { }

    ngOnInit(){
        this.getRecipeCategories = this.recipeService.categories
        .subscribe( (result) => {
            console.log(result);
        });

        this.getRecipeAttachedImgs = this.recipeService.attachedImg
        .subscribe( (result) => {
            console.log(result);
        });
    }

    ngAfterViewInit() {
      tinymce.init({
          selector:'textarea',
          plugins : 'advlist autolink link image lists charmap print preview',
          setup: editor => {
            this.editor = editor;
            editor.on('keyup', () => {
              const content = editor.getContent();
            })
          }
      });
    }

    ngOnDestroy() {
        tinymce.remove(this.editor);
        this.getRecipeCategories.unsubscribe();
        this.getRecipeAttachedImgs.unsubscribe();
    }

}
