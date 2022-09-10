import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { GetUser } from "../auth/get-user.decorator";
import { JwtAuthGuard } from "../auth/jwt/jwt-auth.guard";
import { UpdateUserProfileData, UpdateUserSecurityCredentialsDto } from "./profile.model";
import { ProfileService } from "./profile.service";
import { UserResource } from "./users.model";

@ApiTags('profile')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) { }

    @Post('update-profile')
    updateProfileData(@Body() payload: UpdateUserProfileData, @GetUser() user: UserResource) {
        return this.profileService.updateProfileData(payload, user.id);
    }

    @Post('update-security-credentials')
    updateSecurityCredentials(@Body() payload: UpdateUserSecurityCredentialsDto, @GetUser() user: UserResource) {
        return this.profileService.updateSecurityCredentials(payload, user.id);
    }
}