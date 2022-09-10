import { Module } from "@nestjs/common";
import { ProfileController } from "./profile.controller";
import { ProfileService } from "./profile.service";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
    controllers: [UsersController, ProfileController],
    providers: [UsersService, ProfileService],
    exports: [UsersService],
})
export class UsersModule { }