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

    // ✅ Determine status code correctly
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // ✅ Extract message safely
    let message: string;
    if (exception instanceof HttpException) {
      const responseData = exception.getResponse();
      message =
        typeof responseData === 'string'
          ? responseData
          : (responseData as any).message || JSON.stringify(responseData);
    } else {
      message = 'Internal server error';
    }

    // ✅ Log the error properly
    this.logger.error(
      `Error ${status} - ${message}`,
      exception.stack || exception.message,
    );

    // ✅ Return a well-structured JSON response
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      error: message,
    });
  }
}
