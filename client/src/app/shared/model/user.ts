export interface Address {
    addressId: string;
    type: string;
    receiver: string;
    location: string;
    city: string;
    phone: string;
}

export interface Vehicle {
    vehicleId: string;
    model: string;
    color: string;
    fuelType: string;
    carType: string;
}

interface Role {
    title: string;
    description: string;
}

export interface User {
    userId: string;
    name: string;
    email: string;
    city: string;
    addresses: Address[];
    vehicles: Vehicle[];
    paymentModes: string[];
    username: string;
    password: string;
    role: Role[];
}