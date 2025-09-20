import { Injectable, NestMiddleware, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { NextFunction, Request, Response } from "express";
import { PrismaService } from "../prisma/prisma.service";
import { AuthService } from "./auth.service";
@Injectable()
export class authenticationMiddleware implements NestMiddleware {
    constructor(private readonly JWTService: JwtService
        ,private readonly prisma: PrismaService
        ,private readonly authService: AuthService
    ) {}
    async use(req: Request, res: Response, next: NextFunction) {
        try{
            const token = req.cookies.token;
            
            if(!token){
                throw new UnauthorizedException();
            }
            //validar token
            const isValidToken = await this.authService.validateToken(token);
            if(!isValidToken){
                throw new UnauthorizedException();
            }

            const user = this.JWTService.decode(token);
            
            req['user'] = {
                id: user.id,
                username: user.username,
                companyId: user.companyId,
                rol: user.rol
            };
            

            next();
        }catch(err){
            return res.status(401).json({message: 'Unauthorized'});
        }
    }

}