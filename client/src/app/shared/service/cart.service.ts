import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FuelItem } from '../model/fuel';
import { Cart } from '../model/cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl = 'http://localhost:8080/api/cart';

  constructor(private http: HttpClient) { }

  addItemToCart(userId: string, fuelItem: FuelItem): Observable<Cart> {
    return this.http.post<Cart>(`${this.apiUrl}/${userId}/addItem`, fuelItem);
  }

  getCartByUserId(userId: string): Observable<Cart> {
    return this.http.get<Cart>(`${this.apiUrl}/${userId}`);
  }

  removeItemFromCart(userId: string, fuelItemId: string): Observable<Cart> {
    return this.http.delete<Cart>(`${this.apiUrl}/${userId}/removeItem`, { body: { fuelItemId } });
  }
}
