import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

  private users: CreateUserDto[] = [];

  constructor() {
    const data = process.env.DUMMY_DATA;
    this.users = data ? JSON.parse(data) : [];
  }

  create(createUserDto: CreateUserDto) {
    this.users.push(createUserDto);
    return createUserDto;
  }

  findAll(role: string) {
    return this.users.filter(u => {
      return role === "" ? u : u.role.includes(role)
    })
  }

  findOne(id: string) {
    return this.users.find((user) => user.id === id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.users.find((u) => u.id === id);
    if (!user) return null;

    Object.assign(user, updateUserDto);
    return user;
  }

  remove(id: string) {
    this.users = this.users.filter((u) => u.id !== id);
    return { deleted: true };
  }
}