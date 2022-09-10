import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto, UserResource } from './users.model';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) { }

    async list(): Promise<UserResource[]> {
        const users = await this.prisma.user.findMany({
            orderBy: { created_at: 'asc' },
        });

        return users;
    }

    async findByCuid(cuid: string): Promise<UserResource> {
        const user = await this.prisma.user.findFirst({
            where: { cuid: cuid },
            include: { projects: true },
        });

        if (!user) {
            throw new NotFoundException(
                'A user with the specified ID was not found!',
            );
        }

        return user;
    }

    async findByEmail(email: string): Promise<UserResource> {
        const user = await this.prisma.user.findFirst({
            where: { email: email },
        });

        return user;
    }

    async create(payload: CreateUserDto): Promise<UserResource> {
        const user = await this.prisma.user.create({
            data: {
                full_name: payload.full_name,
                email: payload.email,
                password_hash: payload.password_hash,
            },
        });

        return user;
    }
}
