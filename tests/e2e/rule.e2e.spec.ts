import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'
import { RuleModule } from '../../src/modules/rule/rule.module'

describe('Rule E2E', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [RuleModule],
    }).compile()

    app = moduleFixture.createNestApplication()

    await app.init()
  })

  describe('/rule (POST)', () => {
    it('Should be possible to create a rule', async () => {
      const response = await request(app.getHttpServer()).post('/rule').send({
        name: 'name-mock',
      })

      expect(response.status).toEqual(201)
    })

    it('Should not be possible to create a rule with already existing name', async () => {
      const response = await request(app.getHttpServer()).post('/rule').send({
        name: 'name-mock',
      })

      expect(response.status).toEqual(406)
    })
  })

  describe('/rule (GET)', () => {
    it('Should be possible to list the rules', async () => {
      const response = await request(app.getHttpServer()).get('/rule')

      expect(response.status).toEqual(200)
    })
  })

  describe('/rule (DELETE)', () => {
    it('Should be possible to delete the rules', async () => {
      const response = await request(app.getHttpServer()).delete('/rule')

      expect(response.status).toEqual(205)
    })
  })
})
