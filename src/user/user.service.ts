import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from '../config';
import { UserResponseInterface } from './types/userResponse.interface';
import { LoginUserDto } from './dto/loginUser.dto';
import { compare } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userByEmail = await this.userRepository.findOne({
      email: createUserDto.email,
    })
    const userByUsername = await this.userRepository.findOne({
      username: createUserDto.username,
    })

    if (userByEmail || userByUsername) {
      throw new HttpException('Email or username are taken', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);
    // console.log('newUser:', newUser);
    return await this.userRepository.save(newUser);
  }

  generateJwt(user: UserEntity): string {
    return sign({
      id: user.id,
      username: user.username,
      email: user.email,
    }, JWT_SECRET);
  }

  buildUserResponse(user: UserEntity): UserResponseInterface {
    return {
      user: {
        ...user,
        token: this.generateJwt(user),
      },
    };
  }

  // async loginUser(loginUserDto: LoginUserDto): Promise<UserResponseInterface> {
  async loginUser(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      email: loginUserDto.email,
    }, {
      select: ['id', 'username', 'email', 'bio', 'image', 'password'],
    });

    console.log('USER:', user, 'loginUserDto:', loginUserDto);

    if (user) {
      const match = await compare(loginUserDto.password, user.password);
      console.log('match:', match);

      if (match) {
        delete user.password;

        return user;
        // return {
        //   user: {
        //     ...user,
        //     token: this.generateJwt(user),
        //   },
        // };
      }

      throw new HttpException('Password not matched', HttpStatus.UNAUTHORIZED)
    }

    throw new HttpException('User not found', HttpStatus.UNPROCESSABLE_ENTITY)
  }
}
