import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import HeaderSearch from './cpns/header-search'
import HeaderMy from './cpns/header-my'
import HeaderTheme from './cpns/header-theme'

interface IProps {
  children?: ReactNode
}

const Header: FC<IProps> = () => {
  //页面跳转
  const navigate = useNavigate()
  function handleToHome() {
    navigate('/')
  }
  return (
    <div className="h-header">
      <div className="w-full bg-white dark:bg-zinc-800 border-b border-b-zinc-20 dark:border-b-zinc-700 px-2 py-1 duration-500">
        <div className="flex items-center">
          <img
            className="h-4 cursor-pointer mr-2"
            src="./logo192.png"
            alt=""
            onClick={handleToHome}
          />
          <HeaderSearch />
          <HeaderTheme />
          <HeaderMy />
        </div>
      </div>
    </div>
  )
}

export default memo(Header)
