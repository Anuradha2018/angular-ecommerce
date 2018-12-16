import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../order.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {
  orders$;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService) {
    this.orders$ = orderService.getOrders();
  }
}
