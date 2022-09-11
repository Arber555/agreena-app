import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayloadDto } from 'src/modules/auth/dto/jwt-payload.dto';

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): JwtPayloadDto => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
