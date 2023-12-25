import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.schema';
import { Repository } from 'typeorm';
import { JwtUser } from './dto/jwt-user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { PasswordUtils } from '../../utils/password-utils';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private passUtil: PasswordUtils,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {
  }

  async validateUser(email: string, password: string): Promise<string> {

    const one = await this.userRepository.findOne(
      {
        where: {
          email: email,
        },
      },
    );

    if (one == null) {
      throw new BadRequestException('Invalid credentials');
    }

    if (!await  this.passUtil.comparePass(password, one.password)) {
      throw new BadRequestException('Invalid credentials');
    }

    const jwtUser: JwtUser = {
      name: one.name,
      role: one.name,
      email: one.email,
      id: one.id,
    };

    return this.jwtService.sign(jwtUser);

  }

  async registerUser(dto: CreateUserDto) {

    var user = this.userRepository.create(
      dto,
    );
    // user.role = dto.role;
    // user.name = dto.name;
    // user.email = dto.email;
    // user.password = dto.password;
    // return await this.userRepository.save(user);

    return user;

  }


}
