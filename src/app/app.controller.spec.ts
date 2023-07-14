import { Test, TestingModule } from '@nestjs/testing'
import { AppController } from './app.controller'
import { AppService } from './app.service'

const AppsMock: any[] = [{
  status: 'status-mock',
  data: 'data-mock',
  rota: 'rota-mock',
}]

describe('AppController', () => {
  let appController: AppController
  let appService: AppService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{
        provide: AppService,
        useValue: {
          index: jest.fn().mockResolvedValue(AppsMock[0]),
        },
      }],
    }).compile()

    appController = module.get<AppController>(AppController)
    appService = module.get<AppService>(AppService)
  })

  it('Should be defined app controller and app service', () => {
    expect(appController).toBeDefined()
    expect(appService).toBeDefined()
  })

  describe('index', () => {
    it('Should be possible to executed index a app', async () => {
      expect(await appController.index()).toEqual(AppsMock[0])
    })
  })
})
