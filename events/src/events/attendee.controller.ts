import { Controller, Get } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Attendee } from './entity/attendee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entity/event.entity';

@Controller('attendee')
export default class AttendeeController {
  constructor(
    @InjectRepository(Attendee)
    private readonly AttendeeRepository: Repository<Attendee>,
    @InjectRepository(Event)
    private readonly EventRepository: Repository<Event>,
  ) {}

  @Get()
  async getAllEvents() {}
}
