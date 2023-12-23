import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(){
    var s = this.appService.getHello();
    return { 
      "success":true,
      "data":s,
      "message":"you got message"
    };
  }
}
