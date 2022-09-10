import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MinLength } from "class-validator";

export class UpdateUserProfileData {
    @ApiProperty({
        description: "This value represents the user's new full name...",
        example: "John Smith",
    })
    @IsNotEmpty()
    @MinLength(3)
    full_name: string;
}

export class UpdateUserSecurityCredentialsDto {
    @ApiProperty({
        description: "This value represents the user's new password...",
        example: "J0hn_Smith@123",
    })
    @IsNotEmpty()
    @MinLength(8)
    password: string;
}