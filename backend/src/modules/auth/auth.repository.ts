import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { credentialsDTO } from "./dto/credentialsDTO";
import { IAuth } from "./IAuth";
import { companyDTO } from "./dto/companyDTO";

@Injectable()
export class authRepository implements IAuth{
    constructor(private readonly prisma: PrismaService){}
    login(credentials: credentialsDTO) {
        
    }
    async logout(token: string, userId: number) {
        const revokedToken = await this.prisma.revokedToken.create({
            data: {
                token: token,
                user_id: userId,
                revoked_at: new Date(),
                reason: 'logout'
            }
        })
        return revokedToken
    }
    registerCompany(Company: companyDTO) {
        
    }

   async findToken(token: string) {
        const TokenRevoked = await this.prisma.revokedToken.findFirst({
            where:{
                token: token
            }
        })
        return TokenRevoked;
    }
}