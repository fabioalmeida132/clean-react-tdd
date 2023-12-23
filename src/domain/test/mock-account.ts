import { AuthenticationParams } from '@/domain/usecases'
import { faker } from '@faker-js/faker'
import { AccountModel } from '@/domain/models/account-model'

export const mockAccount = (): AuthenticationParams => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})

export const mockAccountModel = (): AccountModel => ({
  accessToken: faker.string.uuid()
})
