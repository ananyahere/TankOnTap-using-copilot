 import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Order } from '../model/order';
import { FuelItem } from '../model/fuel';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private apiUrl = 'http://localhost:8080/api/order';
  public orderUpdate = new BehaviorSubject<Order | null>(null);
  public currentOrder: Order | null = null;

  constructor(private http: HttpClient) { }

  placeOrder(order: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, order);
  }

  getAllOrders(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getOrderById(orderId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${orderId}`);
  }

  updateOrder(orderId: string, order: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${orderId}`, order);
  }

  generateDeliveryOTP(orderId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${orderId}/otp`);
  }

  getLastOrderTimePlacedByUser(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/${userId}/last`);
  }

  getOrdersForUser(userId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/user/${userId}`);
  }

  addItemToOrder(fuelItem: FuelItem): void {
    if(this.currentOrder === null) {
      this.currentOrder = {} as Order;
      this.currentOrder.orderItems = [];
    }
    this.currentOrder.orderItems.push(fuelItem);
    this.orderUpdate.next(this.currentOrder);
  }

  removeItemFromOrder(fuelItemId: string): void {
    if (this.currentOrder) {
      this.currentOrder.orderItems = this.currentOrder.orderItems.filter(item => item.fuelItemId !== fuelItemId);
      this.orderUpdate.next(this.currentOrder);
    }
  }

}
