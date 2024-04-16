import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserRoles } from '../enum/UserRoles';
import { User } from './user.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ type: 'enum', enum: UserRoles, default: UserRoles.Guest })
  role: UserRoles;
  @OneToMany(() => User, (user) => user.role, { eager: true })
  users: User[];
}
