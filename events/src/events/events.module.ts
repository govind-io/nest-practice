import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entity/event.entity';
import { EventsController } from './events.controller';
import { Attendee } from './entity/attendee.entity';
import AttendeeController from './attendee.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Attendee])],
  controllers: [EventsController, AttendeeController],
})
export class EventsModule {}
