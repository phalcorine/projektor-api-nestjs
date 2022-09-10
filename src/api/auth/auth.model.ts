import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { UserResource } from "../users/users.model";

export class LoginRequestDto {
    @ApiProperty({
        description: "This value represents the user's email address...",
        example: "john.smith@mail.com",
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: "This value represents the user's password...",
        example: "J0hn_Smith@123",
    })
    @IsNotEmpty()
    @MinLength(8)
    password: string;
}

export class LoginResponseDto {
    @ApiProperty({
        description: "This value represents the user's access token required to make authenticated requests...",
        example: "eyoidjlhaeojgoisrhgiwojpfijso",
    })
    access_token: string;

    @ApiProperty({
        description: "This value represents the user's information...",
    })
    user: UserResource;
}

export class SignupRequestDto {
    @ApiProperty({
        description: "This value represents the user's full name...",
        example: "John Smith",
    })
    @IsNotEmpty()
    @MinLength(3)
    full_name: string;

    @ApiProperty({
        description: "This value represents the user's email address...",
        example: "john.smith@mail.com",
    })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: "This value represents the user's password...",
        example: "J0hn_Smith@123",
    })
    @IsNotEmpty()
    @MinLength(8)
    password: string;
}

export class SignupResponseDto {
    @ApiProperty({
        description: "This value represents whether the signup process was successful or not..."
    })
    success: boolean;
}

export class JwtPayloadDto {
    cuid: string;
}