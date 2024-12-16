import { Food } from './food';

export class CartItem {
  quantity: number = 1;
  price: number;

  constructor(public food: Food) {
    this.food = food;
    this.price = food.price;
  }
}
