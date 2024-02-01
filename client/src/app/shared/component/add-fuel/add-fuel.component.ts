import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';
import { CartService } from '../../service/cart.service';
import { Cart } from '../../model/cart';
import { LocalstorageService } from '../../service/localstorage.service';
import { FuelItem } from '../../model/fuel';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-fuel',
  templateUrl: './add-fuel.component.html',
  styleUrls: ['./add-fuel.component.css']
})
export class AddFuelComponent {
  addCartForm: FormGroup = {} as FormGroup;
  userRole: string = ''; 

  constructor(
    public dialogRef: MatDialogRef<AddFuelComponent>, @Inject(MAT_DIALOG_DATA) public fuel: any, private fb: FormBuilder, private userService: UserService, private cartService: CartService, private localstorageService: LocalstorageService, private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.addCartForm = this.fb.group({
      quantity: [null, [Validators.required, Validators.min(1)]],
      unit: [null, Validators.required]
    });
    this.userRole = this.userService.getUserRole();    
  }
    
  addToCart() {
    const userId = this.localstorageService.getItem('userId') as string;
    const fuelItem: FuelItem = {
      fuelItemId: this.generateFuelId(),
      fuelDetail: this.fuel,
      quantity: this.addCartForm.get('quantity')?.value,
      unit: this.addCartForm.get('unit')?.value
    };
    if (userId) {
      this.cartService.addItemToCart(userId, fuelItem).subscribe(
        (cart: Cart) => {
          this.snackBar.open('Item added successfully.', 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
        },
        (error) => {
          this.snackBar.open('Failed to add item. Please try again.', 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
        }
      );
    }
  }

  generateFuelId(): string {
    return 'fuel-item-' + Math.floor(Math.random() * 1000000);
  }
}
