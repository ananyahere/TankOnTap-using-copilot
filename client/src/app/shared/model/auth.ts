import { User } from "./user";

export interface AuthRequest {
    username: string;
    password: string;
}

export interface AuthResponse {
    user: User;
    jwtToken: string;
}