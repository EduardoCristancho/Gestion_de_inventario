import { SetMetadata } from "@nestjs/common";
import { permittedRoles } from "./permittedRoles";

export  const ROLES_KEY = 'roles';
export const Roles = (...roles: permittedRoles[]) => SetMetadata(ROLES_KEY, roles);