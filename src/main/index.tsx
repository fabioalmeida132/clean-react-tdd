import React from 'react'
import { createRoot } from 'react-dom/client'
import Router from '@/presentation/components/router/router'
import { makeLogin } from '@/main/factories/pages/login/login-factory'
import { makeSignup } from '@/main/factories/pages/signup/signup-factory'

createRoot(document.getElementById('main')).render(
  <Router
    makeLogin={makeLogin}
    makeSignup={makeSignup}
  />
)
