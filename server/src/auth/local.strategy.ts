import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'account', // 对应请求体中的字段名
      passwordField: 'password', // 对应请求体中的字段名
    });
  }

  async validate(account: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(account, password);

    console.log('user in local: ', user);

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
