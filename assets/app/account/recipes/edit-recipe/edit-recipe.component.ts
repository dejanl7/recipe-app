import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipesService } from "../../../services/recipes.service";
import { Subscription } from "rxjs/Subscription";
import { UpdatedInfoService } from "../../../services/updatedinfo.service";


@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css'],
})


export class EditRecipeComponent implements OnInit, OnDestroy {
    recipesSubscr: Subscription;
    recipesInfo: Array<any> = [];
    activeRecipesInfo: Array<any> = [];
    trashRecipesInfo: Array<any> = [];
    recipesPerPage: number = 5;
    currentRecipePage: number = 1;
    activeRecipes: boolean = true;
    trashRecipes: boolean = false;
    filteredRecipes: string = '';
    order: string = 'dateCreated';
    ascending: boolean = false;


    constructor( private recipeService: RecipesService, private updateInfo: UpdatedInfoService ) { }


    /*===================================
        Function for getting recipe 
        info parameters
    =====================================*/
    getRecipes() { 
        this.recipesSubscr = this.recipeService.getRecipeInfo()
        .subscribe( (result) => {
            const recInfo = result.userRecipes;
            for ( var r=0; r<recInfo.length; r++ ) {
                if ( recInfo[r].recipeDeleted ) {
                    this.trashRecipesInfo.push(recInfo[r]);
                }
                else {
                    this.activeRecipesInfo.push(recInfo[r]);
                }
            } 
        });
    }

    // On Init
    ngOnInit() {
        this.recipesSubscr = this.recipeService.getRecipeInfo()
        .subscribe( (result) => {
            const recInfo = result.userRecipes;
            for ( var r=0; r<recInfo.length; r++ ) {
                if ( recInfo[r].recipeDeleted ) {
                    this.trashRecipesInfo.push(recInfo[r]);
                }
                else {
                    this.activeRecipesInfo.push(recInfo[r]);
                }
            } 
        });
        this.recipesInfo = this.activeRecipesInfo;
    }

    // On Destroy
    ngOnDestroy() {
        this.recipesSubscr.unsubscribe();
    }


    /*======================
        Current Page
    ========================*/
    recipePageChange(page: number) {
        this.currentRecipePage = page;
    }

    /*=========================
       Switch Active/Trash
    ===========================*/
    activeRecipeList() {
        this.activeRecipes      = !this.activeRecipes;
        this.trashRecipes       = !this.trashRecipes;
        this.currentRecipePage  = 1;

        if( this.trashRecipes ) {
            this.recipesInfo = this.trashRecipesInfo;
        }
        else if( this.activeRecipes ) {
            this.recipesInfo = this.activeRecipesInfo;
        }

        this.updateInfo.isUpdated.next(false);
    }

    /*=============================
       Update publish/unpublish
    ===============================*/
    updatePublishRecipeStatus(id: string, status: boolean) {
        this.recipeService.updateRecipePublish(id, !status)
        .subscribe( (result) => { 
            this.updateInfo.isUpdated.next(true);
            this.updateInfo.updatedInfoMessage.next('Updated recipe status...');   
        });
        this.updateInfo.isUpdated.next(false);
    }

    /*====================
       Move to trash
    ======================*/
    moveToTrash(id: string, status: boolean) {
        let msgType = status ? 'restore' : 'remove';
        if( confirm(`Do you want to ${msgType} this recipe?`) ) {
            this.recipeService.moveToTrash(id, !status)
            .subscribe( (result) => {
                this.activeRecipesInfo = [];
                this.trashRecipesInfo = [];
                this.getRecipes();
                if( this.activeRecipes ) {
                    this.recipesInfo = this.activeRecipesInfo;
                }
                    else {
                        this.recipesInfo = this.trashRecipesInfo;
                    }
            });
        }
    }

    /*=======================
        Remove one recipe
    =========================*/
    removeRecipe(id: string) {
        if( confirm('Delete this recipe?') ) {
            this.recipeService.deleteRecipe(id)
            .subscribe( (result) => {
                this.activeRecipesInfo = [];
                this.trashRecipesInfo = [];
                this.getRecipes();
                if( this.activeRecipes ) {
                    this.recipesInfo = this.activeRecipesInfo;
                }
                    else {
                        this.recipesInfo = this.trashRecipesInfo;
                    }
            });
        }
    }

    /*=======================
        Sort Table Columns
    =========================*/
    // Descending
    sortDesc(orderName: string) {
        this.order = orderName;
        this.ascending = false;
    }
    // Ascending
    sortAsc(orderName: string) {
        this.order = orderName;
        this.ascending = true;
    }


}
