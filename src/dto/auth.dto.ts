import { IsEmail, IsString, MinLength } from "class-validator";

export enum CustomerUserRole {
  CUSTOMER = "customer",
}

export class LoginDto {
  email: string;
  password: string;
}
export class AuthResponse {
  token: string;
  permissions: string[];
  role?: string;
}

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(10)
  password: string;

  @IsString()
  @MinLength(5)
  name: string;
}

export class TokenUserSchema {
  id: number;
  firstName: string;
  lastName: string;
}
