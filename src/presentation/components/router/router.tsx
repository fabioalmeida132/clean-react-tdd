import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import '@/presentation/styles/global.scss'
import { Signup } from '@/presentation/pages'

type Props = {
  makeLogin: React.FC
}
const Router: React.FC<Props> = ({ makeLogin }: Props) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={makeLogin}/>
        <Route path="/signup" component={Signup}/>
      </Switch>
    </BrowserRouter>
  )
}

export default Router
