import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../User/User";

@ObjectType()
@Entity()
export class Music extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => String)
  @Column({ nullable: false })
  url: string;

  @Field(() => String)
  @Column({ nullable: false })
  filename: string;

  @Field(() => Int)
  @Column({ nullable: false })
  size: number;

  @Field(() => String)
  @CreateDateColumn({ type: "datetime", nullable: false })
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn({ type: "datetime", nullable: false })
  updatedAt: Date;

  //   Relations
  @ManyToOne(() => User, (user) => user.musics, {
    orphanedRowAction: "delete",
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
    eager: true,
  })
  user: User;
}
