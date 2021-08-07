import React, { FunctionComponent } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { SurveyList } from '../pages'

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
        <Route path="/surveylist" exact component={SurveyList} />
      </Switch>
    </BrowserRouter>
  )
}

export default Router
