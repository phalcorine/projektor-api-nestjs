import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UsersService } from "./users.service";

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Get()
    list() {
        return this.usersService.list();
    }

    @Get('/:id')
    findByCuid(@Param('id') id: string) {
        return this.usersService.findByCuid(id);
    }
}