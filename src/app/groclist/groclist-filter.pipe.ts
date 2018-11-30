import {PipeTransform, Pipe} from '@angular/core';
import {IGroceryListItem} from './grocerylist';

@Pipe({
    name: 'grocListFilter',
})

export class GrocListFilterPipe implements PipeTransform {
    transform(value: IGroceryListItem[], filterBy: string): IGroceryListItem[] {
        filterBy = filterBy ? filterBy.toLocaleLowerCase() : null;
        return filterBy ? value.filter((item: IGroceryListItem) =>
            item.itemName.toLocaleLowerCase().indexOf(filterBy) !== -1) : value;
    }
}