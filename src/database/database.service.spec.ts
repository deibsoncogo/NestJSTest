import { Test, TestingModule } from '@nestjs/testing'
import { DatabaseService } from './database.service'

describe('DatabaseService', () => {
  let databaseService: DatabaseService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{
        provide: DatabaseService,
        useValue: {
          onModuleInit: jest.fn().mockResolvedValue(true),
          onModuleDestroy: jest.fn().mockResolvedValue(true),
          enableShutdownHooks: jest.fn().mockResolvedValue(true),
        },
      }],
    }).compile()

    databaseService = module.get<DatabaseService>(DatabaseService)
  })

  it('Should be defined database service', () => {
    expect(databaseService).toBeDefined()
  })
})
