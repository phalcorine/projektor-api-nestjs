import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { UserResource } from "../users/users.model";
import { LoginRequestDto, SignupRequestDto } from "./auth.model";
import { AuthService } from "./auth.service";
import { GetUser } from "./get-user.decorator";
import { JwtAuthGuard } from "./jwt/jwt-auth.guard";

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    login(@Body() payload: LoginRequestDto) {
        return this.authService.login(payload);
    }

    @Post('signup')
    signup(@Body() payload: SignupRequestDto) {
        return this.authService.signup(payload);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('check-auth')
    checkAuth(@GetUser() user: UserResource) {
        return user;
    }
}