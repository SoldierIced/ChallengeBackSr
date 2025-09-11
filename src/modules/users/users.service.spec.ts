import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {ObjectLiteral, Repository} from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { hashPassword } from './users.constant';

jest.mock('./users.constant', () => ({
  hashPassword: jest.fn().mockImplementation(async (p: string) => `hashed-${p}`),
}));

type MockRepo<T extends ObjectLiteral = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;


describe('UsersService', () => {
  let service: UsersService;
  let userRepo: MockRepo<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            remove: jest.fn(),
            createQueryBuilder: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepo = module.get(getRepositoryToken(User));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should hash password and save user', async () => {
      const dto = { name: 'Test', email: 'test@mail.com', salary: 1000, password: '1234' };
      const created = { ...dto, id: '1', password: 'hashed-1234' } as User;

      userRepo.create!.mockReturnValue(created);
      userRepo.save!.mockResolvedValue(created);

      const result = await service.create(dto as any);

      expect(hashPassword).toHaveBeenCalledWith('1234');
      expect(userRepo.create).toHaveBeenCalledWith(expect.objectContaining({ password: 'hashed-1234' }));
      expect(result).toEqual(created);
    });
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const users = [{ id: '1', name: 'Test' }] as User[];
      userRepo.find!.mockResolvedValue(users);

      const result = await service.findAll();

      expect(userRepo.find).toHaveBeenCalled();
      expect(result).toEqual(users);
    });
  });

  describe('findOne', () => {
    it('should return a user if found', async () => {
      const user = { id: '1', name: 'Test' } as User;
      userRepo.findOne!.mockResolvedValue(user);

      const result = await service.findOne('1');

      expect(userRepo.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
      expect(result).toEqual(user);
    });

    it('should throw NotFoundException if not found', async () => {
      userRepo.findOne!.mockResolvedValue(null);

      await expect(service.findOne('99')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findOneWithRelations', () => {
    it('should build query with relations', async () => {
      const qb: any = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue({ id: '1', name: 'Test' }),
      };
      userRepo.createQueryBuilder!.mockReturnValue(qb);

      const result = await service.findOneWithRelations({ id: '1' });

      expect(userRepo.createQueryBuilder).toHaveBeenCalledWith('user');
      expect(result).toEqual({ id: '1', name: 'Test' });
    });
  });

  describe('findByEmail', () => {
    it('should query by email including password', async () => {
      const qb: any = {
        addSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue({ id: '1', email: 'test@mail.com', password: 'hashed' }),
      };
      userRepo.createQueryBuilder!.mockReturnValue(qb);

      const result = await service.findByEmail('test@mail.com');

      expect(userRepo.createQueryBuilder).toHaveBeenCalledWith('user');
      expect(result?.email).toBe('test@mail.com');
    });
  });

  describe('update', () => {
    it('should update user and hash password if provided', async () => {
      const user = { id: '1', name: 'Test', password: 'old' } as User;
      jest.spyOn(service, 'findOne').mockResolvedValue(user);
      userRepo.save!.mockResolvedValue({ ...user, name: 'Updated', password: 'hashed-new' });

      const result = await service.update('1', { name: 'Updated', password: 'new' } as any);

      expect(hashPassword).toHaveBeenCalledWith('new');
      expect(result.name).toBe('Updated');
      expect(result.password).toBe('hashed-new');
    });
  });

  describe('remove', () => {
    it('should remove user', async () => {
      const user = { id: '1', name: 'Test' } as User;
      jest.spyOn(service, 'findOne').mockResolvedValue(user);
      userRepo.remove!.mockResolvedValue(user);

      await service.remove('1');

      expect(userRepo.remove).toHaveBeenCalledWith(user);
    });
  });
});
