import {
  BeforeInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { IsPhoneNumber } from 'class-validator';
import { Role } from './roles.entity';
import { Exclude } from 'class-transformer';
import { Order } from '../../orders/entities/orders.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  id: string;
  @Column({ type: 'varchar', length: 30 })
  name: string;
  @Column({ type: 'varchar', length: 30 })
  email: string;
  @Exclude()
  @Column({ type: 'varchar' })
  password: string;
  @Column({ type: 'varchar' })
  // @IsPhoneNumber()
  phone: string;
  @ManyToOne(() => Role, (role) => role.users, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'role_id' })
  role: Role;
  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
  @Exclude()
  @Column({ type: 'boolean' })
  smsVerified: boolean;
  @Exclude()
  @Column({ type: 'boolean' })
  registered: boolean;
  @Exclude()
  @Column({ type: 'varchar', nullable: true })
  smsToken: string;
  @Exclude()
  @Column({ type: 'varchar', nullable: true, name: 'registration_token' })
  registrationToken: string;
  @Exclude()
  @Column({ type: 'varchar', nullable: true })
  accessToken: string;
  @Exclude()
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
