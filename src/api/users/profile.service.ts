import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { BcryptService } from "src/util/bcrypt/bcrypt.service";
import { UpdateUserProfileData, UpdateUserSecurityCredentialsDto } from "./profile.model";
import { UserResource } from "./users.model";

@Injectable()
export class ProfileService {
    constructor(
        private readonly bcrypt: BcryptService,
        private readonly prisma: PrismaService,
    ) { }

    async updateProfileData(payload: UpdateUserProfileData, userId: number): Promise<UserResource> {
        const user = await this.prisma.user.findFirst({
            where: { id: userId },
        });
        if (!user) {
            throw new NotFoundException('A user with the specified ID was not found!');
        }

        const updatedUser = await this.prisma.user.update({
            where: { id: userId },
            data: {
                full_name: payload.full_name,
            },
        });

        return updatedUser;
    }

    async updateSecurityCredentials(payload: UpdateUserSecurityCredentialsDto, userId: number): Promise<UserResource> {
        const user = await this.prisma.user.findFirst({
            where: { id: userId },
        });
        if (!user) {
            throw new NotFoundException('A user with the specified ID was not found!');
        }

        const samePassword = await this.bcrypt.comparePasswords(payload.password, user.password_hash);
        if (samePassword) {
            throw new BadRequestException('The specified password can not be the same as the current one!');
        }

        const hashedPassword = await this.bcrypt.hashPassword(payload.password);

        const updatedUser = await this.prisma.user.update({
            where: { id: userId },
            data: {
                password_hash: hashedPassword,
            },
        });

        return updatedUser;
    }
}