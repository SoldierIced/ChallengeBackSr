import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { RolesService } from './roles.service';
import { Role } from './entities/role.entity';
import { Permission } from '../permissions/entities/permission.entity';
import { Repository, ObjectLiteral } from 'typeorm';

type MockRepo<T extends ObjectLiteral = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('RolesService', () => {
  let service: RolesService;
  let roleRepo: MockRepo<Role>;
  let permissionRepo: MockRepo<Permission>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RolesService,
        {
          provide: getRepositoryToken(Role),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            remove: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Permission),
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<RolesService>(RolesService);
    roleRepo = module.get(getRepositoryToken(Role));
    permissionRepo = module.get(getRepositoryToken(Permission));
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a role with permissions', async () => {
      const dto = { name: 'Admin', permissionIds: ['p1'] };
      const perms = [{ id: 'p1', slug: 'view_user' }] as Permission[];
      permissionRepo.find!.mockResolvedValue(perms);

      const created = { name: 'Admin', slug: 'admin', permissions: perms } as Role;
      roleRepo.create!.mockReturnValue(created);
      roleRepo.save!.mockResolvedValue(created);

      const result = await service.create(dto as any);
      expect(permissionRepo.find).toHaveBeenCalledWith({ where: { id: expect.any(Object) } });
      expect(roleRepo.create).toHaveBeenCalledWith(expect.objectContaining({ name: 'Admin' }));
      expect(roleRepo.save).toHaveBeenCalledWith(created);
      expect(result).toEqual(created);
    });
  });

  describe('findAll', () => {
    it('should return roles with permissions', async () => {
      const roles = [{ id: '1', name: 'User', permissions: [] }] as unknown as Role[];
      roleRepo.find!.mockResolvedValue(roles);

      const result = await service.findAll();
      expect(roleRepo.find).toHaveBeenCalledWith({ relations: ['permissions'] });
      expect(result).toEqual(roles);
    });
  });

  describe('findOne', () => {
    it('should return a role if found', async () => {
      const role = {id: '1', name: 'User', permissions: []} as unknown as Role;
      roleRepo.findOne!.mockResolvedValue(role);

      const result = await service.findOne('1');
      expect(roleRepo.findOne).toHaveBeenCalledWith({ where: { id: '1' }, relations: ['permissions'] });
      expect(result).toEqual(role);
    });

    it('should throw NotFoundException if not found', async () => {
      roleRepo.findOne!.mockResolvedValue(null);

      await expect(service.findOne('999')).rejects.toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update and save a role', async () => {
      const role = { id: '1', name: 'User', permissions: [] } as unknown as Role;
      roleRepo.findOne!.mockResolvedValue(role);
      roleRepo.save!.mockResolvedValue({ ...role, name: 'Updated' });

      const result = await service.update('1', { name: 'Updated' } as any);
      expect(result.name).toBe('Updated');
      expect(roleRepo.save).toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should remove a role', async () => {
      const role = { id: '1', name: 'User' } as Role;
      roleRepo.findOne!.mockResolvedValue(role);
      roleRepo.remove!.mockResolvedValue(role);

      await service.remove('1');
      expect(roleRepo.remove).toHaveBeenCalledWith(role);
    });
  });
});
