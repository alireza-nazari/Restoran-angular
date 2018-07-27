export class MealModel{
    public id: number;
    public amount: number;
    public client: string;
    
    constructor(id: number, amount: number, client: string){
        this.id = id;
        this.amount = amount;
        this.client = client;
    }
}