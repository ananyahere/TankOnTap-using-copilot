import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  private apiKey = '80c56e4b58a14bbe9a56883dc42474a8';

  constructor(private http: HttpClient) { }

  public getUserCoords(): Promise<{latitude: number, longitude: number}> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => resolve({latitude: position.coords.latitude, longitude: position.coords.longitude}),
          error => reject(error)
        );
      } else {
        reject('Geolocation is not supported by this browser.');
      }
    });
  }

  public getCityAndAddress(latitude: number, longitude: number): Observable<any> {
    return this.http.get<any>(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&&apiKey=${this.apiKey}`).pipe(
      map(response => {
        const city = response.results[0].city;
        const address = response.results[0].formatted;
        return {
          city,
          address
        }
      })
    );
  }
  
}