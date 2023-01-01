import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { isMobileTerminal } from '@/utils/flexible'
import robots from '@/mockdata/robots.json'
import Waterfall from '@/libs/waterfall'
interface IProps {
  children?: ReactNode
}

const List: FC<IProps> = () => {
  return (
    <div>
      <Waterfall
        data={robots.data.list}
        column={isMobileTerminal ? 2 : 5}
      ></Waterfall>
    </div>
  )
}

export default memo(List)
