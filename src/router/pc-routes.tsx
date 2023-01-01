import React, { lazy } from 'react'

const Layout = lazy(() => import('@/views/layout'))
export default [
  {
    path: '/',
    element: <Layout />
  }
]
