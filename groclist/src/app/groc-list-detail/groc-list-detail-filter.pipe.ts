import {PipeTransform, Pipe} from '@angular/core';
import {IGroceryListItem} from '../model/grocery-list.interface';

@Pipe({
    name: 'grocListFilter',
})

export class GrocListFilterPipe implements PipeTransform {
    public transform(value: IGroceryListItem[], filterBy: string): IGroceryListItem[] {
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
        return filterBy ? value.filter((item: IGroceryListItem) =>
            item.name.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
    }
}
