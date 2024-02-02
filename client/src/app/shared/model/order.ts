import { FuelItem } from "./fuel";
import { Address, User } from "./user";

export interface Order {
    orderId?: string;
    user: User;
    deliveryLocation: Address;
    totalAmount: number;
    isImmediate: boolean;
    extraCharges: number; // shipping charges + taxes
    orderTime: Date;
    deliveryScheduleTime: Date;
    orderItems: FuelItem[];
    deliveryOTP?: string;
    deliveryTime: Date;
    orderStatus: string;
}