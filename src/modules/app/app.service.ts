import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  async index(): Promise<object> {
    const message = {
      status: 'Rota executada com sucesso',
      data: new Date(),
      rota: 'GET /',
    }

    return message
  }
}
