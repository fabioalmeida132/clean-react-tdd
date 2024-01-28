import React from 'react'
import { makeLocalSaveAccessToken } from '@/main/factories/usecases/save-access-token/local-save-access-token-factory'
import Signup from '@/presentation/pages/signup/signup'
import { makeSignupValidation } from '@/main/factories/pages/signup/signup-validation-factory'
import { makeRemoteAddAccount } from '@/main/factories/usecases/add-account/remote-add-account-factory'

export const makeSignup: React.FC = () => {
  return (
    <Signup
      validation={makeSignupValidation()}
      saveAccessToken={makeLocalSaveAccessToken()}
      addAccount={makeRemoteAddAccount()}
    />
  )
}
