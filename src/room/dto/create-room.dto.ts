import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { RoomType } from '../room-type.enum';

export class CreateRoomDto {
  @IsString()
  @MaxLength(10)
  @ApiProperty({
    description: 'The unique room number',
    example: '101',
  })
  roomNumber: string;

  @IsEnum(RoomType)
  @ApiProperty({
    enum: RoomType,
    description: 'ประเภทห้อง ต้องเลือกจาก Enum เท่านั้น',
    example: RoomType.DELUXE,
  })
  type: RoomType;

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
