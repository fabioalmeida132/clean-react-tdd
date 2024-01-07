import { faker } from '@faker-js/faker'
import { LocalSaveAccessToken } from '@/data/usecases/save-access-token/local-save-access-token'
import { SetStorageMock } from '@/data/test/mock-storage'

const makeSut = (): SutTypes => {
  const setStorageSpy = new SetStorageMock()
  const sut = new LocalSaveAccessToken(setStorageSpy)
  return {
    sut,
    setStorageSpy
  }
}

type SutTypes = {
  sut: LocalSaveAccessToken
  setStorageSpy: SetStorageMock
}

describe('LocalSaveAccessToken', () => {
  test('Should call SetStorage with correct value', async () => {
    const { sut, setStorageSpy } = makeSut()
    const accessToken = faker.string.uuid()
    await sut.save(accessToken)
    expect(setStorageSpy.key).toBe('accessToken')
    expect(setStorageSpy.value).toBe(accessToken)
  })
})
