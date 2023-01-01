import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
  list: any[]
  menuhandleItemClick: (index) => void
}

const Menu: FC<IProps> = ({ list, menuhandleItemClick }) => {
  return (
    <div className="py-2 h-[80vh] flex flex-col">
      <h2 className="text-xl text-zinc-900 dark:text-zinc-200 font-bold mb-2 px-1">
        所有分类
      </h2>
      <ul className="overflow-y-scroll">
        {list.map((item, index) => {
          return (
            <li
              key={index}
              className="text-lg text-zinc-900 dark:text-zinc-300 px-1 py-1.5 duratio-100 active:bg-zinc-100 dark:active:bg-zinc-900"
              onClick={() => {
                menuhandleItemClick(index)
              }}
            >
              {item.name}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default memo(Menu)
