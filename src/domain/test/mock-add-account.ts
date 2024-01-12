import { AddAccountParams } from '@/domain/usecases'
import { faker } from '@faker-js/faker'

export const mockAddAccount = (): AddAccountParams => {
  const password = faker.internet.password()
  return {
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password,
    passwordConfirmation: password
  }
}
