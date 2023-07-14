import { Body, Controller, Delete, Get, HttpCode, Post } from '@nestjs/common'
import { User } from '@prisma/client'
import { CreateUserDto } from './user.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  @HttpCode(201)
  async createUser(@Body() data: CreateUserDto): Promise<User> {
    const user = await this.userService.createUser(data)

    return user
  }

  @Get()
  @HttpCode(200)
  async findUsers(): Promise<User[]> {
    const users = await this.userService.findUsers()

    return users
  }

  @Delete()
  @HttpCode(205)
  async deleteUsers(): Promise<void> {
    await this.userService.deleteUsers()
  }
}
