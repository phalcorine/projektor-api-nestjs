import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { ProjectTaskResource, CreateProjectTaskDto, UpdateProjectTaskDto } from "./tasks.model";

@Injectable()
export class TasksService {
    constructor(private readonly prisma: PrismaService) { }

    async listByProjectId(projectId: number): Promise<ProjectTaskResource[]> {
        const tasks = await this.prisma.task.findMany({
            where: { project_id: projectId },
        });

        return tasks;
    }

    async findByCuid(cuid: string, projectId: number): Promise<ProjectTaskResource> {
        const task = await this.prisma.task.findFirst({
            where: { cuid: cuid, project_id: projectId },
        });

        if (!task) {
            throw new NotFoundException('A task with the specified ID was not found!');
        }

        return task;
    }

    async create(payload: CreateProjectTaskDto): Promise<ProjectTaskResource> {
        const task = await this.prisma.task.create({
            data: {
                name: payload.name,
                project_id: payload.project_id,
            },
        });

        return task;
    }

    async update(cuid: string, payload: UpdateProjectTaskDto): Promise<ProjectTaskResource> {
        const task = await this.prisma.task.findFirst({
            where: { cuid: cuid, project_id: payload.project_id },
        });

        if (!task) {
            throw new NotFoundException('Failed to perform operation as a task with the specified ID was not found!');
        }

        const updatedTask = await this.prisma.task.update({
            where: { id: task.id },
            data: {
                name: payload.name,
            },
        });

        return updatedTask;
    }

    async delete(cuid: string): Promise<void> {
        const task = await this.prisma.task.findFirst({
            where: { cuid: cuid },
        });

        if (!task) {
            throw new NotFoundException('Failed to perform operation as a task with the specified ID was not found!');
        }

        await this.prisma.task.delete({
            where: { id: task.id },
        });
    }
}