import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger } from "@nestjs/common";
import { Request, Response } from "express";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

//Logger
  constructor(private readonly logger: Logger) {
  }


  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();


    if (status === 500) {

      this.logger.error(exception.message, exception.stack);
    }
    response
      .status(status)
      .json({
        // statusCode: status,
        // timestamp: new Date().toISOString(),
        // path: request.url,
        success: false,
        message: exception.message,
        data: null
      });
  }
}
