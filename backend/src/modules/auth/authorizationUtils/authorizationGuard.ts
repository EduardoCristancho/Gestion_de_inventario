import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { ROLES_KEY } from "./authorizationDecorator";
import { permittedRoles } from "./permittedRoles";
@Injectable()
export class AuthorizationGuard implements CanActivate {
    constructor(private reflector: Reflector) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.getAllAndOverride<permittedRoles[]>(ROLES_KEY,[
            context.getHandler(),
            context.getClass()
        ])
        if(!roles){
            return true;
        }
        const user = context.switchToHttp().getRequest().user;
        return roles.includes(user.rol);
    }
}