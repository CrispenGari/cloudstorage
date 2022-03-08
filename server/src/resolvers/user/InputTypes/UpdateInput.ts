import { Field, InputType } from "type-graphql";

@InputType()
export class UpdateUserInput {
  @Field(() => String, { nullable: true })
  username: string;

  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => String, { nullable: true })
  theme: "dark" | "light";

  @Field(() => String, { nullable: true })
  password: string;
}

@InputType()
export class UpdateInput {
  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => String, { nullable: true })
  username: string;

  @Field(() => String, { nullable: true })
  phoneNumber: string;

  @Field(() => Boolean, { nullable: true })
  verified: boolean;
}
