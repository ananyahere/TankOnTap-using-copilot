import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cart } from 'src/app/shared/model/cart';
import { FuelItem } from 'src/app/shared/model/fuel';
import { CartService } from 'src/app/shared/service/cart.service';
import { LocalstorageService } from 'src/app/shared/service/localstorage.service';
import { OrderService } from 'src/app/shared/service/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  cart: Cart = {} as Cart;
  userCity: string = ''

  constructor(private cartService: CartService, private localstorageService: LocalstorageService, private snackBar: MatSnackBar, private orderService: OrderService) { }

  ngOnInit() {
    const userId = this.localstorageService.getItem('userId');
    if (userId) {
      this.cartService.getCartByUserId(userId).subscribe(
        (cart: Cart) => {
          this.cart = cart;
        }, (error) => {
          this.snackBar.open('Failed to fetch cart. Please try again.', 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
        }
      );
    }
    this.userCity = this.getUserCity();
  }

  removeItemFromCart(fuelItemId: string) {
    const userId = this.localstorageService.getItem('userId');
    this.cartService.removeItemFromCart(userId, fuelItemId).subscribe(
      (cart: Cart) => {
        this.cart = cart;
      }, (error) => {
        this.snackBar.open('Failed to remove item. Please try again.', 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
    );
  }

  getFuelIcon(fuelType: string): string {
    return `assets/images/${fuelType.toLowerCase()}.png`;
  }

  getUserCity(): string {
    const address = this.localstorageService.getItem('currentAddress');
    return address.city;
  }

  calculateTotal(): string {
    let total = 0;
    for (const item of this.cart.fuels) {
      let basePrice;
      switch (this.userCity) {
        case 'Hyderabad':
          basePrice = item.fuelDetail.basePriceHyd;
          break;
        case 'Bangalore':
          basePrice = item.fuelDetail.basePriceBlr;
          break;
        case 'Bhubaneswar':
          basePrice = item.fuelDetail.basePriceBhu;
          break;
        default:
          basePrice = 0;
      }
      total += item.quantity * basePrice;
    }
    return total.toFixed(2);
  }

  onBuy(fuelItem: FuelItem): void {
    this.orderService.addItemToOrder(fuelItem);
    this.removeItemFromCart(fuelItem.fuelItemId);
  }
  
}
