import { validate } from 'class-validator'
import { CreateUserDto } from '../../../src/modules/user/user.dto'

describe('UserDto', () => {
  describe('createUser', () => {
    const createUserDto = new CreateUserDto()

    beforeEach(() => {
      createUserDto.name = 'name-mock'
      createUserDto.email = 'mock@email.com'
      createUserDto.password = 'password-11-AA-mock'
    })

    it('Should be possible to create a valid user', async () => {
      const error = await validate(createUserDto)
      expect(error.length).toBe(0)
    })

    it('Should not be possible to create a valid user', async () => {
      const error = await validate(new CreateUserDto())
      expect(error.length).toBe(3)
    })

    describe('name', () => {
      it('Should not be possible to create a user with a name of less than 3 characters', async () => {
        createUserDto.name = 'mo'

        expect(await validate(createUserDto)).toEqual(expect.arrayContaining([
          expect.objectContaining({ property: 'name' }),
        ]))
      })

      it('Should not be possible to create a user with a name of less than 250 characters', async () => {
        createUserDto.name = '01234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789'

        expect(await validate(createUserDto)).toEqual(expect.arrayContaining([
          expect.objectContaining({ property: 'name' }),
        ]))
      })
    })

    describe('email', () => {
      it('Should not be possible to create a user with an invalid email', async () => {
        createUserDto.email = 'mock@email'

        expect(await validate(createUserDto)).toEqual(expect.arrayContaining([
          expect.objectContaining({ property: 'email' }),
        ]))
      })
    })

    describe('password', () => {
      it('Should not be possible to create a user with a password of less than 6 characters', async () => {
        createUserDto.password = 'pass'

        expect(await validate(createUserDto)).toEqual(expect.arrayContaining([
          expect.objectContaining({ property: 'password' }),
        ]))
      })

      it('Should not be possible to create a user with a password without 2 numbers', async () => {
        createUserDto.password = 'password-AA-mock'

        expect(await validate(createUserDto)).toEqual(expect.arrayContaining([
          expect.objectContaining({ property: 'password' }),
        ]))
      })

      it('Should not be possible to create a user with a password without 2 lowercase letters', async () => {
        createUserDto.password = '11-AA'

        expect(await validate(createUserDto)).toEqual(expect.arrayContaining([
          expect.objectContaining({ property: 'password' }),
        ]))
      })

      it('Should not be possible to create a user with a password without 2 uppercase letters', async () => {
        createUserDto.password = 'password-11-mock'

        expect(await validate(createUserDto)).toEqual(expect.arrayContaining([
          expect.objectContaining({ property: 'password' }),
        ]))
      })
    })
  })
})
