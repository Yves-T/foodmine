import { Component, Input } from '@angular/core';
import { Order } from '../../../shared/models/order';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'order-items-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './order-items-list.component.html',
  styleUrl: './order-items-list.component.css',
})
export class OrderItemsListComponent {
  @Input()
  order!: Order;
}
