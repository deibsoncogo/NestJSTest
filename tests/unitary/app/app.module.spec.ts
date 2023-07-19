import { Test, TestingModule } from '@nestjs/testing'
import { AppModule } from '../../../src/modules/app/app.module'

describe('AppModule', () => {
  let appModule: AppModule

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile()

    appModule = module.get<AppModule>(AppModule)
  })

  it('Should be defined app module', () => {
    expect(appModule).toBeDefined()
  })
})
