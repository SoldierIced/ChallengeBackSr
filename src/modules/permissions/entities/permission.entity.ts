import {
    Column,
    CreateDateColumn,
    Entity, ManyToMany,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
} from 'typeorm';
import {Role} from "../../roles/entities/role.entity";
import {LENGTH_NAME_PERMISSION, LENGTH_SLUG_PERMISSION} from "../permissions-constant";

@Entity({name: 'permissions'})
@Unique(['slug'])
export class Permission {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({length: LENGTH_NAME_PERMISSION})
    name: string;

    @Column({length: LENGTH_SLUG_PERMISSION})
    slug: string;

    @Column("text", { array: true, nullable: true })
    fields_show: string[];

    @ManyToMany(() => Role, (role) => role.permissions)
    roles: Role[];

    @CreateDateColumn({default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @UpdateDateColumn({default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date;
}
