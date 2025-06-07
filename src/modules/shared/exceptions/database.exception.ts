import { HttpException, HttpStatus } from '@nestjs/common';

export class DatabaseException extends HttpException {
  constructor(
    message: string,
    error?: any,
    context?: string,
  ) {
    super(
      {
        message,
        context,
        timestamp: new Date().toISOString(),
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
    
    if (error) {
      this.stack = error.stack;
    }
  }
}