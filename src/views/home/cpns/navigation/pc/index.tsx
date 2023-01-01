import React, { memo, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { useSelector, shallowEqual } from '@/store/hooks'
import classNames from 'classnames'
import SvgIcon from '@/libs/svg-icon'

interface IProps {
  children?: ReactNode
}

const PcNav: FC<IProps> = () => {
  const list = useSelector((state) => {
    return state.home.list
  }, shallowEqual)
  /*状态切换处理*/
  const [isOpenCategory, setIsOpenCategory] = useState(false)
  const triggerState = () => {
    setIsOpenCategory(!isOpenCategory)
  }
  /* 选中状态处理*/
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0)
  const onItemClick = (index) => {
    setCurrentCategoryIndex(index)
  }
  return (
    <div className="bg-white dark:bg-zinc-800 sticky top--0 left-0 w-full z-10">
      <ul
        className={classNames({
          'w-[800px] relative flex flex-wrap justify-center overflow-x-auto px-[10px] py-1 text-xs text-zinc-600 duration-300 overflow-hidden mx-auto':
            true,
          'h-[206px]': isOpenCategory,
          'h-[56px]': !isOpenCategory
        })}
      >
        {/*展示箭头*/}
        <div
          onClick={triggerState}
          className="absolute right-1 bottom-1 z-20 p-1 rounded cursor-pointer duration-200 hover:bg-zinc-200 dark:hover:bg-zinc-900"
        >
          <SvgIcon
            name={isOpenCategory ? 'fold' : 'unfold'}
            fillClass="w-1 h-1"
            useClass="fill-zinc-900 dark:fill-zinc-300"
          />
        </div>
        {/*item*/}
        {list.map((item, index) => {
          return (
            <li
              onClick={() => {
                onItemClick(index)
              }}
              key={index}
              className={classNames({
                'shrink-0 px-1.5 py-0 z-10 duration-200  text-zinc-900 dark:text-zinc-500 text-base font-bold h-4 leading-4 cursor-pointer hover:bg-zinc-200 dark:hover:text-zinc-300 rounded mr-1 mb-1 dark:hover:bg-zinc-900':
                  true,
                'text-zinc-900 bg-zinc-200 dark:text-zinc-300 dark:bg-zinc-900':
                  currentCategoryIndex === index
              })}
            >
              {item.name}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default memo(PcNav)
