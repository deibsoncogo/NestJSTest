import { Test, TestingModule } from '@nestjs/testing'
import { RuleModule } from '../../../src/modules/rule/rule.module'

describe('RuleModule', () => {
  let ruleModule: RuleModule

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [RuleModule],
    }).compile()

    ruleModule = module.get<RuleModule>(RuleModule)
  })

  it('Should be defined rule module', () => {
    expect(ruleModule).toBeDefined()
  })
})
