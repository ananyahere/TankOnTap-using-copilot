import { FuelItem } from "./fuel";
import { User } from "./user";

export interface Cart {
    cartId: string;
    user: User;
    fuels: FuelItem[];
}