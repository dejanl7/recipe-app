import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cutstring'
})

export class CutstringPipe implements PipeTransform {
  transform(value: any, limit: number): any {
      if( value.length > limit ) {
          var cleanValue  = value.replace(/<\/?[^>]+(>|$)/g, "");
          var cuttedValue = cleanValue.substr(0, limit) + '...';
          return cuttedValue;
      }
      return value.replace(/<\/?[^>]+(>|$)/g, "");
  }
}
