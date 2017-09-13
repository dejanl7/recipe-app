import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})

export class OrderByPipe implements PipeTransform {
    transform(array, orderBy, asc = true){
          if (!orderBy || orderBy.trim() == ""){
            return array;
          } 
      
          //ascending
          if (asc){
            return Array.from(array).sort((item1: any, item2: any) => { 
              return this.orderByComparator(item1[orderBy], item2[orderBy]);
            });
          }
          else{
            //not asc
            return Array.from(array).sort((item1: any, item2: any) => { 
              return this.orderByComparator(item2[orderBy], item1[orderBy]);
            });
          }
      }
      
      orderByComparator(a:any, b:any) {
            //Isn't a number so lowercase the string to properly compare
            if(a < b) {
              return -1;
            }
            else if(a > b) {
                return 1;
            }
            else {
              return 0; //equal each other
            }
      }
}
