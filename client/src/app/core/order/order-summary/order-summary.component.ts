import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PlaceOrderComponent } from 'src/app/shared/component/place-order/place-order.component';
import { FuelItem } from 'src/app/shared/model/fuel';
import { Order } from 'src/app/shared/model/order';
import { LocalstorageService } from 'src/app/shared/service/localstorage.service';
import { OrderService } from 'src/app/shared/service/order.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.css']
})
export class OrderSummaryComponent implements OnInit{
  currentOrder: Order | null = null;
  userCity: string = '';

  constructor(private orderService: OrderService, private localstorageService: LocalstorageService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.userCity = this.getUserCity();
    this.orderService.orderUpdate.subscribe(order => {
      this.currentOrder = order;
    });
  }

  onRemoveFromOrder(fuelItemId: string): void {
    this.orderService.removeItemFromOrder(fuelItemId);
  }

  getFuelIcon(fuelType: string): string {
    return `assets/images/${fuelType.toLowerCase()}.png`;
  }

  getUserCity(): string {
    const currentAddress = this.localstorageService.getItem('currentAddress');
    return currentAddress.city
  }

  calculateNetItemPrice(item: FuelItem): number | string {
    if (!item.fuelDetail || !item.quantity) {
      return '...';
    }
    const basePrice = this.userCity === 'Hyderabad' ? item.fuelDetail.basePriceHyd :
                      this.userCity === 'Bangalore' ? item.fuelDetail.basePriceBlr :
                      this.userCity === 'Bhubaneswar' ? item.fuelDetail.basePriceBhu : 0;
    return basePrice * item.quantity;
  }

  calculateOrderTotal(): number {
    if (!this.currentOrder || !this.currentOrder.orderItems) {
      return 0;
    }
    let total = 0;
    for (const item of this.currentOrder.orderItems) {
      const netItemPrice = this.calculateNetItemPrice(item);
      if (typeof netItemPrice === 'number') {
        total += netItemPrice;
      }
    }
    return total;
  }

  toDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  openPlaceOrderDialog(): void {
    const dialogRef = this.dialog.open(PlaceOrderComponent, {
      data: {
        orderItems: this.currentOrder?.orderItems,
        subtotal: this.calculateOrderTotal()
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // Handle the result from the dialog here
    });
  }
}
