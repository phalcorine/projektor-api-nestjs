import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsOptional, MaxLength, MinLength } from "class-validator";
import { UserResource } from "../users/users.model";
import { ProjectTaskResource } from "./tasks.model";

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
        type: () => [ProjectTaskResource],
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

