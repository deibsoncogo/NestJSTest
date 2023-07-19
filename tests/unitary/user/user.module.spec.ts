import { Test, TestingModule } from '@nestjs/testing'
import { UserModule } from '../../../src/modules/user/user.module'

describe('UserModule', () => {
  let userModule: UserModule

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    }).compile()

    userModule = module.get<UserModule>(UserModule)
  })

  it('Should be defined user module', () => {
    expect(userModule).toBeDefined()
  })
})
