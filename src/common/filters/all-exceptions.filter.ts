import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger,
  } from '@nestjs/common';
  import { Response, Request } from 'express';
  
  @Catch()
  export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name); // ✅ Logger added
  
    catch(exception: any, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();
  
      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
  
      // Extract message correctly
      let message =
        exception instanceof HttpException
          ? exception.getResponse()
          : 'Internal server error';
  
      // Convert message to string if it's an object
      message = typeof message === 'string' ? message : (message as any).message || JSON.stringify(message);
  
      // ✅ Log the error
      this.logger.error(`Error ${status} - ${message}`, exception.stack);
  
      // ✅ Send formatted JSON response
      response.status(status).json({
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        error: message,
      });
    }
  }
  