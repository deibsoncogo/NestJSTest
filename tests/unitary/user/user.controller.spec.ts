import { Test, TestingModule } from '@nestjs/testing'
import { User } from '@prisma/client'
import { UserController } from '../../../src/modules/user/user.controller'
import { CreateUserDto } from '../../../src/modules/user/user.dto'
import { UserService } from '../../../src/modules/user/user.service'

const UsersMock: User[] = [{
  id: 'id-mock',
  name: 'name-mock',
  email: 'mock@email.com',
  password: 'password-mock',
  createdAt: new Date('2023-01-06T10:16:22.635Z'),
  updatedAt: new Date('2023-01-06T10:19:55.635Z'),
}]

describe('UserController', () => {
  let userController: UserController
  let userService: UserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [{
        provide: UserService,
        useValue: {
          createUser: jest.fn().mockResolvedValue(UsersMock[0]),
          findUsers: jest.fn().mockResolvedValue(UsersMock),
          deleteUsers: jest.fn(),
        },
      }],
    }).compile()

    userController = module.get<UserController>(UserController)
    userService = module.get<UserService>(UserService)
  })

  it('Should be defined user controller and user service', () => {
    expect(userController).toBeDefined()
    expect(userService).toBeDefined()
  })

  describe('createUser', () => {
    const body: CreateUserDto = { name: 'name-mock', email: 'mock@email.com', password: 'password-mock' }

    it('Should be possible to create a user', async () => {
      expect(await userController.createUser(body)).toEqual(UsersMock[0])
    })
  })

  describe('findUsers', () => {
    it('Should be possible to list the users', async () => {
      expect(await userController.findUsers()).toEqual(UsersMock)
    })
  })

  describe('deleteUsers', () => {
    it('Should be possible to delete the users', async () => {
      expect(await userController.deleteUsers()).toBeUndefined()
    })
  })
})
