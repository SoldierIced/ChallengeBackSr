import {
    Column,
    CreateDateColumn,
    Entity, ManyToOne,
    PrimaryGeneratedColumn,
    Unique,
    UpdateDateColumn,
} from 'typeorm';
import {Role} from "../../roles/entities/role.entity";

@Entity({name: 'users'})
@Unique(['email'])
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({length: 120})
    name: string;

    @Column({length: 160})
    email: string;

    @Column({select: false})
    password: string;

    @Column('decimal', {precision: 10, scale: 2, default: 0})
    salary: number;

    @ManyToOne(() => Role, (role) => role.users, {eager: true})
    role: Role;

    @CreateDateColumn({default: () => 'CURRENT_TIMESTAMP'})
    createdAt: Date;

    @UpdateDateColumn({default: () => 'CURRENT_TIMESTAMP'})
    updatedAt: Date;
}
