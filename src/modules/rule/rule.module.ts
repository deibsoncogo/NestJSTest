import { Module } from '@nestjs/common'
import { DatabaseModule } from '../../database/database.module'
import { RuleController } from './rule.controller'
import { RuleService } from './rule.service'

@Module({
  imports: [DatabaseModule],
  controllers: [RuleController],
  providers: [RuleService],
})
export class RuleModule { }
