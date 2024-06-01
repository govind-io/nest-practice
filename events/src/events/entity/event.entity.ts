import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Attendee } from './attendee.entity';

@Entity({ name: 'Events' })
export class Event {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar', length: '100', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  where: string;

  @Column({ type: 'varchar', nullable: false, length: 1000 })
  description: string;

  @Column({ nullable: false })
  when: Date;

  @OneToMany(() => Attendee, (attendee) => attendee.event)
  attendees: Attendee[];
}
