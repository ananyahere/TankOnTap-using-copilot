import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocalstorageService } from '../../service/localstorage.service';
import { Address } from '../../model/user';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit{
  isLoadingAddresses = false;
  userAddresses: Address[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: { orderItems: any[], subtotal: number }, private localstorageService: LocalstorageService, private userService: UserService) { }

  ngOnInit(): void {
    this.getAllAddresses();
  }

  getUserCity(): string {
    return this.localstorageService.getItem('currentAddress').city;
  }

  getAllAddresses(): void {
    const userId = this.localstorageService.getItem('userId');
    if (!userId) {
      console.error('User ID not found in local storage');
      return;
    }
  
    this.isLoadingAddresses = true;
    this.userService.getAddressesById(userId).subscribe(
      respise => {
        // test & verify
        this.userAddresses = addresses
        this.isLoadingAddresses = false;
      },
      error => {
        console.error('Error loading addresses:', error);
        this.isLoadingAddresses = false;
      }
    );
  }
}
