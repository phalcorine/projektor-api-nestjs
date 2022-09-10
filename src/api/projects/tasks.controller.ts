import { Body, Controller, Delete, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiNoContentResponse, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt/jwt-auth.guard";
import { CreateProjectTaskDto, ProjectTaskResource, UpdateProjectTaskDto } from "./projects.model";
import { TasksService } from "./tasks.service";

@ApiTags('project-tasks')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('project/tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @ApiBody({
        type: CreateProjectTaskDto,
    })
    @ApiCreatedResponse({
        type: ProjectTaskResource,
    })
    @Post()
    create(@Body() payload: CreateProjectTaskDto) {
        return this.tasksService.create(payload);
    }

    @ApiParam({
        name: 'Project Task ID (cuid)'
    })
    @ApiBody({
        type: UpdateProjectTaskDto,
    })
    @ApiResponse({
        type: ProjectTaskResource,
    })
    @Patch('/:id')
    update(
        @Param('id') cuid: string,
        @Body() payload: UpdateProjectTaskDto,
    ) {
        return this.tasksService.update(cuid, payload);
    }

    @ApiParam({
        name: 'Project Task ID (cuid)'
    })
    @ApiNoContentResponse()
    @Delete('/:id')
    delete(
        @Param('id') cuid: string,
    ) {
        return this.tasksService.delete(cuid);
    }
}