import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Role } from './entities/role.entity';
import { Services } from 'src/common/utils/constants';

@Module({
  imports: [TypeOrmModule.forFeature([Role])],
  controllers: [RolesController],
  providers: [
    {
      provide: Services.ROLES,
      useClass: RolesService,
    },
  ],
  exports: [
    {
      provide: Services.ROLES,
      useClass: RolesService,
    },
  ],
})
export class RolesModule {}
