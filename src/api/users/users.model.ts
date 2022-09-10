import { ProjectResource } from "../projects/projects.model";

export class UserResource {
    id: number;

    cuid: string;

    full_name: string;

    email: string;

    password_hash: string;

    created_at: Date;

    updated_at: Date;

    projects?: ProjectResource[];
}

export class CreateUserDto {
    full_name: string;

    email: string;

    password_hash: string;
}