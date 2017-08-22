import { Component, OnInit } from '@angular/core';
import { FilterService } from "ng-filter";
import { DatePipe } from "@angular/common";
import { Subscription } from "rxjs/Subscription";
import { RecipesService } from "../../services/recipes.service";


@Component({
    selector: 'app-test',
    templateUrl: './test.component.html',
    styleUrls: ['./test.component.css'],
    providers: [RecipesService]
})


export class TestComponent implements OnInit {
    name = '';
    recipesSubscr: Subscription;
    recipesInfo: Array<any> = [];
    filteredRecipes = '';
    
    constructor( private recipeService: RecipesService ) { }

    ngOnInit() {

        this.recipesSubscr = this.recipeService.getRecipeInfo()
        .flatMap( result => result.userRecipes )
        .subscribe( (result) => {
            this.recipesInfo.push(result); 
            //console.log(this.recipesInfo);      
        });
    }
    

}
