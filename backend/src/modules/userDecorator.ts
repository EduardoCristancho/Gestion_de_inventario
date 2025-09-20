import { createParamDecorator,ExecutionContext } from "@nestjs/common";

export interface User {
    id: number,
    username: string,
    companyId: number,
    rol: number
}
export const User = createParamDecorator(
    (data: unknown, ctx : ExecutionContext)=>{
        const request = ctx.switchToHttp().getRequest();
        return request.user
    }
)