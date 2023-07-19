import { Body, Controller, Delete, Get, HttpCode, Post } from '@nestjs/common'
import { Rule } from '@prisma/client'
import { CreateRuleDto } from './rule.dto'
import { RuleService } from './rule.service'

@Controller('rule')
export class RuleController {
  constructor(private readonly ruleService: RuleService) { }

  @Post()
  @HttpCode(201)
  async createRule(@Body() data: CreateRuleDto): Promise<Rule> {
    const rule = await this.ruleService.createRule(data)

    return rule
  }

  @Get()
  @HttpCode(200)
  async findRules(): Promise<Rule[]> {
    const rules = await this.ruleService.findRules()

    return rules
  }

  @Delete()
  @HttpCode(205)
  async deleteRules(): Promise<void> {
    await this.ruleService.deleteRules()
  }
}
