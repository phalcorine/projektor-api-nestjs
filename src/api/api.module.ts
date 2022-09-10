import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { ProjectsModule } from "./projects/projects.module";
import { UsersModule } from "./users/users.module";

@Module({
    imports: [UsersModule, AuthModule, ProjectsModule],
})
export class ApiModule { }