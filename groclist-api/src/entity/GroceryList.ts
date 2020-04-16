import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany} from 'typeorm';
import { GroceryListItem} from './GroceryListItem';
@Entity()
export class GroceryList {

    constructor(pName: string) {
        this.name = pName;
        this.isComplete = false;
    }
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public name: string;

    @CreateDateColumn()
    public createDate: Date;

    @Column()
    public isComplete: boolean;

    @OneToMany(type => GroceryListItem, item => item.groceryList)
    public items: GroceryListItem[];
}