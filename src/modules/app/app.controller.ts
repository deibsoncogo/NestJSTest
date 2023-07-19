import { Controller, Get, HttpCode } from '@nestjs/common'
import { AppService } from './app.service'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @HttpCode(200)
  async index(): Promise<object> {
    const response = await this.appService.index()

    return response
  }
}
