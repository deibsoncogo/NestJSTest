import { Injectable, NotAcceptableException } from '@nestjs/common'
import { Rule } from '@prisma/client'
import { DatabaseService } from '../database/database.service'
import { CreateRuleDto } from './rule.dto'

@Injectable()
export class RuleService {
  constructor(private readonly databaseService: DatabaseService) { }

  async verifyDoubleRuleByData(data: Partial<Rule>): Promise<void> {
    const rule = await this.databaseService.rule.findFirst({ where: data })

    if (rule) throw new NotAcceptableException({ message: 'Já existe este valor cadastrado', data })
  }

  async createRule(data: CreateRuleDto): Promise<Rule> {
    await this.verifyDoubleRuleByData({ name: data.name })

    const rule = await this.databaseService.rule.create({ data })

    return rule
  }

  async findRules(): Promise<Rule[]> {
    const rules = await this.databaseService.rule.findMany({ orderBy: { createdAt: 'desc' } })

    return rules
  }

  async deleteRules(): Promise<void> {
    await this.databaseService.rule.deleteMany()
  }
}
