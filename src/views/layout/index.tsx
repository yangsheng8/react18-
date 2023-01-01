import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import Header from './cpns/header'
import Main from './cpns/main'
import Floating from './cpns/floating'

interface IProps {
  children?: ReactNode
}

const Layout: FC<IProps> = () => {
  return (
    <div className="h-screen">
      <Header />
      <Main />
      <Floating />
    </div>
  )
}

export default memo(Layout)
