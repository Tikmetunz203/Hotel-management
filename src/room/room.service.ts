import { ConflictException, Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomType } from './room-type.enum';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>, // Assuming this is a repository for room entities
  ) {}

  // Method to create a new room
  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    const existingRoom = await this.roomRepository.findOneBy({
      roomNumber: createRoomDto.roomNumber,
    });
    if (existingRoom) {
      throw new ConflictException('Room number already number already exists');
    }
    const room = this.roomRepository.create(createRoomDto);
    return this.roomRepository.save(room);
  }

  findAll(): Promise<Room[]> {
    return this.roomRepository.find({ withDeleted: false }); // Fetch all rooms, including soft-deleted ones
  }

  async findByType(type: RoomType): Promise<Room[]> {
    return this.roomRepository.find({
      where: { type },
      withDeleted: false, // Exclude soft-deleted rooms
    });
  }

  findOne(id: number) {
    return this.roomRepository.findOneBy({ id });
  }

  async update(id: number, updateRoomDto: UpdateRoomDto): Promise<Room | null> {
    await this.roomRepository.update(id, updateRoomDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.roomRepository.softDelete(id);
  }
}
