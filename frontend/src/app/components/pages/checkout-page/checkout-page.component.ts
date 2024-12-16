import { Component, inject, OnInit } from '@angular/core';
import { Order } from '../../../shared/models/order';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CartService } from '../../../services/cart.service';
import { UserService } from '../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { TitleComponent } from '../../partials/title/title.component';
import { TextInputComponent } from '../../partials/text-input/text-input.component';
import { OrderItemsListComponent } from '../../partials/order-items-list/order-items-list.component';
import { MapComponent } from '../../partials/map/map.component';
import { OrderService } from '../../../services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-page',
  imports: [
    TitleComponent,
    ReactiveFormsModule,
    TextInputComponent,
    OrderItemsListComponent,
    MapComponent,
  ],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css',
})
export class CheckoutPageComponent implements OnInit {
  private cartService: CartService = inject(CartService);
  private orderService: OrderService = inject(OrderService);
  private userService: UserService = inject(UserService);
  private toastrService: ToastrService = inject(ToastrService);
  private formBuilder = inject(FormBuilder);
  private router: Router = inject(Router);

  order = new Order();
  checkoutForm!: FormGroup;

  constructor() {
    const cart = this.cartService.getCart();
    this.order.items = cart.items;
    this.order.totalPrice = cart.totalPrice;
  }
  ngOnInit(): void {
    let { name, address } = this.userService.currentUser;
    this.checkoutForm = this.formBuilder.group({
      name: [name, [Validators.required]],
      address: [address, [Validators.required]],
    });
  }

  get fc() {
    return this.checkoutForm.controls;
  }

  createOrder() {
    if (this.checkoutForm.invalid) {
      this.toastrService.warning('Please fill in the inputs', 'Invalid Inputs');
      return;
    }

    if (!this.order.addressLatLng) {
      this.toastrService.warning(
        'Please select your location on the map',
        'Location',
      );
      return;
    }

    this.order.name = this.fc.name.value;
    this.order.address = this.fc.address.value;

    this.orderService.create(this.order).subscribe({
      next: () => {
        this.router.navigateByUrl('/payment');
      },
      error: (errorResponse) => {
        this.toastrService.error(errorResponse.error, 'Cart');
      },
    });
  }
}
