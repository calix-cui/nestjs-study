import { IsInt, IsBoolean, Length, Contains, Min, Max, IsEmail, IsFQDN } from "class-validator";

export class Test {
  @Length(5, 10
    , {
    message({ targetName, property, value, constraints }) {
      return `${targetName} 类的 ${property} 属性的值 ${value} 不满足约束: ${constraints}`
    }
  }
  )
  name: string;

  @IsInt()
  @Min(0)
  @Max(30)
  age: number;

  @IsBoolean()
  sex: boolean;

  @Contains('hello')
  text: string;

  @IsEmail()
  email: string;

  @IsFQDN()
  site: string;
  
  hobbies: Array<string>;
}