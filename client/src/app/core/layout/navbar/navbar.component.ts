import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/service/user.service';
import { LocalstorageService } from 'src/app/shared/service/localstorage.service';
import { Address } from 'src/app/shared/model/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  showDropdown = false;
  addresses: Address[] = [];
  currentAddress: Address | null = null;

  constructor(private userService: UserService, private localStorageService: LocalstorageService) { }

  ngOnInit(): void {
    this.loadAddresses();
    const currentAddress = this.localStorageService.getItem('currentAddress');
    if (currentAddress) {
      this.currentAddress = currentAddress;
      this.userService.setCurrentAddress(currentAddress);
    }    
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  formatAddress(address: Address): string {
    return `${address.receiver}, ${address.location}, ${address.city}`;
  }

  setCurrentAddress(address: Address): void {
    this.currentAddress = address;
    this.userService.setCurrentAddress(address);
    this.toggleDropdown();
  }

  loadAddresses(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.userService.getUserById(userId).subscribe(user => {
        this.addresses = user.addresses;
      });
    }
  }  
}

