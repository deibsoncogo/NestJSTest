import { Test, TestingModule } from '@nestjs/testing'
import { Rule } from '@prisma/client'
import { DatabaseService } from '../../database/database.service'
import { CreateRuleDto } from './rule.dto'
import { RuleService } from './rule.service'

const RulesMock: Rule[] = [{
  id: 'id-mock',
  name: 'name-mock',
  createdAt: new Date('2023-01-06T10:16:22.635Z'),
  updatedAt: new Date('2023-01-06T10:19:55.635Z'),
}]

describe('RuleService', () => {
  let ruleService: RuleService
  let databaseService: DatabaseService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RuleService, {
        provide: DatabaseService,
        useValue: {
          rule: {
            create: jest.fn().mockResolvedValue(RulesMock[0]),
            findFirst: jest.fn().mockResolvedValue(null),
            findMany: jest.fn().mockResolvedValue(RulesMock),
            deleteMany: jest.fn().mockResolvedValue(null),
          },
        },
      }],
    }).compile()

    ruleService = module.get<RuleService>(RuleService)
    databaseService = module.get<DatabaseService>(DatabaseService)
  })

  it('Should be defined rule service and database service', () => {
    expect(ruleService).toBeDefined()
    expect(databaseService).toBeDefined()
  })

  describe('createRule', () => {
    const body: CreateRuleDto = { name: 'name-mock' }

    it('Should be possible to create a rule', async () => {
      expect(await ruleService.createRule(body)).toEqual(RulesMock[0])
    })

    it('Should not be possible to create a rule with already existing name', async () => {
      jest.spyOn(databaseService.rule, 'findFirst').mockResolvedValueOnce(RulesMock[0])
      expect(ruleService.verifyDoubleRuleByData(body)).rejects.toThrowError()
    })
  })

  describe('findRules', () => {
    it('Should be possible to list the rules', async () => {
      expect(await ruleService.findRules()).toEqual(RulesMock)
    })
  })

  describe('deleteRules', () => {
    it('Should be possible to delete the rules', async () => {
      expect(await ruleService.deleteRules()).toBeUndefined()
    })
  })
})
