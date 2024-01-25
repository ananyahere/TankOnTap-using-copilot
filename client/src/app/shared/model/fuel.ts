export interface Supplier {
    name: string;
    contactNumber: string;
}

export interface Fuel {
    fuelId: string;
    type: string;
    amountInInventory: number;
    unitOfAmountInInventory: string;
    supplier: Supplier;
    basePriceHyd: number;
    basePriceBlr: number;
    basePriceBhu: number;
}

export interface FuelItem {
    fuelItemId: string;
    quantity: number;
    unit: string;
    fuelDetail: Fuel;
}