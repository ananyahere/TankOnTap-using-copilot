import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Address, User, Vehicle } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) { }

  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  getAddressesById(id: string): Observable<Address[]> {
    return this.http.get<Address[]>(`${this.apiUrl}/${id}/addresses`);
  }

  saveAddress(id: string, address: Address): Observable<Address> {
    return this.http.post<Address>(`${this.apiUrl}/${id}/addresses`, address);
  }

  getVehiclesByUserId(id: string): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${this.apiUrl}/${id}/vehicles`);
  }

  saveVehicle(id: string, vehicle: Vehicle): Observable<Vehicle> {
    return this.http.post<Vehicle>(`${this.apiUrl}/${id}/vehicles`, vehicle);
  }

  updateCity(id: string, city: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/${id}/updateCity`, city);
  }

  updateName(id: string, name: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/${id}/updateName`, name);
  }
}