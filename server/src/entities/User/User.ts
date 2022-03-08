import { ObjectType, Field, Float } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Document } from "../Document/Document";
import { Miscellaneous } from "../Miscellaneous/Miscellaneous";
import { Music } from "../Music/Music";
import { Picture } from "../Pictures/Picture";
import { Profile } from "../Profile/Profile";
import { Trash } from "../Trash/Trash";
import { Video } from "../Video/Video";

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => String)
  @PrimaryGeneratedColumn("uuid")
  uid: string;

  @Field(() => String)
  @Column({ type: "varchar", unique: true, length: 25 })
  username: string;

  @Field(() => String)
  @Column({ type: "varchar", unique: true, length: 25 })
  email: string;

  @Field(() => String)
  @Column({ type: "varchar", length: 15, default: "light" })
  theme: "dark" | "light" | "adaptive";

  @Column({ type: "text" })
  password: string;

  @Field(() => Boolean)
  @Column({ nullable: false, default: false })
  isLoggedIn: false | true;

  @Field(() => Boolean)
  @Column({ nullable: false, default: false })
  confirmed: false | true;

  @Field(() => Float)
  @Column({ nullable: false, default: 5368709120, type: "bigint" }) // 5gb
  maxStorageSize: number;

  @Field(() => Float)
  @Column({ nullable: false, default: 0, type: "bigint" })
  usedStorage: number;

  @Field(() => String)
  @CreateDateColumn({ type: "datetime", nullable: false })
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn({ type: "datetime", nullable: false })
  updatedAt: Date;

  // RELATIONS
  @Field(() => Profile, { nullable: true })
  @OneToOne(() => Profile, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
    eager: true,
  })
  @JoinColumn()
  profile: Profile;

  @Field(() => [Music], { nullable: true })
  @OneToMany(() => Music, (music) => music.user, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  musics: [Music];

  @Field(() => [Miscellaneous], { nullable: true })
  @OneToMany(() => Miscellaneous, (m) => m.user, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  miscellaneous: [Miscellaneous];

  @Field(() => [Video], { nullable: true })
  @OneToMany(() => Video, (vid) => vid.user, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  videos: [Video];

  @Field(() => [Picture], { nullable: true })
  @OneToMany(() => Picture, (picture) => picture.user, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  pictures: [Picture];

  @Field(() => [Document], { nullable: true })
  @OneToMany(() => Document, (doc) => doc.user, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  documents: [Document];

  @Field(() => [Trash], { nullable: true })
  @OneToMany(() => Trash, (doc) => doc.user, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  trash: [Trash];
}
