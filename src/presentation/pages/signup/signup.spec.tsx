import { cleanup, fireEvent, render, RenderResult } from '@testing-library/react'
import { Signup } from '@/presentation/pages'
import React from 'react'
import { Helper, ValidationStub } from '@/presentation/test'
import { faker } from '@faker-js/faker'

type SutTypes = {
  sut: RenderResult
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub()
  validationStub.errorMessage = params?.validationError
  const sut = render(
    <Signup
      validation={validationStub}
    />
  )
  return {
    sut
  }
}

const populateField = (sut: RenderResult, fieldName: string, value = faker.lorem.word()): void => {
  const el = sut.getByTestId(fieldName)
  fireEvent.input(el, { target: { value } })
}

describe('Signup component', () => {
  afterEach(cleanup)

  test('Should start with initial state', () => {
    const validationError = faker.lorem.words()
    const { sut } = makeSut({ validationError })

    Helper.testChildCount(sut, 'error-wrap', 0)
    Helper.testButtonIsDisabled(sut, 'submit', true)
    Helper.testStatusForField(sut, 'name', validationError)
    Helper.testStatusForField(sut, 'email', 'Campo obrigatório')
    Helper.testStatusForField(sut, 'password', 'Campo obrigatório')
    Helper.testStatusForField(sut, 'passwordConfirmation', 'Campo obrigatório')
  })

  test('Should show name error if Validation fails', () => {
    const validationError = faker.lorem.words()
    const { sut } = makeSut({ validationError })

    populateField(sut, 'name')

    Helper.testStatusForField(sut, 'name', validationError)
  })
})
