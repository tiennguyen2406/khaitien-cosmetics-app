import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP_MONITOR');

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = context.switchToHttp().getRequest<Request>();
    const method = req.method;
    const url = req.url;

    const startTime = Date.now();

    return next.handle().pipe(
      tap(() => {
        const responseTime = Date.now() - startTime;
        const message = `${method} ${url} - ${responseTime}ms`;

        // if waste time > 500ms, log warning
        if (responseTime > 500) {
          this.logger.warn(`⚠️ [SLOW API] ${message}`);
        } else {
          this.logger.log(`${message}`);
        }
      }),
    );
  }
}
