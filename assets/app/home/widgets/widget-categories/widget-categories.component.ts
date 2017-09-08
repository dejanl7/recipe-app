import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import { CategoriesService } from "../../../services/category.service";

@Component({
  selector: 'app-widget-categories',
  templateUrl: './widget-categories.component.html'
})

export class WidgetCategoriesComponent implements OnInit, OnDestroy {
    popularCategoriesInfo: Subscription;
    popularCategories: Array<string> = [];
    
    constructor( private categoryService: CategoriesService ) { }

    // Init
    ngOnInit() {
        this.popularCategoriesInfo = this.categoryService.getPopularCategories()
        .subscribe( (result: Array<any>) => {
            for( let c=0; c<result.length; c++ ) {
                this.popularCategories.push(result[c]);
            }
        });
    }

    // Destroy
    ngOnDestroy() {
        this.popularCategoriesInfo.unsubscribe();
    }

}
