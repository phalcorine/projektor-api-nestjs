import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { GetUser } from "../auth/get-user.decorator";
import { JwtAuthGuard } from "../auth/jwt/jwt-auth.guard";
import { UserResource } from "../users/users.model";
import { CreateProjectDto, ProjectResource, UpdateProjectDto } from "./projects.model";
import { ProjectsService } from "./projects.service";

@ApiTags('projects')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('project/projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) { }

    @ApiOkResponse({
        type: [ProjectResource],
    })
    @Get()
    listByCreatorId(@GetUser() user: UserResource) {
        return this.projectsService.listByCreatorId(user.id);
    }

    @ApiParam({
        name: 'Project ID (cuid)',
    })
    @ApiOkResponse({
        type: ProjectResource,
    })
    @Get('/:id')
    findByCuid(@Param('id') cuid: string, @GetUser() user: UserResource) {
        return this.projectsService.findByCuid(cuid, user.id);
    }

    @ApiBody({
        type: CreateProjectDto,
    })
    @ApiCreatedResponse({
        type: ProjectResource,
    })
    @Post()
    create(@Body() payload: CreateProjectDto, @GetUser() user: UserResource) {
        return this.projectsService.create(payload, user.id);
    }

    @ApiParam({
        name: 'Project ID (cuid)',
    })
    @ApiBody({
        type: CreateProjectDto,
    })
    @ApiResponse({
        type: ProjectResource,
    })
    @Patch('/:id')
    update(
        @Param('id') cuid: string,
        @Body() payload: UpdateProjectDto,
        @GetUser() user: UserResource,
    ) {
        return this.projectsService.update(cuid, payload, user.id);
    }

    @ApiParam({
        name: 'Project ID (cuid)',
    })
    @Delete('/:id')
    delete(
        @Param('id') cuid: string,
        @GetUser() user: UserResource,
    ) {
        return this.projectsService.delete(cuid, user.id);
    }

}