import {Injectable, CanActivate, ExecutionContext, UnauthorizedException} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import * as jwt from 'jsonwebtoken';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../users/entities/user.entity";
import {Repository} from "typeorm";
import {ConfigService} from "@nestjs/config";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private reflector: Reflector,
    private configService: ConfigService,
  ) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token: string | null = request.cookies.jwt || null;

    if (!token) {
      throw new UnauthorizedException('Not authorized, no token');
    }

    try {
      const decoded = jwt.verify(token, this.configService.get<string>('JWT_SECRET'));
      request.user = await this.userRepository.findOne({where: {id: decoded.userId}});

      return true;
    } catch (error) {
      throw new UnauthorizedException('Not authorized, token failed');
    }
  }
}