import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsInt, IsOptional, IsString } from 'class-validator';

export class PaginationDto {
  @ApiProperty({
    example: 0,
    description: 'page number',
    required: false,
  })
  @IsInt()
  page: number = 20;

  @ApiProperty({
    example: 10,
    description: 'number of items per page',
    required: false,
  })
  @IsInt()
  perPage: number = 20;

  @ApiProperty({
    example: 'createdAt',
    description: 'Sort field',
    required: false,
  })
  @IsOptional()
  @IsString()
  sort: string;

  @ApiProperty({
    example: 'desc',
    description: 'Sort order',
    required: false,
  })
  @IsOptional()
  @IsString()
  @IsIn(['asc', 'desc'])
  order: 'asc' | 'desc' = 'asc';
}
