import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as crypto from 'crypto';
import {hashPassword} from "./users.constant";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

    async create(dto: CreateUserDto): Promise<User> {
        const user = this.userRepository.create({
            name: dto.name,
            email: dto.email,
            salary: dto.salary,
            password: hashPassword(dto.password),
        });
        return this.userRepository.save(user);
    }

    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findOne(id: string): Promise<User> {
        const u = await this.userRepository.findOne({ where: { id } });
        if (!u) throw new NotFoundException('User not found');
        return u;
    }

    async update(id: string, dto: UpdateUserDto): Promise<User> {
        const u = await this.findOne(id);
        if (dto.password) {
            (u as any).password = hashPassword(dto.password);
        }
        Object.assign(u, dto);
        return this.userRepository.save(u);
    }

    async remove(id: string): Promise<void> {
        const u = await this.findOne(id);
        await this.userRepository.remove(u);
    }

}
