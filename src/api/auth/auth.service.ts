import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { BcryptService } from "src/util/bcrypt/bcrypt.service";
import { UsersService } from "../users/users.service";
import { JwtPayloadDto, LoginRequestDto, LoginResponseDto, SignupRequestDto, SignupResponseDto } from "./auth.model";

@Injectable()
export class AuthService {
    constructor(
        private readonly bcrypt: BcryptService,
        private readonly jwt: JwtService,
        private readonly prisma: PrismaService,
        private readonly usersService: UsersService,
    ) { }

    async login(payload: LoginRequestDto): Promise<LoginResponseDto> {
        const user = await this.usersService.findByEmail(payload.email);

        if (!user || !(await this.bcrypt.comparePasswords(payload.password, user.password_hash))) {
            throw new UnauthorizedException('Invalid Credentials...');
        }

        const jwtPayload: JwtPayloadDto = {
            cuid: user.cuid,
        };

        const accessToken = await this.jwt.signAsync(jwtPayload);

        return {
            access_token: accessToken,
            user: user,
        };
    }

    async signup(payload: SignupRequestDto): Promise<SignupResponseDto> {
        const user = await this.usersService.findByEmail(payload.email);

        if (user) {
            throw new ConflictException('A user with the specified email already exists!');
        }

        const hashedPassword = await this.bcrypt.hashPassword(payload.password);
        await this.usersService.create({
            ...payload,
            password_hash: hashedPassword,
        });

        return {
            success: true,
        }
    }
}