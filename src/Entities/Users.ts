import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";

@Entity()
export class Users extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    username!: string;
   
    @Column()
    password!: string;

    @OneToMany(type => Attendance, attendance => attendance.owner)
    attendance!: Attendance[]
}

@Entity()
export class Attendance extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;
   
    @Column()
    accept!: boolean;

    @Column()
    attending!: number;
    
    @Column()
    ownerId!: number;
    @ManyToOne(type => Users, user => user.attendance)
    owner!: Users;
}