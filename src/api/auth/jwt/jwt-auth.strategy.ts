import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UsersService } from "src/api/users/users.service";
import { JwtPayloadDto } from "../auth.model";

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly config: ConfigService,
        private readonly usersService: UsersService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: config.get('JWT_SECRET'),
        });
    }

    async validate(payload: JwtPayloadDto) {
        const user = await this.usersService.findByCuid(payload.cuid);

        if (!user) {
            throw new UnauthorizedException('You are not authenticated!');
        }

        return user;
    }
}