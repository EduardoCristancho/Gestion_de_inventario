import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, Res, Req, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { companyDTO } from './dto/companyDTO';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { credentialsDTO } from './dto/credentialsDTO';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  async login(@Body(new ValidationPipe({transform: true})) credentials: credentialsDTO,  @Res({passthrough: true}) res: Response) {
     const token = await this.authService.login(credentials);
      res.cookie('token', token, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000});
      return res.redirect('/dashboard');
    
  }

  @Get('/logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    const token = req.cookies.token;
    if(!token) return;
    await this.authService.logout(token);
    res.clearCookie('token');
    return res.redirect('/login');
  }

  @Get('/extendSession')
  async extendSession(@Req() req: Request, @Res() res: Response) {
    
      const token = req.cookies.token;
      if(!token) return;
      const tokenExtended = await this.authService.extendSession(token);
      res.clearCookie('token',{
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000
      })
      res.cookie('token', tokenExtended.token, {httpOnly: true,  maxAge: 24 * 60 * 60 * 1000});
      return res.status(200).json(tokenExtended.userInfo);
    
  }

  @Post('/authToken')
  async ValidateToken(@Body('token') token: string) {
    try{
      const Token = await this.authService.validateToken(token);
      if(!Token){
        throw new UnauthorizedException('Invalid token');
      }
      return Token;
    }catch(err){
      throw new UnauthorizedException('Invalid token');
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
    return this.authService.update(+id, updateAuthDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }
}
