import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import Popover from '@/libs/popover'
import SvgIcon from '@/libs/svg-icon'

interface IProps {
  children?: ReactNode
}

const HeaderMy: FC<IProps> = () => {
  return (
    <div className="flex items-center">
      <Popover placement="PROP_BOTTOM_LEFT">
        {/*插槽1*/}
        <div className="relative flex items-center p-0.5 rounded-sm cursor-pointer duration-200 outline-none hover:bg-zinc-100 dark:hover:bg-zinc-900">
          {/*头像*/}
          <img className="w-3 h-3 rounded-sm" src="./head.jpg" />
          {/*下拉箭头*/}
          <SvgIcon
            fillClass="h-1.5 w-1.5 ml-0.5"
            name="down-arrow"
            useClass="fill-zinc-900 dark:fill-zinc-300"
          />
          {/*vip*/}
          <SvgIcon
            fillClass="h-1.5 w-1.5 absolute right-[16px] bottom-0"
            name="vip"
            useClass="fill-amber-300"
          />
        </div>
        {/*插槽2*/}
        <div className="w-[140px] overflow-hidden">{getThemels()}</div>
      </Popover>
    </div>
  )
}
const menuArr = [
  {
    id: 0,
    tilte: '个人资料',
    icon: 'profile',
    path: '/profile'
  },
  {
    id: 1,
    tilte: '升级 VIP',
    icon: 'vip-profile',
    path: '/memeber'
  },
  {
    id: 2,
    tilte: '退出登录',
    icon: 'logout',
    path: ''
  }
]
//抽离jsx
const getThemels = (): ReactNode => {
  const ls = menuArr.map((item) => {
    return (
      <div
        key={item.id}
        className="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
      >
        <SvgIcon
          name={item.icon}
          fillClass="w-1.5 h-1.5 mr-1"
          useClass="fill-zinc-900 dark:fill-zinc-300"
        />
        <span className="text-zinc-900 text-sm dark:text-zinc-300">
          {item.tilte}
        </span>
      </div>
    )
  })
  return ls
}
export default memo(HeaderMy)
