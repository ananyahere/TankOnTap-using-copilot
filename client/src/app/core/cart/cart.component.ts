import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cart } from 'src/app/shared/model/cart';
import { CartService } from 'src/app/shared/service/cart.service';
import { LocalstorageService } from 'src/app/shared/service/localstorage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  cart: Cart = {} as Cart;

  constructor(private cartService: CartService, private localstorageService: LocalstorageService, private snackBar: MatSnackBar) { }

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

}
