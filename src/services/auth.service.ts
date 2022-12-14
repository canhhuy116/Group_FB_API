import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { SECRET_KEY, REFRESH_TOKEN_KEY } from '@config';
import DB from '@databases';
import { CreateUserDto } from '@dtos/users.dto';
import { HttpException } from '@exceptions/HttpException';
import { DataStoredInToken, TokenData } from '@interfaces/auth.interface';
import { User } from '@/interfaces/users.interface';
import { isEmpty } from '@utils/util';
import { AuthUserDto } from '@/dtos/auth.dto';
import { createRedisClient } from '@helpers/connectionRedis';

class AuthService {
  public users = DB.Users;

  public async signup(userData: CreateUserDto): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User = await this.users.findOne({ where: { email: userData.email } });
    if (findUser) throw new HttpException(409, `This email ${userData.email} already exists`);

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = await this.users.create({ ...userData, password: hashedPassword });

    return createUserData;
  }

  public async login(userData: AuthUserDto): Promise<{ cookie: string; refreshToken: TokenData; findUser: User }> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User = await this.users.findOne({ where: { email: userData.email } });
    if (!findUser) throw new HttpException(409, `This email ${userData.email} was not found`);

    const isPasswordMatching: boolean = await compare(userData.password, findUser.password);
    if (!isPasswordMatching) throw new HttpException(409, 'Password not matching');

    const accessToken = this.createToken(findUser);
    const refreshToken = await this.createRefreshToken(findUser);
    const cookie = this.createCookie(accessToken);

    return { cookie, refreshToken, findUser };
  }

  public async logout(userData: User): Promise<User> {
    if (isEmpty(userData)) throw new HttpException(400, 'userData is empty');

    const findUser: User = await this.users.findOne({ where: { email: userData.email, password: userData.password } });
    if (!findUser) throw new HttpException(409, "User doesn't exist");

    const client = await createRedisClient();
    await client.del(findUser.id.toString());
    await client.quit();

    return findUser;
  }

  public refreshToken(userData: User): string {
    const accessToken = this.createToken(userData);
    const cookie = this.createCookie(accessToken);

    return cookie;
  }

  public createToken(user: User): TokenData {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secretKey: string = SECRET_KEY;
    const expiresIn: number = 60 * 60;

    return { expiresIn, token: sign(dataStoredInToken, secretKey, { expiresIn }) };
  }

  public createCookie(tokenData: TokenData): string {
    return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
  }

  public async createRefreshToken(user: User): Promise<TokenData> {
    const dataStoredInToken: DataStoredInToken = { id: user.id };
    const secretKey: string = REFRESH_TOKEN_KEY;
    const expiresIn: number = 60 * 60 * 24 * 7;
    const token = sign(dataStoredInToken, secretKey, { expiresIn });

    const client = await createRedisClient();
    await client.set(user.id.toString(), token, { EX: expiresIn });
    await client.quit();
    return { expiresIn, token };
  }
}

export default AuthService;
