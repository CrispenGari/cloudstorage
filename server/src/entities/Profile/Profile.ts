import { Field, Float, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "../User/User";

@ObjectType()
@Entity()
export class Profile extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  avatar: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  banner: string;

  @Field(() => Float, { nullable: false })
  @Column({ nullable: false, default: 0 })
  bannerSize: number;

  @Field(() => Float, { nullable: false })
  @Column({ nullable: false, default: 0 })
  avatarSize: number;

  @Field(() => String, { nullable: false })
  @Column({ nullable: false })
  email: string;

  @Field(() => String, { nullable: false })
  @Column({ nullable: false })
  username: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  phoneNumber: string;

  @Field(() => Boolean)
  @Column({ nullable: false, default: false })
  admin: false | true;

  // relations
  @OneToOne(() => User, (user) => user.profile, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    orphanedRowAction: "delete",
  })
  user: User;

  @Field(() => String)
  @CreateDateColumn({ type: "datetime", nullable: false })
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn({ type: "datetime", nullable: false })
  updatedAt: Date;
}
