import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import {ObjectLiteral, Repository} from 'typeorm';
import { Permission } from './entities/permission.entity';
import { PermissionsService } from './permissions.service';

type MockRepo<T extends ObjectLiteral = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('PermissionsService', () => {
  let service: PermissionsService;
  let permissionRepo: MockRepo<Permission>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PermissionsService,
        {
          provide: getRepositoryToken(Permission),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PermissionsService>(PermissionsService);
    permissionRepo = module.get(getRepositoryToken(Permission));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create and save a permission', async () => {
      const dto = { name: 'View Users' };
      const created = { id: '1', name: 'View Users', slug: 'view-users' } as Permission;

      permissionRepo.create!.mockReturnValue(created);
      permissionRepo.save!.mockResolvedValue(created);

      const result = await service.create(dto as any);

      expect(permissionRepo.create).toHaveBeenCalledWith(expect.objectContaining({ name: 'View Users' }));
      expect(permissionRepo.save).toHaveBeenCalledWith(created);
      expect(result).toEqual(created);
    });
  });

  describe('findAll', () => {
    it('should return all permissions', async () => {
      const permissions = [{ id: '1', name: 'View Users' }] as Permission[];
      permissionRepo.find!.mockResolvedValue(permissions);

      const result = await service.findAll();

      expect(permissionRepo.find).toHaveBeenCalled();
      expect(result).toEqual(permissions);
    });
  });

  describe('findOne', () => {
    it('should return a permission if found', async () => {
      const permission = { id: '1', name: 'View Users' } as Permission;
      permissionRepo.findOne!.mockResolvedValue(permission);

      const result = await service.findOne('1');

      expect(permissionRepo.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
      expect(result).toEqual(permission);
    });

    it('should throw NotFoundException if not found', async () => {
      permissionRepo.findOne!.mockResolvedValue(null);

      await expect(service.findOne('99')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update and save a permission', async () => {
      const permission = { id: '1', name: 'View Users' } as Permission;
      permissionRepo.findOne!.mockResolvedValue(permission);
      permissionRepo.save!.mockResolvedValue({ ...permission, name: 'Updated' });

      const result = await service.update('1', { name: 'Updated' } as any);

      expect(result.name).toBe('Updated');
      expect(permissionRepo.save).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should remove a permission', async () => {
      const permission = { id: '1', name: 'View Users' } as Permission;
      permissionRepo.findOne!.mockResolvedValue(permission);
      permissionRepo.remove!.mockResolvedValue(permission);

      await service.remove('1');

      expect(permissionRepo.remove).toHaveBeenCalledWith(permission);
    });
  });
});
