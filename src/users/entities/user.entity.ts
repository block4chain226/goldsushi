import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsPhoneNumber } from 'class-validator';

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
