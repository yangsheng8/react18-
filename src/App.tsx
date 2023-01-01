import React, { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from './router'

const App = () => {
  return (
    <div className="app">
      <Suspense fallback="">
        <div className="main"> {useRoutes(routes)} </div>
      </Suspense>
    </div>
  )
}

export default App
