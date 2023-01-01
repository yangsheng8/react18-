import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import Navigation from '@/views/home/cpns/navigation'
import { isMobileTerminal } from '@/utils/flexible'
import List from './cnps/list'
import TriggerMenu from '@/libs/trigger-menu'
import TriggerMenuItem from '@/libs/trigger-menu/trigger-menu-item'
interface IProps {
  children?: ReactNode
}

const Main: FC<IProps> = () => {
  return (
    <div className="h-main">
      <div className="h-full overflow-auto bg-white dark:bg-zinc-800 duration-500 scrollbar-thin scrollbar-thumb-transparent xl:scrollbar-thumb-zinc-200 xl:dark:scrollbar-thumb-zinc-900 scrollbar-track-transparent">
        {!isMobileTerminal && <Navigation />}
        <div className="max-w-screen-xl mx-auto relative m-1 xl:mt-4">
          <List></List>
        </div>
        {/*移动端下的 tabbar*/}
        {isMobileTerminal && (
          <div className="fixed bottom-6 m-auto left-0 right-0 w-[220px]">
            <TriggerMenu>
              <>
                <TriggerMenuItem
                  icon="home"
                  iconClass="fill-zinc-900 dark:fill-zinc-200"
                >
                  首页
                </TriggerMenuItem>
                <TriggerMenuItem
                  icon="vip"
                  iconClass="fill-zinc-400 dark:fill-zinc-500 fill-amber-300"
                  textClass="text-zinc-400 dark:text-zinc-500"
                >
                  VIP
                </TriggerMenuItem>
                <TriggerMenuItem
                  icon="profile"
                  iconClass="fill-zinc-400 dark:fill-zinc-500"
                  textClass="text-zinc-400 dark:text-zinc-500"
                >
                  我的
                </TriggerMenuItem>
              </>
            </TriggerMenu>
          </div>
        )}
      </div>
    </div>
  )
}

export default memo(Main)
