import { Arg, Query, Resolver } from "type-graphql";

@Resolver()
export class HelloWorldResolver {
  @Query(() => String)
  async helloWorld(): Promise<string> {
    return await "Hello, world!!";
  }

  @Query(() => [String])
  async lists(@Arg("input", () => [String]) lis: string[]): Promise<string[]> {
    return await lis;
  }
}
