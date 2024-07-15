import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/admin/user/user.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { PasswordService } from '../modules/admin/user/services/password.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly passwordService: PasswordService,
  ) {}

  //验证用户
  async validateUser(account: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByAccount(account);
    const isMatch = await this.passwordService.comparePassword(
      pass,
      user.password,
    );
    if (user && isMatch) {
      const { password, ...result } = user;
      return result;
    }
    //返回剔除掉密码的用户信息

    return null;
    //返回null表示验证失败
  }

  //登陆
  async login(user: any) {
    const payload: JwtPayload = {
      account: user.account,
      sub: user._id,
      role: user.role,
    };
    return this.jwtService.sign(payload);
  }
  //登陆成功后，生成一个token，返回给前端
}
