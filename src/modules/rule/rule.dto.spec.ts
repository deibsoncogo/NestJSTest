import { validate } from 'class-validator'
import { CreateRuleDto } from './rule.dto'

describe('RuleDto', () => {
  describe('createRule', () => {
    const createRuleDto = new CreateRuleDto()

    beforeEach(() => {
      createRuleDto.name = 'name-mock'
    })

    it('Should be possible to create a valid rule', async () => {
      const error = await validate(createRuleDto)
      expect(error.length).toBe(0)
    })

    it('Should not be possible to create a valid rule', async () => {
      const error = await validate(new CreateRuleDto())
      expect(error.length).toBe(1)
    })

    describe('name', () => {
      it('Should not be possible to create a rule with a name of less than 3 characters', async () => {
        createRuleDto.name = 'mo'

        expect(await validate(createRuleDto)).toEqual(expect.arrayContaining([
          expect.objectContaining({ property: 'name' }),
        ]))
      })

      it('Should not be possible to create a rule with a name of less than 50 characters', async () => {
        createRuleDto.name = '123456789123456789123456789123456789123456789123456789'

        expect(await validate(createRuleDto)).toEqual(expect.arrayContaining([
          expect.objectContaining({ property: 'name' }),
        ]))
      })
    })
  })
})
