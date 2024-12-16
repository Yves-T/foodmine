import { Component, inject } from '@angular/core';
import { Order } from '../../../shared/models/order';
import { OrderService } from '../../../services/order.service';
import { Router } from '@angular/router';
import { OrderItemsListComponent } from '../../partials/order-items-list/order-items-list.component';
import { TitleComponent } from '../../partials/title/title.component';
import { MapComponent } from '../../partials/map/map.component';

@Component({
  selector: 'app-payment-page',
  imports: [OrderItemsListComponent, TitleComponent, MapComponent],
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.css',
})
export class PaymentPageComponent {
  private orderService: OrderService = inject(OrderService);
  private router: Router = inject(Router);

  order = new Order();

  constructor() {
    this.orderService.getNewOrderForCurrentUser().subscribe({
      next: (order) => {
        this.order = order;
      },
      error: () => {
        this.router.navigateByUrl('/checkout');
      },
    });
  }
}
