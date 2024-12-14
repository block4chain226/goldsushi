import {
  BeforeInsert,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { IsPhoneNumber } from 'class-validator';
import { Exclude } from 'class-transformer';
import { Order } from '../../orders/entities/orders.entity';
import { UserRoles } from '../enum/UserRoles';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  id: string;
  @Column({ type: 'varchar', length: 30 })
  name: string;
  @Column({ type: 'varchar', length: 30, unique: true })
  email: string;
  @Exclude()
  @Column({ type: 'varchar' })
  password: string;
  @Column({ type: 'varchar' })
  @IsPhoneNumber()
  phone: string;
  @Column({ type: 'enum', enum: UserRoles, default: UserRoles.User })
  role: UserRoles;
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
