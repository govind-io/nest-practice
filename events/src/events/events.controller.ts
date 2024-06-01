import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  HttpCode,
  Query,
  ValidationPipe,
  NotFoundException,
} from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GetEventsDto } from './dto/get-event.dto';
import { Event } from './entity/event.entity';

@Controller('/events')
export class EventsController {
  constructor(
    @InjectRepository(Event) private readonly repository: Repository<Event>,
  ) {}

  @Get()
  async findAll(@Query() query: GetEventsDto) {
    return {
      data: await this.repository.find({
        take: query.limit || 2,
        skip: query.skip || 0,
      }),
    };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const event = await this.repository.findOneBy({ id });

    if (!event) {
      throw NotFoundException;
    }

    return { data: event };
  }

  @Post()
  async create(@Body(ValidationPipe) body: CreateEventDto) {
    const event = await this.repository.create({
      ...body,
      when: new Date(body.when),
    });

    return { data: event };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UpdateEventDto) {
    if (body.when) {
      body.when = new Date(body.when);
    }

    await this.repository.update({ id }, body);

    return { data: await this.repository.findOneBy({ id }) };
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id) {
    const deletedEvent = await this.repository.delete({ id });

    return { data: deletedEvent };
  }
}
