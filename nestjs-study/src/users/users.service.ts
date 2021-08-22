import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private connection: Connection,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const user = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;

    return this.userRepository.save(user);
  }

  findAll(): Promise<Array<User>> {
    return this.userRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }

  async createMany(users: User[]) {
    await this.connection.transaction(async (manager) => {
      await manager.save(users[0]);
      await manager.save(users[1]);
    });
  }
}
