import { Length } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Event } from './event.entity';

@Entity({ name: 'Attendees' })
export class Attendee {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => Event, (evt) => evt.attendees, {
    nullable: false,
  })
  @JoinColumn({ referencedColumnName: 'id' })
  event: Event;
}
