import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateProjectDto, ProjectResource, UpdateProjectDto } from "./projects.model";

@Injectable()
export class ProjectsService {
    constructor(private readonly prisma: PrismaService) { }

    async listByCreatorId(creatorId: number): Promise<ProjectResource[]> {
        const projects = await this.prisma.project.findMany({
            where: { creator_id: creatorId },
            include: { _count: { select: { tasks: true } } }
        });

        return projects.map(p => {
            return {
                ...p,
                tasksCount: p._count.tasks,
            }
        });
    }

    async findByCuid(cuid: string, creatorId: number): Promise<ProjectResource> {
        const project = await this.prisma.project.findFirst({
            where: { cuid: cuid, creator_id: creatorId },
            include: { tasks: true },
        });

        if (!project) {
            throw new NotFoundException('A project with the specified ID was not found!');
        }

        return project;
    }

    async create(payload: CreateProjectDto, creatorId: number): Promise<ProjectResource> {
        const project = await this.prisma.project.create({
            data: {
                name: payload.name,
                description: payload.description,
                start_date: payload.start_date,
                end_date: payload.end_date,
                creator_id: creatorId,
            },
            include: { tasks: true },
        });

        return project;
    }

    async update(cuid: string, payload: UpdateProjectDto, creatorId: number): Promise<ProjectResource> {
        const project = await this.prisma.project.findFirst({
            where: { cuid: cuid, creator_id: creatorId },
        });

        if (!project) {
            throw new NotFoundException('Failed to perform operation as a project with the specified ID was not found!');
        }

        const updatedProject = await this.prisma.project.update({
            where: { id: project.id },
            data: {
                name: payload.name,
                description: payload.description,
                start_date: payload.start_date,
                end_date: payload.end_date,
            },
            include: { tasks: true },
        });

        return updatedProject;
    }

    async delete(cuid: string, creatorId: number): Promise<void> {
        const project = await this.prisma.project.findFirst({
            where: { cuid: cuid, creator_id: creatorId },
            include: { tasks: true },
        });

        if (!project) {
            throw new NotFoundException('Failed to perform operation as a project with the specified ID was not found!');
        }

        if (project.tasks.length > 0) {
            throw new BadRequestException('Failed to delete the project as it contains at least one tasks!');
        }

        await this.prisma.project.delete({
            where: { id: project.id },
        });
    }
}