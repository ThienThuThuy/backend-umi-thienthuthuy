// File: src/models/userModel.ts
export interface User {
    zaloId: string;
    name: string;
    avatar?: string;
}

export interface CreateUserResult {
    success: boolean;
    message?: string;
    user?: Omit<User, "password">;
}

export interface LoginUserResult {
    success: boolean;
    message: string;
    user?: Omit<User, "password">;
}

