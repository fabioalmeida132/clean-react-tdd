import { EmailValidation } from '@/validation/validators/email/email-validation'
import { InvalidFieldError } from '@/validation/errors'
import { faker } from '@faker-js/faker'

describe('EmailValidation', () => {
  test('Should return error if email is invalid', () => {
    const sut = new EmailValidation(faker.database.column())
    const error = sut.validate(faker.lorem.word())
    expect(error).toEqual(new InvalidFieldError())
  })
  test('Should return falsy if email is valid', () => {
    const sut = new EmailValidation(faker.database.column())
    const error = sut.validate(faker.internet.email())
    expect(error).toBeFalsy()
  })
})
