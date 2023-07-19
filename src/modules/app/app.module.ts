import { Module } from '@nestjs/common'
import { DatabaseModule } from '../../database/database.module'
import { RuleModule } from '../rule/rule.module'
import { UserModule } from '../user/user.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'

@Module({
  imports: [DatabaseModule, UserModule, RuleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
