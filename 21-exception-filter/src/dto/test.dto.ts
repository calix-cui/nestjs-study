import { IsInt, IsBoolean, Length, Contains, Min, Max, IsEmail, IsFQDN, IsNotEmpty, IsNumber } from "class-validator";

export class Test {
  @IsNotEmpty({message: 'a 不能为空'})
  @IsEmail({}, {message: 'a 不是邮箱格式'})
  a: string;

  @IsNotEmpty({message: 'b 不能为空'})
  @IsNumber({}, {message: 'b 不是数字'})
  b: number;
}