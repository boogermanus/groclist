import { Pipe, PipeTransform } from '@angular/core';
import { IGroceryListItem } from '../../interfaces/igrocery-list-item';

@Pipe({
  name: 'grocListFilter',
  standalone: true
})
export class GrocListFilterPipe implements PipeTransform {
  public transform(value: IGroceryListItem[], filterBy: string): IGroceryListItem[] {
      filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
      return filterBy ? value.filter((item: IGroceryListItem) =>
          item.name.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
  }
}
