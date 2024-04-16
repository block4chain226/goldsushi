import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { IsPhoneNumber } from 'class-validator';
import { Role } from './roles.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'varchar', length: 30 })
  name: string;
  @Column({ type: 'varchar', length: 30 })
  email: string;
  @Column({ type: 'varchar' })
  password: string;
  @Column({ type: 'varchar' })
  // @IsPhoneNumber()
  phone: string;
  @ManyToOne(() => Role, (role) => role.users, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'role_id' })
  role: Role;
  @Column({ type: 'boolean' })
  smsVerified: boolean;
  @Column({ type: 'boolean' })
  registered: boolean;
  @Column({ type: 'varchar', nullable: true })
  smsToken: string;
  @Column({ type: 'varchar', nullable: true })
  registrationToken: string;
  @Column({ type: 'varchar', nullable: true })
  accessToken: string;
  @Column({ type: 'varchar', nullable: true })
  refreshToken: string;

  constructor(entity: Partial<User>) {
    Object.assign(this, entity);
  }

  @BeforeInsert()
  setDefaultValues() {
    this.smsVerified = false;
    this.registered = false;
  }
}
