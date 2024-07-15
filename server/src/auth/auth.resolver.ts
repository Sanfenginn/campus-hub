import { LoginRequestDto } from './dtos/login-request.dto';
import { LoginResponseDto } from './dtos/login-response.dto';
import { AuthService } from './auth.service';
import { Args, Mutation, Resolver, Context } from '@nestjs/graphql';
import { LocalAuthGuard } from './local-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponseDto)
  @UseGuards(LocalAuthGuard)
  async login(
    @Args('input') input: LoginRequestDto,
    @Context() context,
  ): Promise<LoginResponseDto> {
    const user = context.req.user._doc; // 从上下文中获取已验证的用户对象，不要用从请求中获取的用户对象
    // console.log('user in resolver: ', user);
    const token = await this.authService.login(user);
    const role = user.role;
    return { role, token };
  }
}
