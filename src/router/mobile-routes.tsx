import React, { lazy } from 'react'

const Home = lazy(() => import('@/views/home'))
const Register = lazy(() => import('@/views/register'))
const SignIn = lazy(() => import('@/views/sign-in'))

export default [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/sign-in',
    element: <SignIn />
  }
]
