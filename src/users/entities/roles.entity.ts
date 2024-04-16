import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserRoles } from '../enum/UserRoles';
import { User } from './user.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn({ name: 'role_id' })
  id: number;
  @Column({ type: 'enum', enum: UserRoles })
  role: UserRoles;
  @OneToMany(() => User, (user) => user.role)
  users: User[];

  constructor(entity: Partial<Role>) {
    Object.assign(this, entity);
  }
}
