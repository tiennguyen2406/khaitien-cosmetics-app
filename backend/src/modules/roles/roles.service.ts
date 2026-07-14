import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from './entities/role.entity';
import { CreateRoleDto } from './dtos/create-role.dto';
import { UpdateRoleDto } from './dtos/update-role.dto';
import { RolesPaginationQueryDto } from './dtos/roles-pagination-query.dto';
import { IRolesService } from './roles';

@Injectable()
export class RolesService implements IRolesService {
  constructor(
    @InjectRepository(Role)
    private readonly rolesRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto): Promise<Role> {
    // Check if role name already exists
    const existingRole = await this.rolesRepository.findOne({
      where: { name: createRoleDto.name } as any,
    });

    if (existingRole) {
      throw new ConflictException(
        `Role with name "${createRoleDto.name}" already exists`,
      );
    }

    const role = this.rolesRepository.create({
      ...createRoleDto,
      isActive: createRoleDto.isActive ?? true,
      isSystem: false,
    });

    return await this.rolesRepository.save(role);
  }

  async findAll(query: RolesPaginationQueryDto) {
    const page = parseInt(query.page || '1', 10);
    const limit = parseInt(query.limit || '10', 10);
    const skip = (page - 1) * limit;

    // Build MongoDB filter
    const filter: any = {};

    // Search filter
    if (query.search) {
      filter.$or = [
        { name: { $regex: query.search, $options: 'i' } },
        { description: { $regex: query.search, $options: 'i' } },
      ];
    }

    // Active filter
    if (query.isActive !== undefined) {
      filter.isActive = query.isActive;
    }

    // Get total count
    const total = await this.rolesRepository.count(filter);

    // Get paginated results
    const roles = await this.rolesRepository.find({
      where: filter,
      skip,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      data: roles,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string): Promise<Role> {
    const role = await this.rolesRepository.findOne({ where: { id } as any });

    if (!role) {
      throw new NotFoundException(`Role with ID "${id}" not found`);
    }

    return role;
  }

  async findByName(name: string): Promise<Role | null> {
    return await this.rolesRepository.findOne({ where: { name } as any });
  }

  async update(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const role = await this.findOne(id);

    // Prevent updating system roles
    if (role.isSystem) {
      throw new BadRequestException('Cannot update system roles');
    }

    // Check name uniqueness if name is being updated
    if (updateRoleDto.name && updateRoleDto.name !== role.name) {
      const existingRole = await this.rolesRepository.findOne({
        where: { name: updateRoleDto.name } as any,
      });

      if (existingRole) {
        throw new ConflictException(
          `Role with name "${updateRoleDto.name}" already exists`,
        );
      }
    }

    Object.assign(role, updateRoleDto);
    return await this.rolesRepository.save(role);
  }

  async remove(id: string): Promise<void> {
    const role = await this.findOne(id);

    // Prevent deleting system roles
    if (role.isSystem) {
      throw new BadRequestException('Cannot delete system roles');
    }

    // TODO: Check if role is assigned to any users
    // const usersWithRole = await this.usersRepository.count({ where: { roleId: id } });
    // if (usersWithRole > 0) {
    //   throw new BadRequestException(`Cannot delete role that is assigned to ${usersWithRole} user(s)`);
    // }

    await this.rolesRepository.remove(role);
  }

  async assignPermissions(id: string, permissions: any[]): Promise<Role> {
    const role = await this.findOne(id);

    if (role.isSystem) {
      throw new BadRequestException(
        'Cannot modify permissions of system roles',
      );
    }

    role.permissions = permissions;
    return await this.rolesRepository.save(role);
  }

  async getPermissions(id: string): Promise<any[]> {
    const role = await this.findOne(id);
    return role.permissions;
  }
}
