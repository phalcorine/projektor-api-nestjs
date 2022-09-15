// Tasks

import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, MinLength, MaxLength, IsNumber } from "class-validator";
import { ProjectResource } from "./projects.model";

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

    // @ApiProperty({
    //     description: "This value represents the record of the project the task belongs to...",
    //     type: () => ProjectResource,
    // })
    // project?: ProjectResource;
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