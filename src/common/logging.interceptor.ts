import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { tap } from 'rxjs/operators';
  
  @Injectable()
  export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const request = context.switchToHttp().getRequest();
      const { method, url, body } = request;
      const startTime = Date.now();
  
      console.log(`📥 [Request] ${method} ${url}`, body);
  
      return next.handle().pipe(
        tap((response) => {
          const endTime = Date.now();
          console.log(
            `📤 [Response] ${method} ${url} - ${endTime - startTime}ms`,
            response,
          );
        }),
      );
    }
  }
  