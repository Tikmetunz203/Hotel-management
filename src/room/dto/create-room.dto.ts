/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export class CreateRoomDto {
  @IsString()
  @MaxLength(10)
  roomNumber: string;

  @IsString()
  @MaxLength(50)
  type: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsBoolean()
  @IsOptional()
  isAvailable?: boolean; // Optional, defaults to true if not provided
}
