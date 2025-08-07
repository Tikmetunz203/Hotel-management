import { ConflictException, Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from './entities/room.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomType } from './room-type.enum';

interface FindAllOptions {
  type?: RoomType;
  sortBy: string;
  order: 'ASC' | 'DESC';
  page: number;
  limit: number;
}

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>, // Assuming this is a repository for room entities
  ) {}

  // Method to create a new room
  async create(createRoomDto: CreateRoomDto): Promise<Room> {
    if (await this.isRoomNumberExists(createRoomDto.roomNumber)) {
      throw new ConflictException('Room number already exists');
    }
    // Create a new room entity and save it to the database
    const room = this.roomRepository.create(createRoomDto);
    return this.roomRepository.save(room);
  }

  async findAll(
    options: FindAllOptions,
  ): Promise<{ data: Room[]; total: number }> {
    const { type, sortBy, order, page, limit } = options;

    const where = type ? { type } : {};

    const [data, total] = await this.roomRepository.findAndCount({
      where,
      order: { [sortBy]: order },
      skip: (page - 1) * limit,
      take: limit,
    });

    return { data, total };
  }

  findOne(id: number) {
    return this.roomRepository.findOneBy({ id });
  }

  async update(id: number, updateRoomDto: UpdateRoomDto): Promise<Room | null> {
    if (
      updateRoomDto.roomNumber &&
      (await this.isRoomNumberExists(updateRoomDto.roomNumber, id))
    ) {
      throw new ConflictException('Room number already exists');
    }
    await this.roomRepository.update(id, updateRoomDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.roomRepository.delete(id);
  }

  async isRoomNumberExists(
    roomNumber: string,
    excludeId?: number,
  ): Promise<boolean> {
    const qb = this.roomRepository
      .createQueryBuilder('room')
      .where('room.roomNumber = :roomNumber', { roomNumber });

    if (excludeId) {
      qb.andWhere('room.id != :excludeId', { excludeId });
    }

    const room = await qb.getOne();
    return !!room;
  }
}
