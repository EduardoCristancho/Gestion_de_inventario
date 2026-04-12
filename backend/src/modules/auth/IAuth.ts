import { credentialsDTO } from "./dto/credentialsDTO"
import { companyDTO } from "./dto/companyDTO"
import { CreateCompanyDto } from "../company/dto/create-company.dto"

export interface IAuth{
    signUp(company: CreateCompanyDto)
    login(credentials: credentialsDTO)
    logout(token: string, userId: number)
    registerCompany(Company: companyDTO)
    findToken(token: string)
}