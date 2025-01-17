import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class PasswordReset extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({unique:true})
  resetCode: string;

  @Column("timestamp")
  expiresAt: Date;
}
