import { Test, TestingModule } from '@nestjs/testing'
import { DatabaseModule } from './database.module'

describe('DatabaseModule', () => {
  let databaseModule: DatabaseModule

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
    }).compile()

    databaseModule = module.get<DatabaseModule>(DatabaseModule)
  })

  it('Should be defined database module', () => {
    expect(databaseModule).toBeDefined()
  })
})
