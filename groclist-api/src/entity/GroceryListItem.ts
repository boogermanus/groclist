import {
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    ManyToOne
} from 'typeorm';
import { GroceryList } from './GroceryList';
import { GroceryListItemDTO } from 'src/DTO/grocery-list-item.dto';

@Entity()
export class GroceryListItem {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @Column()
    public isCollected: boolean;

    @Column()
    public hasCoupon: boolean;

    // required because of the OneToMany of GroceryList
    @ManyToOne(type => GroceryList, groceryList => groceryList.items, {
        onDelete: 'CASCADE',
    })
    public groceryList: GroceryList;
    
    constructor(pItem: GroceryListItemDTO, pGroceryList: GroceryList) {
        this.name = pItem.name;
        this.isCollected = false;
        this.groceryList = pGroceryList;
        this.hasCoupon = pItem.hasCoupon || false; 
    }


}