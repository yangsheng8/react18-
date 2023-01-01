import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import Popover from '@/libs/popover'
import SvgIcon from '@/libs/svg-icon'

interface IProps {
  children?: ReactNode
}

const Floating: FC<IProps> = () => {
  return (
    <div className="fixed bottom-10 right-2">
      <div className="group guide-start w-4 h-4 mb-1 bg-white dark:bg-zinc-900 border dark:border-0 border-zinc-200 rounded-full flex justify-center items-center cursor-pointer duration-200 hover:shadow-lg">
        <SvgIcon
          fillClass="w-2 h-2"
          name="guide"
          useClass="fill-zinc-900 dark:fill-zinc-200 group-hover:fill-main"
        ></SvgIcon>
      </div>
      <div className="group relative flex items-center guide-feedback">
        <Popover placement="PROP_TOP_LEFT">
          {/*插槽1*/}
          <div className="w-4 h-4 bg-white dark:bg-zinc-900 border dark:border-0 border-zinc-200 rounded-full flex justify-center items-center cursor-pointer duration-200  hover:shadow-lg">
            <SvgIcon
              fillClass="w-2 h-2"
              name="feedback"
              useClass="fill-zinc-900 dark:fill-zinc-200 group-hover:fill-main"
            ></SvgIcon>
          </div>
          {/*插槽2*/}
          <div className="w-[140px] overflow-hidden">
            <div className="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800">
              <SvgIcon
                fillClass="w-1.5 h-1.5 mr-1"
                name="feedback"
                useClass="fill-zinc-900 dark:fill-zinc-300"
              ></SvgIcon>
              <span className="text-zinc-800 dark:text-zinc-300 text-sm">
                立即吐槽
              </span>
            </div>
          </div>
        </Popover>
      </div>
    </div>
  )
}

export default memo(Floating)
