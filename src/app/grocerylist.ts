export interface IGroceryList {
    id: number;
    name: string;
    createDate: Date;

}

export class GroceryList implements IGroceryList {
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
        this.createDate = new Date();
    }

    id: number;
    name: string;
    createDate: Date;
}