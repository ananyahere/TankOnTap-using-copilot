import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { FuelItem } from 'src/app/shared/model/fuel';
import { Order } from 'src/app/shared/model/order';
import { LocalstorageService } from 'src/app/shared/service/localstorage.service';
import { OrderService } from 'src/app/shared/service/order.service';

declare const Razorpay: any;

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit{
  order: Order = {} as Order;
  isOrderLoading = false;
  orderStatusCode: number = 1;
  deliveryPIN: string = '';
  isDeliveryPINPresent: boolean = false;
  showDelivery: boolean = false;
  userCity: string = '';

  constructor(private route: ActivatedRoute, private orderService: OrderService, private snackBar: MatSnackBar, private localstorageService: LocalstorageService) { }

  ngOnInit(): void {
    this.userCity = this.getUserCity();
    const orderId = this.route.snapshot.paramMap.get('id');
    if (orderId) {
      this.isOrderLoading = true;
      this.orderService.getOrderById(orderId).subscribe(
      response => {
        this.order = response.data;
        this.orderStatusCode = this.getOrderStatusNumber(this.order.orderStatus.toLowerCase());
        console.log(this.orderStatusCode) 
        this.isDeliveryPINPresent = this.order.deliveryOTP ? true : false;
        this.isOrderLoading = false;
      },
      error => {
        this.snackBar.open('Error loading orders', 'Close', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
        });
        this.isOrderLoading = false;
      });
    }
  }

  getFuelIcon(fuelType: string): string {
    return `assets/images/${fuelType.toLowerCase()}.png`;
  }

  getOrderStatusNumber(orderStatus: string): number {
    switch (orderStatus) {
      case 'confirmed':
        return 1;
      case 'payment-received':
        return 2;
      case 'en-route':
        return 3;
      case 'delivered':
        return 4;
      default:
        return 0;
    }
  }

  generatedeliveryPIN(): void {
    if (this.order && this.order.orderId) {
      this.orderService.generateDeliveryOTP(this.order.orderId).subscribe(
        response => {
          this.deliveryPIN = response.data;
          this.isDeliveryPINPresent = true;
        },
        error => {
          this.snackBar.open('Error generating OTP', 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
        }
      );
    }
  }

  toggleShowDelivery(): void {
    if(this.isDeliveryPINPresent) this.showDelivery = !this.showDelivery;
    else {
      this.generatedeliveryPIN()
      this.showDelivery = true;
    }
  }

  formatDate(dateString: string): string {
    let date = new Date();
    if (dateString) date = new Date(dateString);
    const monthNames = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const day = date.getDate();
    const formattedDate = `${monthNames[monthIndex]} ${day}, ${year}`;
    return formattedDate;
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

  getUserCity(): string {
    const currentAddress = this.localstorageService.getItem('currentAddress');
    return currentAddress.city
  }

  generatePayment(): void {
    var options = {
      description: 'Sample Razorpay demo',
      currency: 'INR',
      amount: Math.floor(this.order.totalAmount) * 100,
      name: 'Fuel Checkout',
      key: 'rzp_test_YANFvEeCNTFaQ2',
      image: '',
      order_id: null,
      prefill: {
        name: 'Ananya Sharma',
        email: 'ananyasubodh8@gmail.com',
        phone: '6378443464'
      },
      theme: {
        color: '#f05454'
      },
      handler: () => {
        this.postPayment()
      },
      modal: {
        ondismiss: () => {
          console.log('dismissed')
        }
  
      }
    }
    var rzp1 = new Razorpay(options);
    rzp1.open();
  }

  postPayment(): void {
    if (this.order && this.order.orderId) {
      this.orderService.updateOrderStatus(this.order.orderId, "ayment-Received").subscribe(
        () => {
          this.orderStatusCode = 2;
          this.snackBar.open('Payment received', 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
        },
        error => {
          this.snackBar.open('Error updating order status', 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
          });
        }
      );
    }
  }

  onPaymentStatus(): void {
    if (this.orderStatusCode && this.orderStatusCode >= 2) {
      this.snackBar.open('Payment done', 'Close', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
      });
    } else {
      this.generatePayment();
    }
  }

}
