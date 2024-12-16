import { inject, Injectable } from '@angular/core';
import { Order } from '../shared/models/order';
import { HttpClient } from '@angular/common/http';
import {
  ORDERS_CREATE_URL,
  ORDERS_NEW_FOR_CURRENT_USER_URL,
} from '../shared/constants/urls';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private httpClient: HttpClient = inject(HttpClient);
  constructor() {}

  create(order: Order) {
    return this.httpClient.post<Order>(ORDERS_CREATE_URL, order);
  }

  getNewOrderForCurrentUser(): Observable<Order> {
    return this.httpClient.get<Order>(ORDERS_NEW_FOR_CURRENT_USER_URL);
  }
}
