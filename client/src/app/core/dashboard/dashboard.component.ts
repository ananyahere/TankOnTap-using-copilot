import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddFuelComponent } from 'src/app/shared/component/add-fuel/add-fuel.component';
import { Fuel, Supplier } from 'src/app/shared/model/fuel';
import { FuelService } from 'src/app/shared/service/fuel.service';
import { UserService } from 'src/app/shared/service/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isFilterOpen = false;
  userCity: string = '';
  isCityMatched: boolean = false;
  isFuelsLoading: boolean = false;
  fuels: Fuel[] = [];
  filteredFuels: Fuel[] = [];
  showAmountFilter = false;
  showPriceFilter = false; 
  showSupplierFilter = false;
  showTypeFilter = false;
  types: string[] = [];
  suppliers: string[] = []; 
  fuelTypeFilterForm: FormGroup;
  supplierFilterForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private fuelService: FuelService, public dialog: MatDialog) { 
    this.fuelTypeFilterForm = this.fb.group({
      fuelTypes: this.fb.array(['All', ...this.types].map(() => false))
    });
    this.supplierFilterForm = this.fb.group({
      suppliers: this.fb.array(this.suppliers.map(() => false))
    }); 
  }

  ngOnInit() {
    this.userService.currentAddress.subscribe(address => {
      if (address) {
        this.userCity = address.city;
        this.isCityMatched = ['Bangalore', 'Hyderabad', 'Bhubaneswar'].includes(this.userCity);
      }
    });
    this.getFuels();
    this.getTypesAndSuppliers(this.fuels);
    this.fuelTypeFilterForm = this.fb.group({
      fuelTypes: this.fb.array(this.types.map(() => false))
    });
    this.supplierFilterForm = this.fb.group({
      suppliers: this.fb.array(this.suppliers.map(() => false))
    });    
    const fuelTypesControl = this.fuelTypeFilterForm.get('fuelTypes');
    if (fuelTypesControl) {
      fuelTypesControl.valueChanges.subscribe(selectedTypes => {
        if (selectedTypes.includes('All')) {
          this.filteredFuels = this.fuels;
        } else {
          this.filteredFuels = this.fuels.filter(fuel => selectedTypes.includes(fuel.type));
        }
      });
    }
    const fuelSuppliersControl = this.supplierFilterForm.get('suppliers');
    if (fuelSuppliersControl) {
      fuelSuppliersControl.valueChanges.subscribe(selectedSuppliers => {
        if (selectedSuppliers.includes('All')) {
          this.filteredFuels = this.fuels;
        } else {
          this.filteredFuels = this.fuels.filter(fuel => selectedSuppliers.includes(fuel.supplier.name));
        }
      });
    }
  }

  toggleFilter() {
    this.isFilterOpen = !this.isFilterOpen;
  }

  getFuels() { 
    this.isFuelsLoading = true;
    this.fuelService.getAllFuels().subscribe(fuels => {
      this.fuels = fuels;
      this.filteredFuels = fuels;
      this.isFuelsLoading = false;
    });
  }

  toggleAmountFilter() {
    this.showAmountFilter = !this.showAmountFilter;
  }

  togglePriceFilter() {
    this.showPriceFilter = !this.showPriceFilter;
  }

  toggleSupplierFilter(): void {
    this.showSupplierFilter = !this.showSupplierFilter;
  }

  toggleTypeFilter(): void {
    this.showTypeFilter = !this.showTypeFilter;
  }

  sortByPrice(order: 'asc' | 'desc') {
    if (this.userCity === 'Bangalore') {
      if (order === 'asc') this.filteredFuels.sort((a, b) => a.basePriceBlr - b.basePriceBlr);
      else this.filteredFuels.sort((a, b) => b.basePriceBlr - a.basePriceBlr);      
    } else if (this.userCity === 'Hyderabad') {
      if (order === 'asc') this.filteredFuels.sort((a, b) => a.basePriceHyd - b.basePriceHyd);
      else this.filteredFuels.sort((a, b) => b.basePriceHyd - a.basePriceHyd);      
    } else if (this.userCity === 'Bhubaneswar') {
      if (order === 'asc') this.filteredFuels.sort((a, b) => a.basePriceBhu - b.basePriceBhu);
      else this.filteredFuels.sort((a, b) => b.basePriceBhu - a.basePriceBhu);
    }
  }

  sortByAmount(order: 'asc' | 'desc') {
    if (order === 'asc') {
      this.filteredFuels.sort((a, b) => a.amountInInventory - b.amountInInventory);
    } else {
      this.filteredFuels.sort((a, b) => b.amountInInventory - a.amountInInventory);
    }
  }

  getTypesAndSuppliers(fuels: Fuel[]): void {
    const uniqueTypes = [...new Set(fuels.map(fuel => fuel.type))];
    
    const uniqueSuppliers: Supplier[] = [];
    const supplierNames = new Set();
    
    fuels.forEach(fuel => {
      if (!supplierNames.has(fuel.supplier.name)) {
        supplierNames.add(fuel.supplier.name);
        uniqueSuppliers.push(fuel.supplier);
      }
    });
    
    this.types = uniqueTypes;
    this.suppliers = uniqueSuppliers.map(supplier => supplier.name);
  }

  openAddFuelDialog(fuel: Fuel): void {
    const dialogRef = this.dialog.open(AddFuelComponent, {
      width: '500px',
      data: fuel
    });
    dialogRef.afterClosed().subscribe(result => {
      // Display success message
      
    });
  }
}
