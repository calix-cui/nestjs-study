import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';

@Catch()
export class CheckLoginFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {}
}