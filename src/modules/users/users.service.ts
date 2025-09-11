import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {User} from './entities/user.entity';
import {CreateUserDto} from './dto/create-user.dto';
import {UpdateUserDto} from './dto/update-user.dto';
import * as crypto from 'crypto';
import {hashPassword} from "./users.constant";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) {
    }

    async create(dto: CreateUserDto): Promise<User> {
        const user = this.userRepository.create({
            name: dto.name,
            email: dto.email,
            salary: dto.salary,
            password: await hashPassword(dto.password),
        });
        return this.userRepository.save(user);
    }

    findAll(): Promise<User[]> {
        return this.userRepository.find();
    }

    async findOne(id: string): Promise<User> {
        const user = await this.userRepository.findOne({where: {id}});
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    async findOneWithRelations(where: Partial<User>, selects: string[] = []) {
        return this.userRepository
            .createQueryBuilder('user')
            .leftJoinAndSelect('user.role', 'role')
            .leftJoinAndSelect('role.permissions', 'permission')
            .where(where)
            .select([
                'user.id',
                'user.name',
                'user.email',
                'user.salary',
                'role.id',
                'role.name',
                'role.slug',
                'permission.id',
                'permission.slug',
            ])
            .addSelect(selects)

            .getOne();
    }

    async findByEmail(email: string): Promise<User | null> {
        return await this.userRepository.createQueryBuilder('user')
            .addSelect('user.password')
            .where('user.email = :email', {email})
            .getOne();
    }

    async update(id: string, dto: UpdateUserDto): Promise<User> {
        const user = await this.findOne(id);
        if (dto.password) {
            (user as any).password = await hashPassword(dto.password);
        }
        Object.assign(user, dto);
        return this.userRepository.save(user);
    }

    async remove(id: string): Promise<void> {
        const user = await this.findOne(id);
        await this.userRepository.remove(user);
    }

}
