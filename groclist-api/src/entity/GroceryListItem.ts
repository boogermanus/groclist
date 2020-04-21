import {
    Entity, 
    PrimaryGeneratedColumn, 
    Column, 
    ManyToOne
} from 'typeorm';
import { GroceryList } from './GroceryList';

@Entity()
export class GroceryListItem {
    constructor(pName: string, pHasCoupon: boolean, pGroceryList: GroceryList) {
        this.name = pName;
        this.groceryList = pGroceryList;
        this.isCollected = false;
        this.hasCoupon = pHasCoupon || false;
    }

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
}