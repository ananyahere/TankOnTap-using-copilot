import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fuel } from '../model/fuel';

@Injectable({
  providedIn: 'root'
})
export class FuelService {
  private apiUrl = 'http://localhost:8080/api/fuel'; // replace with your API URL

  private warehouses = [
    {
      location: "Devender Colony, Kompally, Hyderabad, Telangana",
      city: "Hyderabad"
    },
    {
      location: "Doddanekkundi Industrial Area Rd, Ferns Paradise, Doddanekkundi, Bengaluru, Karnataka",
      city: "Bangalore"
    },
    {
      location: "Ranipur Industrial Area, Khurda, Bhubaneswar, Orissa",
      city: "Bhubaneswar"
    }
  ]

  constructor(private http: HttpClient) { }

  getAllFuels(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  getFuelById(fuelId: string): Observable<Fuel> {
    return this.http.get<Fuel>(`${this.apiUrl}/${fuelId}`);
  }

  addFuel(fuel: Fuel): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/`, fuel);
  }

  updateFuel(fuelId: string, fuel: Fuel): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${fuelId}`, fuel);
  }

  getWarehouses(): any[] {
    return this.warehouses;
  }
}
