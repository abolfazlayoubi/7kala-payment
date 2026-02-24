import { IsEmail, IsIn, IsOptional, IsString, Matches, MinLength } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";

export enum CustomerUserRole {
  CUSTOMER = "customer",
}

class LookUpSendType {}

export class OtpBody {
  @ApiProperty({
    example: "09217804632",
  })
  // @IsPhoneNumber("IR")
  // @IsMobilePhone("fa-IR")
  @Matches("^(\\+98|0)?9\\d{9}$")
  mobile: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  ip?: string;

  @ApiPropertyOptional({
    example: "otp",
  })
  @IsOptional()
  @IsString()
  @IsIn(["indexdown", "otp", "server", "codemodiseh", "otp7kala"])
  template: "indexdown" | "otp" | "server" | "codemodiseh" | "otp7kala" = "otp";

  @ApiPropertyOptional({
    example: "otp",
  })
  @IsOptional()
  @IsString()
  type?: LookUpSendType;
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
