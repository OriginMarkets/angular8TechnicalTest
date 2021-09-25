import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'categoryFilter'
})
export class categoryFilterPipe implements PipeTransform {
  transform(value: any, filter?: any): any {
    if (!value) {
      return;
    }
    if (!filter) {
      return value;
    }
    filter = filter.toLowerCase();

    return value.filter(item => {
        switch (filter) {
            case 'completed':
                return item.done;
                break;
            case 'active':
                return item.done === false;
                break;
            default:
                return item;
                break;
        }
    });
  }
}
