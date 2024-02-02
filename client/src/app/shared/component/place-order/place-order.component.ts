import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LocalstorageService } from '../../service/localstorage.service';
import { Address, User } from '../../model/user';
import { UserService } from '../../service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuelService } from '../../service/fuel.service';
import { Order } from '../../model/order';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderService } from '../../service/order.service';

@Component({
  selector: 'app-place-order',
  templateUrl: './place-order.component.html',
  styleUrls: ['./place-order.component.css']
})
export class PlaceOrderComponent implements OnInit{
  isLoadingAddresses = false;
  userAddresses: Address[] = [];
  userCity: string = '';
  checkoutOrderForm: FormGroup = this.fb.group({});
  taxes: number = 0;
  shippingCharges: number = 0;
  total: number = 0;
  warehouseCity: string = '';
  warehouseLocation: string = '';
  arrivalOn: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: { orderItems: any[], subtotal: number }, public dialogRef: MatDialogRef<PlaceOrderComponent>, private localstorageService: LocalstorageService, private userService: UserService, private fb: FormBuilder, private fuelService: FuelService, private orderService: OrderService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getAllAddresses();
    this.checkoutOrderForm = this.fb.group({
      deliveryAddress: [null, Validators.required],
      scheduleDate: [null, Validators.required],
      scheduleTime: [null, Validators.required],
      isImmediateDelivery: [false],
      isCurrentLocation: [false]
    });
    // this.getWarehouseCityAndLocation()
    this.checkoutOrderForm.valueChanges.subscribe(() => {
      this.getWarehouseCityAndLocation()
      this.calculateTaxes();
      this.calculateShippingCharges();
      this.calculateTotal();
      this.calculateArrival()
    });
  }

  getUserCity(): string {
    return this.localstorageService.getItem('currentAddress').city;
  }

  getAllAddresses(): void {
    const userId = this.localstorageService.getItem('userId')
    if (!userId) {
      console.error('User ID not found in local storage');
      return;
    }
  
    this.isLoadingAddresses = true;
    this.userService.getAddressesById(userId).subscribe(
      addresses => {
        this.userAddresses = addresses
        this.isLoadingAddresses = false;
      },
      error => {
        console.error('Error loading addresses:', error);
        this.isLoadingAddresses = false;
        this.dialogRef.close();
      }
    );
  }

  isImmediateDelivery(): boolean {
    return this.checkoutOrderForm.get('isImmediateDelivery')?.value;
  }

  isCurrentLocation(): boolean {
    return this.checkoutOrderForm.get('isCurrentLocation')?.value;
  }

  calculateTaxes(): void {
    this.taxes = this.data.subtotal * 0.05;
  }

  calculateShippingCharges(): void {
    const { warehouseCity, deliveryCity } = this.getWarehouseCityAndLocation();
    this.shippingCharges = this.getShippingCharges(deliveryCity, warehouseCity);
  }
  
  calculateTotal(): void {
    this.total = this.data.subtotal + this.taxes + this.shippingCharges;
  }

  getWarehouseCityAndLocation(): { warehouseCity: string, deliveryCity: string }{
    let selectedAddress: Address = {} as Address;
    if (this.checkoutOrderForm.get('isCurrentLocation')?.value) {
      selectedAddress = this.localstorageService.getItem('currentAddress'); 
    } else {
      selectedAddress = this.checkoutOrderForm.get('deliveryAddress')?.value;
    }

    const userDeliveryCity = selectedAddress.city
    const warehouses = this.fuelService.getWarehouses();

    switch(userDeliveryCity){
      case 'Hyderabad':
        this.warehouseCity = warehouses.find(obj => obj.city == 'Hyderabad')["city"]
        this.warehouseLocation = warehouses.find(obj => obj.city == 'Hyderabad')["location"]
        break;
      case 'Bangalore':
        this.warehouseCity = warehouses.find(obj => obj.city == 'Bangalore')["city"]
        this.warehouseLocation = warehouses.find(obj => obj.city == 'Bangalore')["location"]
        break;
      case 'Bhubaneswar':
        this.warehouseCity = warehouses.find(obj => obj.city == 'Bhubaneswar')["city"]
        this.warehouseLocation = warehouses.find(obj => obj.city == 'Bhubaneswar')["location"]
        break;
      default:
        this.warehouseCity = "Hyderabad"
        this.warehouseLocation = "Devender Colony, Kompally, Hyderabad, Telangana"
    }
    return {
      warehouseCity: this.warehouseCity,
      deliveryCity: userDeliveryCity
    }
  }

  private getShippingCharges(userDeliveryCity: string, warehouseCity: string): number { 
    let shippingRate: number = 0;

    if (userDeliveryCity === warehouseCity) {
      shippingRate = 50; 
    } else {
      // different shipping charges for different pairs of cities
      if ((userDeliveryCity === 'Hyderabad' && warehouseCity === 'Bangalore') || (userDeliveryCity === 'Bangalore' && warehouseCity === 'Hyderabad')) {
        shippingRate = 70;
      } else if ((userDeliveryCity === 'Hyderabad' && warehouseCity === 'Bhubaneswar') || (userDeliveryCity === 'Bhubaneswar' && warehouseCity === 'Hyderabad')) {
        shippingRate = 80;
      } else if ((userDeliveryCity === 'Bangalore' && warehouseCity === 'Bhubaneswar') || (userDeliveryCity === 'Bhubaneswar' && warehouseCity === 'Bangalore')) {
        shippingRate = 100;
      }
    }

    return shippingRate;
  }

  calculateArrival(): void {
    const isImmediateDelivery = this.checkoutOrderForm.get('isImmediateDelivery')?.value;
    const scheduleDate = this.checkoutOrderForm.get('scheduleDate')?.value;
    const scheduleTime = this.checkoutOrderForm.get('scheduleTime')?.value;
    const userDeliveryCity = this.checkoutOrderForm.get('deliveryAddress')?.value;
    const warehouseCity = this.warehouseCity;

    if (scheduleDate && !isImmediateDelivery) {
      const scheduleDateTime = new Date(`${scheduleDate}T${scheduleTime}`);
      this.arrivalOn = scheduleDateTime.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    } else {
      const deliveryHours = this.calculateDeliveryHours(userDeliveryCity, warehouseCity);
      const currentDate = new Date();
      currentDate.setHours(currentDate.getHours() + deliveryHours);
      this.arrivalOn = currentDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    }
  }

  private calculateDeliveryHours(userDeliveryCity: string, warehouseCity: string): number {
    let deliveryHours: number = 0;

    // different delivery hours for different pairs of cities
    if ((userDeliveryCity === 'Hyderabad' && warehouseCity === 'Bangalore') || (userDeliveryCity === 'Bangalore' && warehouseCity === 'Hyderabad')) {
      deliveryHours = 10;
    } else if ((userDeliveryCity === 'Hyderabad' && warehouseCity === 'Bhubaneswar') || (userDeliveryCity === 'Bhubaneswar' && warehouseCity === 'Hyderabad')) {
      deliveryHours = 20;
    } else if ((userDeliveryCity === 'Bangalore' && warehouseCity === 'Bhubaneswar') || (userDeliveryCity === 'Bhubaneswar' && warehouseCity === 'Bangalore')) {
      deliveryHours = 30;
    }
    if(this.isImmediateDelivery()) deliveryHours = deliveryHours/5;
    return deliveryHours;
  }

  placeOrder(): void {
    const isImmediateDelivery = this.checkoutOrderForm.get('isImmediateDelivery')?.value;
    const scheduleDate = this.checkoutOrderForm.get('scheduleDate')?.value;
    const scheduleTime = this.checkoutOrderForm.get('scheduleTime')?.value;
    const deliveryTime = new Date(Date.parse(this.arrivalOn.replace(/-/g, " ")));
    const user: User = this.localstorageService.getItem('currentUser');
    const orderDetails: Order = {
      orderItems: this.data.orderItems,
      user: user,
      totalAmount: this.total,
      isImmediate: isImmediateDelivery,
      extraCharges: this.taxes + this.shippingCharges,
      orderTime: new Date().toISOString(),
      deliveryScheduleTime: new Date(`${scheduleDate}T${scheduleTime}`).toISOString(),
      deliveryLocation: this.checkoutOrderForm.get('deliveryAddress')?.value,
      deliveryTime: deliveryTime.toISOString(),
      orderStatus: 'CONFIRMED'
    };
    console.log('Order details:', orderDetails);
    this.orderService.placeOrder(orderDetails).subscribe(
      () => {
        this.snackBar.open('Order placed successfully', 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      },
      (error) => {
        this.snackBar.open('Failed to place the order', 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
      }
    );
    this.dialogRef.close();
  }
}
