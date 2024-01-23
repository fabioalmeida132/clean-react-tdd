import { InvalidFieldError } from '@/validation/errors'
import { faker } from '@faker-js/faker'
import { CompareFieldsValidation } from '@/validation/validators/compare-fields/compare-fields-validation'

const makeSut = (valueToCompare: string): CompareFieldsValidation => new CompareFieldsValidation(faker.database.column(), valueToCompare)

describe('CompareFieldsValidation', () => {
  test('Should return error if compare is invalid', () => {
    const sut = makeSut(faker.database.column())
    const error = sut.validate('')
    expect(error).toEqual(new InvalidFieldError())
  })

  test('Should return falsy if compare is valid', () => {
    const valueToCompare = faker.database.column()
    const sut = makeSut(valueToCompare)
    const error = sut.validate(valueToCompare)
    expect(error).toBeFalsy()
  })
})
