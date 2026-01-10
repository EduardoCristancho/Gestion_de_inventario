import { credentialsDTO } from "./dto/credentialsDTO"
import { companyDTO } from "./dto/companyDTO"

export interface IAuth{
    login(credentials: credentialsDTO)
    logout(token: string, userId: number)
    registerCompany(Company: companyDTO)
    findToken(token: string)
}