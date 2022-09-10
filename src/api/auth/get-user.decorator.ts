import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { UserResource } from "../users/users.model";

export const GetUser = createParamDecorator((data, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request & { user?: UserResource }>();

    return request.user;
});