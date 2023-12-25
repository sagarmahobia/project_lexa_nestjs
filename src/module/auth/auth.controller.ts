import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RestResponse } from '../../dto/response.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from './decorators/public.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { HasRole } from './decorators/role.decorator';
import { Roles } from './roles.enum';
import { PasswordUtils } from '../../utils/password-utils';

@ApiTags('Auth')
@Controller('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(
    private passUtils: PasswordUtils,
    private authService: AuthService,
  ) {
  }

  @Get('login')
  @Public()
  async login(
    @Query('email') email: string,
    @Query('password') password: string,
  ): Promise<RestResponse> {


    let token = await this.authService.validateUser(email, password);

    return {
      success: true,
      data: {
        token: token,
      },
      message: 'Login success',
    };
  }


  //only admin can add Validators and Contributors for now.
  @Post('register')
  @HasRole(Roles.Admin)
  async register(
    @Body() dto: CreateUserDto,
  ): Promise<RestResponse> {


    const hPassword = await this.passUtils.hashPassword(dto.password);
    dto.password = hPassword;

    let didCreate = await this.authService.registerUser(dto);


    if (didCreate) {
      return {
        success: true,
        data: null,
        message: 'User Created.',
      };
    } else {
      return {
        success: false,
        data: null,
        message: 'Failed to create user.',
      };
    }

  }


  @Get('test')
  //no public means protected
  async test(
    @Req() req,
  ): Promise<RestResponse> {
    var user = req.user;
    return {
      success: true,
      data: user,
      message: 'Test success',
    };
  }

}
