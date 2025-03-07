import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UUID } from 'crypto';
import { CheckAbilities } from '../ability/ability.decorator';
import { AbilitiesGuard, SkipAbilitiesGuard } from '../ability/ability.guard';
import { CU, CurrentUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { CUI } from '../auth/interfaces/current-user.interface';
import { ACTIONS, APP, SUBJECTS } from '../constants';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UserService } from './user.service';

@Controller('users')
@ApiTags('Users')
@ApiBearerAuth(APP.JWT_BEARER)
@UseGuards(JwtGuard, AbilitiesGuard)
export class UserController {
  constructor(private userService: UserService) {}

  @CheckAbilities({ action: ACTIONS.READ, subject: SUBJECTS.USER })
  @Get('')
  list() {
    return this.userService.list();
  }

  @Post('')
  @CheckAbilities({ action: ACTIONS.CREATE, subject: SUBJECTS.USER })
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Get('me')
  @SkipAbilitiesGuard()
  async getMe(@CurrentUser() cu: CUI) {
    const user = await this.userService.getById(cu.id);
    return { ...user, permissions: cu.permissions, roles: cu.roles };
  }

  @Patch('me')
  @SkipAbilitiesGuard()
  updateMe(@CU() cu: CUI, @Body() dto: UpdateUserDto) {
    return this.userService.updateById(cu.userId, dto);
  }

  @Get(':uuid')
  @CheckAbilities({ action: ACTIONS.READ, subject: SUBJECTS.USER })
  get(@Param('uuid') uuid: UUID) {
    return this.userService.get(uuid);
  }

  @Patch(':uuid')
  @CheckAbilities({ action: ACTIONS.UPDATE, subject: SUBJECTS.USER })
  update(@Param('uuid') uuid: UUID, @Body() dto: UpdateUserDto) {
    return this.userService.update(uuid, dto);
  }

  @Delete(':uuid')
  @CheckAbilities({ action: ACTIONS.DELETE, subject: SUBJECTS.USER })
  delete(@Param('uuid') uuid: UUID) {
    return this.userService.delete(uuid);
  }

  @Get(':uuid/roles')
  @CheckAbilities({ action: ACTIONS.READ, subject: SUBJECTS.USER })
  getRoles(@Param('uuid') uuid: UUID) {
    return this.userService.get(uuid);
  }

  @Post(':uuid/roles')
  @CheckAbilities({ action: ACTIONS.UPDATE, subject: SUBJECTS.USER })
  addRoles(@Param('uuid') uuid: UUID, @Body() dto: UpdateUserDto) {
    return this.userService.update(uuid, dto);
  }

  @Delete(':uuid/roles')
  @CheckAbilities({ action: ACTIONS.UPDATE, subject: SUBJECTS.USER })
  removeRoles(@Param('uuid') uuid: UUID, @Body() dto: UpdateUserDto) {
    return this.userService.update(uuid, dto);
  }
}
