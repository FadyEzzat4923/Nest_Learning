import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users: CreateUserDto[] = [];

  constructor() {
    const data = process.env.DUMMY_DATA;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    this.users = data ? JSON.parse(data) : [];
  }

  create(createUserDto: CreateUserDto) {
    createUserDto.id = crypto.randomUUID();
    this.users.push(createUserDto);
    return { create: true };
  }

  findAll(role: string) {
    const users = this.users.filter((u) => {
      return role === '' ? u : u.role.includes(role);
    });
    if (users.length === 0) throw new NotFoundException('No users found');
    users.forEach((u) => (u.password = '********'));
    return users;
  }

  findOne(id: string) {
    const user = this.users.find((user) => user.id === id);
    if (!user) throw new NotFoundException('User not found');
    user.password = '********';
    return user;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.users.find((u) => u.id === id);
    if (!user) throw new NotFoundException('User not found');

    Object.assign(user, updateUserDto);
    this.users = this.users.map((u) => (u.id === id ? user : u));
    return { updated: true };
  }

  remove(id: string) {
    const user = this.users.find((u) => u.id === id);
    if (!user) throw new NotFoundException('User not found');
    this.users = this.users.filter((u) => u.id !== id);
    return { deleted: true };
  }
}
