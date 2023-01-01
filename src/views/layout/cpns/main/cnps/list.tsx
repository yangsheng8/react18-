import React, { memo } from 'react'
import { useSelector, shallowEqual } from '@/store/hooks'
import type { FC, ReactNode } from 'react'
import { isMobileTerminal } from '@/utils/flexible'
import Item from './item'
interface IProps {
  children?: ReactNode
}

const List: FC<IProps> = () => {
  const list = useSelector((state) => {
    return state.home.list
  }, shallowEqual)
  const itemArr = list[1].robots

  return (
    <div className="flex">
      {itemArr.map((item, index) => {
        return (
          <div key={index}>
            <Item id={item} />
          </div>
        )
      })}
    </div>
  )
}

export default memo(List)
