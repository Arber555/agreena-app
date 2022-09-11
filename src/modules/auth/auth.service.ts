import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from 'src/database/entities/user.entity';
import { UserService } from '../user/user.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { sign } from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { JwtPayloadDto } from './dto/jwt-payload.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async login(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const user = await this.validateUserPassword(authCredentialsDto);

    if (!user) {
      throw new UnauthorizedException('INVALID_CREDENTIALS');
    }

    const accessToken: string = this.generateAccessToken(user);
    return { accessToken };
  }

  async validateUserPassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<User> {
    const { email, password } = authCredentialsDto;
    const user = await this.userService.getByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
  }

  generateAccessToken(user: User): string {
    const payload: JwtPayloadDto = {
      userId: user.id,
      email: user.email,
    };

    const JWT_SECRET = 'secret'; // TODO: move it to .env
    const JWT_EXPIRES_IN = '3h'; // TODO: move it to .env
    const accessToken: string = sign(payload, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    return accessToken;
  }

  async validateUser(payload: JwtPayloadDto): Promise<User> {
    const user = await this.userService.getByEmail(payload.email);
    return user;
  }
}
