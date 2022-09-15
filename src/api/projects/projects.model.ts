import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber, IsOptional, MaxLength, MinLength } from "class-validator";
import { UserResource } from "../users/users.model";

export class ProjectResource {
    @ApiProperty({
        description: "This value represents the unique ID of the project in the database...",
        example: 4,
    })
    id: number;

    @ApiProperty({
        description: "This value represents the unique ID of the project in the business domain...",
        example: "cuid_1110011",
    })
    cuid: string;

    @ApiProperty({
        description: "This value represents the project's name...",
        example: "Build My House",
    })
    name: string;

    @ApiProperty({
        description: "This value represents the project's name...",
        example: "This is a project I have undertaken for myself and for my future...",
    })
    description: string;

    @ApiProperty({
        description: "This value represents the project's start date...",
        example: "2023-01-01",
        nullable: true,
    })
    start_date?: Date;

    @ApiProperty({
        description: "This value represents the project's end date...",
        example: "2024-01-01",
        nullable: true,
    })
    end_date?: Date;

    @ApiProperty({
        description: "This value represents the date and time the record was created..."
    })
    created_at: Date;

    @ApiProperty({
        description: "This value represents the date and time the record was last updated..."
    })
    updated_at: Date;

    @ApiProperty({
        description: "This value represents the project creator's ID..."
    })
    creator_id: number;

    @ApiProperty({
        description: "This value represents the project creator's record..."
    })
    creator?: UserResource;

    @ApiProperty({
        description: "This value represents the tasks under this project...",
        type: [ProjectTaskResource],
    })
    tasks?: ProjectTaskResource[];

    @ApiProperty({
        description: "This value represents the number of tasks under this project..."
    })
    tasksCount?: number;
}

export class CreateProjectDto {
    @ApiProperty({
        description: "This value represents the project's name...",
        example: "Build My House",
        minLength: 3,
        maxLength: 100,
    })
    @IsNotEmpty()
    @MinLength(3)
    name: string;

    @ApiProperty({
        description: "This value represents the project's description...",
        example: "This is a project I have undertaken for myself and for my future...",
        minLength: 20,
        maxLength: 500,
    })
    @IsNotEmpty()
    @MinLength(20)
    @MaxLength(500)
    description: string;

    @ApiProperty({
        description: "This value represents the project's start date...",
        example: "2023-01-01",
        nullable: true,
    })
    @IsOptional()
    @IsDate()
    start_date?: Date;

    @ApiProperty({
        description: "This value represents the project's end date...",
        example: "2024-01-01",
        nullable: true,
    })
    @IsOptional()
    @IsDate()
    end_date?: Date;
}

export class UpdateProjectDto {
    @ApiProperty({
        description: "This value represents the project's name...",
        example: "Build My House (edited)",
        minLength: 3,
        maxLength: 100,
    })
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    name: string;

    @ApiProperty({
        description: "This value represents the project's description...",
        example: "This is a project I have undertaken for myself and for my future ;)...",
        minLength: 20,
        maxLength: 500,
    })
    @IsNotEmpty()
    @MinLength(20)
    @MaxLength(500)
    description: string;

    @ApiProperty({
        description: "This value represents the project's start date...",
        example: "2023-01-01",
        nullable: true,
    })
    @IsOptional()
    @IsDate()
    start_date?: Date;

    @ApiProperty({
        description: "This value represents the project's end date...",
        example: "2024-01-01",
        nullable: true,
    })
    @IsOptional()
    @IsDate()
    end_date?: Date;
}

// Tasks

export class ProjectTaskResource {
    @ApiProperty({
        description: "This value represents the unique ID of the task in the database...",
        example: 5,
    })
    id: number;

    @ApiProperty({
        description: "This value represents the unique ID of the task in the business domain...",
        example: "cuid_1110010",
    })
    cuid: string;

    @ApiProperty({
        description: "This value represents the task's name...",
        example: "Purchase Cement",
    })
    name: string;

    @ApiProperty({
        description: "This value represents the date and time the record was created..."
    })
    created_at: Date;

    @ApiProperty({
        description: "This value represents the date and time the record was last updated..."
    })
    updated_at: Date;

    @ApiProperty({
        description: "This value represents the ID of the project the task belongs to..."
    })
    project_id: number;

    @ApiProperty({
        description: "This value represents the record of the project the task belongs to..."
    })
    project?: ProjectResource;
}

export class CreateProjectTaskDto {
    @ApiProperty({
        description: "This value represents the task's name...",
        example: "Purchase Cement",
        minLength: 3,
        maxLength: 100,
    })
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    name: string;

    @ApiProperty({
        description: "This value represents the ID of the project the task will belong to...",
        example: 6,
    })
    @IsNotEmpty()
    @IsNumber()
    project_id: number;
}

export class UpdateProjectTaskDto {
    @ApiProperty({
        description: "This value represents the task's name...",
        example: "Purchase Cement (edited)",
        minLength: 3,
        maxLength: 100,
    })
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(100)
    name: string;

    @ApiProperty({
        description: "This value represents the ID of the project the task belong to...",
        example: 6,
    })
    @IsNotEmpty()
    @IsNumber()
    project_id: number;
}