import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { companyDTO } from './dto/companyDTO';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { credentialsDTO } from './dto/credentialsDTO';
import { IAuth } from './IAuth';
import { employeRepository } from '../employe/employeRepository';
import { JwtService } from '@nestjs/jwt';
import { error } from 'console';
import { CreateCompanyDto } from '../company/dto/create-company.dto';
import * as bcrypt from 'bcrypt';
import { StorageService } from '../inventory/storageService';

@Injectable()
export class AuthService {
  constructor(@Inject('IAuth') private readonly authRepository: IAuth,
    @Inject('IEmployeRepository') private readonly employeRepository: employeRepository,
    @Inject(JwtService) private jwtService: JwtService,
    private readonly storageService : StorageService
  ) {}


  async signUp(createCompanyDto: CreateCompanyDto, file?: Express.Multer.File) {
      //encriptamos las credenciales
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(createCompanyDto.Password, saltRounds);
      createCompanyDto.Password = hashedPassword;
      
      //guardamos la imagen y seteamos la url a guardar
      if(file != null){
        createCompanyDto.Image = await this.storageService.savePhoto(file)
      }
      const result = await this.authRepository.signUp(createCompanyDto);
      //devolvemos el dto de entrada con el id.
      createCompanyDto.id = result.company.company_id
      return createCompanyDto;
    }
    
  async login(credentials: credentialsDTO){
    const user: any = await this.employeRepository.findOne(undefined,credentials.username);
    if(!user){
      throw new BadRequestException('Invalid Credentials');
    }
    const passwordMatch = await bcrypt.compare(credentials.password, user.password);
    
    if(!passwordMatch){
      return null;
    }

    //GENERAMOS TOKEN
    const payload = {

      id: user.user_id,
      username: credentials.username,
      companyId: user.company_id,
      rol: user.role_id,
      warehouseId: user.warehouse_id
    }

    const token = await this.jwtService.signAsync(payload);

    return token;
  }
  async logout (token: string){
    try{
      this.jwtService.verify(token);
      const userInfo = this.jwtService.decode(token);
      const revokedToken = await this.authRepository.logout(token, userInfo.id);
      if(!revokedToken){
        throw new error();
      }
      return;
    }catch(err){
      throw new BadRequestException('Error logging out');
    }
  }

  async extendSession(token: string){
    try{
      await this.logout(token);
      const user = this.jwtService.decode(token);
      const newToken = this.jwtService.sign(
        {
          id: user.id,
          username: user.username,
          companyId: user.companyId,
          rol: user.rol
        }
      );
      const newTokenInfo = this.jwtService.decode(newToken);
      return {
        token: newToken,
        userInfo: newTokenInfo
      };
    }catch(err){
      throw new BadRequestException('Error extending session');
    }
  }
  async validateToken(token:string){
        try{
            this.jwtService.verify(token);
            const TokenRevoked = await this.authRepository.findToken(token);
            if(TokenRevoked){
                return null;
            }
            const tokenInfo = this.jwtService.decode(token);
            return tokenInfo; 
        }catch(err){
            throw err;
        }
    }
  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
