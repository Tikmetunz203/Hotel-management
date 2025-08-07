/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';

export class CreateRoomDto {
  @IsString()
  @MaxLength(10)
  @ApiProperty({
    description: 'The unique room number',
    example: '101',
  })
  roomNumber: string;

  @IsString()
  @MaxLength(50)
  @ApiProperty({
    description: 'The type of the room (e.g., Single, Double, Suite)',
    example: 'Deluxe',
  })
  type: string;

  @IsNumber()
  @Min(0)
  @ApiProperty({
    description: 'The price of the room per night',
    example: 1500.0,
  })
  price: number;

  @ApiPropertyOptional({
    description: 'Indicates if the room is available',
    example: true,
  })
  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean; // Optional, defaults to true if not provided
}
