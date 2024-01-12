import { AccountModel } from '@/domain/models/account-model'

export type AddAccountParams = {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

export interface Authentication {
  auth (params: AddAccountParams): Promise<AccountModel>
}
