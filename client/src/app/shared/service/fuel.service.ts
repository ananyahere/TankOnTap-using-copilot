import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fuel } from '../model/fuel';


@Injectable({
  providedIn: 'root'
})
export class FuelService {
  private apiUrl = 'http://localhost:8080/api/fuel'; // replace with your API URL

  constructor(private http: HttpClient) { }

  getAllFuels(): Observable<Fuel[]> {
    return this.http.get<Fuel[]>(`${this.apiUrl}/`);
  }

  getFuelById(fuelId: string): Observable<Fuel> {
    return this.http.get<Fuel>(`${this.apiUrl}/${fuelId}`);
  }

  addFuel(fuel: Fuel): Observable<Fuel> {
    return this.http.post<Fuel>(`${this.apiUrl}/`, fuel);
  }

  updateFuel(fuelId: string, fuel: Fuel): Observable<Fuel> {
    return this.http.put<Fuel>(`${this.apiUrl}/${fuelId}`, fuel);
  }
}
