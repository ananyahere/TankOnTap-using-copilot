import { FuelItem } from "./fuel";
import { Address, User } from "./user";

export interface Order {
    orderId?: string;
    user: User;
    deliveryLocation: Address;
    totalAmount: number;
    isImmediate: boolean;
    extraCharges: number; // shipping charges + taxes
    orderTime: string;
    deliveryScheduleTime: string;
    orderItems: FuelItem[];
    deliveryOTP?: string;
    deliveryTime: string;
    orderStatus: string;
}