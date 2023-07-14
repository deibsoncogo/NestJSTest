import { Test, TestingModule } from '@nestjs/testing'
import { AppService } from './app.service'

describe('AppService', () => {
  let appService: AppService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile()

    appService = module.get<AppService>(AppService)
  })

  it('Should be defined app service', () => {
    expect(appService).toBeDefined()
  })

  describe('index', () => {
    it('Should be possible to executed index a app', async () => {
      expect(await appService.index()).toHaveProperty('status')
    })
  })
})
