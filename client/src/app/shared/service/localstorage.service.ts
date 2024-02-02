import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  setItem(key: string, value: any): void {
    console.log("item to be set: ", key, value)
    // if (typeof value === 'string') {
    //   localStorage.setItem(key, value);
    // } else {
    //   localStorage.setItem(key, JSON.stringify(value));
    // }
    localStorage.setItem(key, JSON.stringify(value));
  }

  getItem(key: string): any {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}