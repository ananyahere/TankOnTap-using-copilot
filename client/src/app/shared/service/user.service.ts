import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Address, User, Vehicle } from '../model/user';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/api/users';

  // Initialize with a default value or null if you don't have a default value
  private currentAddressSubject = new BehaviorSubject<Address | null>(null);
  currentAddress = this.currentAddressSubject.asObservable();

  constructor(private http: HttpClient, private localStorageService: LocalstorageService) { }

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

  setCurrentAddress(address: Address): void {
    this.currentAddressSubject.next(address);
    this.localStorageService.setItem('currentAddress', address);
  }

  getUserRole(): string {
    return this.localStorageService.getItem('currentUser')['userRole'];
  }
}