import React, { FunctionComponent } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

type Factory = {
  makeLogin: FunctionComponent
  makeSignUp: FunctionComponent
}

const Router: FunctionComponent<Factory> = (factory: Factory) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" exact component={factory.makeLogin} />
        <Route path="/signup" exact component={factory.makeSignUp} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
