import { Pipe, PipeTransform } from '@angular/core';
import * as _ from "lodash";

@Pipe({
  name: 'recipeFilter'
})

export class FilterRecipeArrayPipe {
    transform(value: any, filterString: any, propName: any) {
        if( !filterString ){
            return value;
        }

        const resultArray = [];
        
        for ( const item of value ) {
            if( item['recipeCategories'] ) {
                for ( var i=0; i<item['recipeCategories'].length ; i++ ) {
                    if( item['recipeCategories'][i].categoryName.indexOf(filterString) > -1 ) {
                        resultArray.push(item);
                    }
                }
            }
            if( item['recipeName'] ) {
                if ( item['recipeName'].toLowerCase().match('^.*' + filterString + '.*$') || item['recipeName'].match('^.*' + filterString + '.*$') ) {
                    resultArray.push(item);
                }
            }
            if( item[propName] ) {
                if ( item[propName].toLowerCase().match('^.*' + filterString + '.*$') || item[propName].match('^.*' + filterString + '.*$') ) {
                    resultArray.push(item);
                }
            }
        }  
        return _.uniq(resultArray);
    }
}
