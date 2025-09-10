import {
    Column,
    CreateDateColumn,
    Entity, JoinTable, ManyToMany, OneToMany,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
} from 'typeorm';
import {Permission} from "../../permissions/entities/permission.entity";
import {User} from "../../users/entities/user.entity";
import {LENGTH_NAME_ROLE, LENGTH_SLUG_ROLE} from "../roles-constant";

@Entity({name: 'roles'})
@Unique(['slug'])
export class Role {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({length: LENGTH_NAME_ROLE})
    name: string;

    @Column({length: LENGTH_SLUG_ROLE})
    slug: string;

    @ManyToMany(() => Permission, (permission) => permission.roles, {
        cascade: true,
    })
    @JoinTable({
        name: 'role_permissions',
        joinColumn: {name: 'role_id', referencedColumnName: 'id'},
        inverseJoinColumn: {name: 'permission_id', referencedColumnName: 'id'},
    })
    permissions: Permission[];
    @OneToMany(() => User, (user) => user.role)
    users: User[];
    @CreateDateColumn({default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @UpdateDateColumn({default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date;
}
