import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import Navigation from './cpns/navigation'
import Main from '@/views/layout/cpns/main'
interface IProps {
  children?: ReactNode
}

const Home: FC<IProps> = () => {
  return (
    <div>
      <Navigation />
      <Main />
    </div>
  )
}

export default memo(Home)
