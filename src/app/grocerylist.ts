export interface IGroceryList {
    id: number;
    name: string;
    createDate: string;

}

export class GroceryList implements IGroceryList {
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
        this.createDate = new Date().toLocaleDateString();
    }

    id: number;
    name: string;
    createDate: string;
}