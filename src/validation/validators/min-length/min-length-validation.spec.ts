import { InvalidFieldError } from '@/validation/errors'
import { MinLengthValidation } from '@/validation/validators/min-length/min-length-validation'
import { faker } from '@faker-js/faker'

const makeSut = (field: string): MinLengthValidation => new MinLengthValidation(field, 5)

describe('MinLengthValidation', () => {
  test('Should return error if value is invalid', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.lorem.word(3) })

    expect(error).toEqual(new InvalidFieldError())
  })
  test('Should return falsy if value is valid', () => {
    const field = faker.lorem.word(5)
    const sut = makeSut(field)
    const error = sut.validate({ [field]: faker.lorem.word(5) })

    expect(error).toBeFalsy()
  })

  test('Should return falsy if field does not exists in schema', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [faker.database.column()]: faker.lorem.word(5) })

    expect(error).toBeFalsy()
  })

  test('Should return error if value is empty', () => {
    const field = faker.database.column()
    const sut = makeSut(field)
    const error = sut.validate({ [field]: '' })

    expect(error).toEqual(new InvalidFieldError())
  })
})
