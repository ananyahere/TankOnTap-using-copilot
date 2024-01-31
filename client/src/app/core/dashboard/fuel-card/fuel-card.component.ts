import { Component, Input, OnInit } from '@angular/core';
import { Fuel } from 'src/app/shared/model/fuel';
import { Address } from 'src/app/shared/model/user';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-fuel-card',
  templateUrl: './fuel-card.component.html',
  styleUrls: ['./fuel-card.component.css']
})
export class FuelCardComponent implements OnInit {
  @Input() fuel: Fuel = {} as Fuel;
  currentCity: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.currentAddress.subscribe((address: Address | null) => {
      if (address) {
        this.currentCity = this.getCityFromAddress(address);
      }
    });
  }

  getFuelIcon(fuelType: string): string {
    return `assets/images/${fuelType.toLowerCase()}.png`;
  }

  getCityFromAddress(address: Address): string {
    return address.city;
  }

  getFuelPrice(): string {
    if(this.currentCity === 'Bangalore') {
      return this.fuel.basePriceBlr.toFixed(2);
    } else if(this.currentCity === 'Hyderabad') { 
      return this.fuel.basePriceHyd.toFixed(2);
    } else if(this.currentCity === 'Bhubaneswar') {
      return this.fuel.basePriceBhu.toFixed(2);
    }
    return "0.00"
  }
}
