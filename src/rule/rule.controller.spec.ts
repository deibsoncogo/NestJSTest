import { Test, TestingModule } from '@nestjs/testing'
import { Rule } from '@prisma/client'
import { RuleController } from './rule.controller'
import { CreateRuleDto } from './rule.dto'
import { RuleService } from './rule.service'

const RulesMock: Rule[] = [{
  id: 'id-mock',
  name: 'name-mock',
  createdAt: new Date('2023-01-06T10:16:22.635Z'),
  updatedAt: new Date('2023-01-06T10:19:55.635Z'),
}]

describe('RuleController', () => {
  let ruleController: RuleController
  let ruleService: RuleService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RuleController],
      providers: [{
        provide: RuleService,
        useValue: {
          createRule: jest.fn().mockResolvedValue(RulesMock[0]),
          findRules: jest.fn().mockResolvedValue(RulesMock),
          deleteRules: jest.fn(),
        },
      }],
    }).compile()

    ruleController = module.get<RuleController>(RuleController)
    ruleService = module.get<RuleService>(RuleService)
  })

  it('Should be defined rule controller and rule service', () => {
    expect(ruleController).toBeDefined()
    expect(ruleService).toBeDefined()
  })

  describe('createRule', () => {
    const body: CreateRuleDto = { name: 'name-mock' }

    it('Should be possible to create a rule', async () => {
      expect(await ruleController.createRule(body)).toEqual(RulesMock[0])
    })
  })

  describe('findRules', () => {
    it('Should be possible to list the rules', async () => {
      expect(await ruleController.findRules()).toEqual(RulesMock)
    })
  })

  describe('deleteRules', () => {
    it('Should be possible to delete the rules', async () => {
      expect(await ruleController.deleteRules()).toBeUndefined()
    })
  })
})
