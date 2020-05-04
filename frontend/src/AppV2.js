import React from 'react'

import TemplateRouter from "./views/AdminRouter/TemplateRouter";

import './App.scss'

const AppPage = () => (
  <div className="app__page app__page--online">
    <TemplateRouter/>
  </div>
)

const AppContent = () => (
  <div className="app">
    <AppPage/>
  </div>
)

const App = () => (
  <div className="appContainer">
    <AppContent/>
  </div>
)

export default App