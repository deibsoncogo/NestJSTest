import { Injectable, NotAcceptableException } from '@nestjs/common'
import { User } from '@prisma/client'
import { DatabaseService } from '../../database/database.service'
import { CreateUserDto } from './user.dto'

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) { }

  async verifyDoubleUserByData(data: Partial<User>): Promise<void> {
    const user = await this.databaseService.user.findFirst({ where: data })

    if (user) {
      throw new NotAcceptableException({
        message: 'Já existe este valor cadastrado', data,
      })
    }
  }

  async createUser(data: CreateUserDto): Promise<User> {
    await this.verifyDoubleUserByData({ email: data.email })

    const user = await this.databaseService.user.create({ data })

    return user
  }

  async findUsers(): Promise<User[]> {
    const users = await this.databaseService.user.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return users
  }

  async deleteUsers(): Promise<void> {
    await this.databaseService.user.deleteMany()
  }
}
