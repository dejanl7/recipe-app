import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutstring'
})

export class CutstringPipe implements PipeTransform {
  transform(value: any, limit: number): any {
      if( value.length > limit ) {
          var cuttedValue = value.substr(0, limit) + '...';
          return cuttedValue.replace(/<\/?[^>]+(>|$)/g, "");
      }
      return value.replace(/<\/?[^>]+(>|$)/g, "");
  }
}
