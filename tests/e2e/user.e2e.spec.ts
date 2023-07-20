import { INestApplication } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'
import { UserModule } from '../../src/modules/user/user.module'

describe('User E2E', () => {
  let app: INestApplication

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [UserModule],
    }).compile()

    app = moduleFixture.createNestApplication()

    await app.init()
  })

  describe('/user (POST)', () => {
    it('Should be possible to create a user', async () => {
      const response = await request(app.getHttpServer()).post('/user').send({
        name: 'name-mock', email: 'mock@email.com', password: 'password-11-AA-mock',
      })

      expect(response.status).toEqual(201)
    })

    it('Should not be possible to create a user with already existing email', async () => {
      const response = await request(app.getHttpServer()).post('/user').send({
        name: 'name-mock', email: 'mock@email.com', password: 'password-11-AA-mock',
      })

      expect(response.status).toEqual(406)
    })
  })

  describe('/user (GET)', () => {
    it('Should be possible to list the users', async () => {
      const response = await request(app.getHttpServer()).get('/user')

      expect(response.status).toEqual(200)
    })
  })

  describe('/user (DELETE)', () => {
    it('Should be possible to delete the users', async () => {
      const response = await request(app.getHttpServer()).delete('/user')

      expect(response.status).toEqual(205)
    })
  })
})
