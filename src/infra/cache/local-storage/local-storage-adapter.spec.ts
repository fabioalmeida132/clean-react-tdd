import { faker } from '@faker-js/faker'
import 'jest-localstorage-mock'
import { LocalStorageAdapter } from '@/infra/cache/local-storage/local-storage-adapter'

describe('LocalStorageAdapter', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  test('Should call localStorage with correct values', async () => {
    const sut = new LocalStorageAdapter()
    const key = faker.database.column()
    const value = faker.word.words(1)
    await sut.set(key, value)
    expect(localStorage.setItem).toHaveBeenCalledWith(key, value)
  })
})
