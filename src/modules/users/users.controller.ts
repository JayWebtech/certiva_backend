import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { SignupAdminDto } from '../auth/dto/admin-signup.dto';
import { CreateUniversityDTO } from '../university/dtos/create-university.dto';
import { RolesGuard } from '../../config/guard/roles.guard';
import { Roles } from '../../config/decorators/roles.decorator';
import { Role } from '../auth/entities/role.enum';
import { Request } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

interface CustomRequest extends Request {
  user: {
    universityId: string;
  };
}

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('admin')
  @UseGuards(RolesGuard)
  @Roles(Role.SUPER_ADMIN, Role.ADMIN)
  @ApiOperation({ summary: 'Create a new admin user' })
  @ApiResponse({ 
    status: 201, 
    description: 'Admin user created successfully',
    type: SignupAdminDto
  })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async createAdminUser(@Body() createAdminUserDto: SignupAdminDto) {
    return this.usersService.createAdminUser(createAdminUserDto);
  }

  @Post('university')
  @UseGuards(RolesGuard)
  @Roles(Role.UNIVERSITY_ADMIN)
  @ApiOperation({ summary: 'Create a new university user' })
  @ApiResponse({ 
    status: 201, 
    description: 'University user created successfully',
    type: CreateUniversityDTO
  })
  @ApiResponse({ status: 403, description: 'Forbidden - Insufficient permissions' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async createUniversityUser(
    @Body() createUniversityUserDto: CreateUniversityDTO,
    @Req() req: CustomRequest,
  ) {
    const universityId = req.user.universityId;
    return this.usersService.createUniversityUser(
      createUniversityUserDto,
      universityId,
    );
  }
}
