import { Field, ObjectType } from "type-graphql";
import { CreateDateColumn, UpdateDateColumn } from "typeorm";

@ObjectType()
export class CreatedUpdatedColumns {
  @Field(() => String)
  @CreateDateColumn({ type: "datetime", nullable: false })
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn({ type: "datetime", nullable: false })
  updatedAt: Date;
}
