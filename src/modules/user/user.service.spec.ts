import { Test, TestingModule } from '@nestjs/testing'
import { User } from '@prisma/client'
import { DatabaseService } from '../../database/database.service'
import { CreateUserDto } from './user.dto'
import { UserService } from './user.service'

const UsersMock: User[] = [{
  id: 'id-mock',
  name: 'name-mock',
  email: 'mock@email.com',
  password: 'password-mock',
  createdAt: new Date('2023-01-06T10:16:22.635Z'),
  updatedAt: new Date('2023-01-06T10:19:55.635Z'),
}]

describe('UserService', () => {
  let userService: UserService
  let databaseService: DatabaseService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService, {
        provide: DatabaseService,
        useValue: {
          user: {
            create: jest.fn().mockResolvedValue(UsersMock[0]),
            findFirst: jest.fn().mockResolvedValue(null),
            findMany: jest.fn().mockResolvedValue(UsersMock),
            deleteMany: jest.fn().mockResolvedValue(null),
          },
        },
      }],
    }).compile()

    userService = module.get<UserService>(UserService)
    databaseService = module.get<DatabaseService>(DatabaseService)
  })

  it('Should be defined user service and database service', () => {
    expect(userService).toBeDefined()
    expect(databaseService).toBeDefined()
  })

  describe('createUser', () => {
    const body: CreateUserDto = {
      name: 'name-mock', email: 'mock@email.com', password: 'password-mock',
    }

    it('Should be possible to create a user', async () => {
      expect(await userService.createUser(body)).toEqual(UsersMock[0])
    })

    it('Should not be possible to create a user with already existing email', async () => {
      jest.spyOn(databaseService.user, 'findFirst').mockResolvedValueOnce(UsersMock[0])
      expect(userService.createUser(body)).rejects.toThrowError()
    })
  })

  describe('findUsers', () => {
    it('Should be possible to list the users', async () => {
      expect(await userService.findUsers()).toEqual(UsersMock)
    })
  })

  describe('deleteUsers', () => {
    it('Should be possible to delete the users', async () => {
      expect(await userService.deleteUsers()).toBeUndefined()
    })
  })
})
