import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    request.body = ctx.getArgs().input;
    return (await super.canActivate(context)) as boolean;
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    request.body = ctx.getArgs().input;
    return request;
  }

  handleRequest(err, user, info) {
    console.log('handleRequest called');
    console.log('user: ', user);
    console.log('err: ', err);
    console.log('info: ', info);
    if (err || !user) {
      throw err || new UnauthorizedException(info?.message);
    }
    return user;
  }
}
