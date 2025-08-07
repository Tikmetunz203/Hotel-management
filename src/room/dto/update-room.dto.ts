import { PartialType } from '@nestjs/mapped-types';
import { CreateRoomDto } from './create-room.dto';

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
export class UpdateRoomDto extends PartialType(CreateRoomDto) {}
