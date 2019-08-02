import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removewhitespace'
})
export class RemovewhitespacePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.replace(/ /g, '');
  }

}
