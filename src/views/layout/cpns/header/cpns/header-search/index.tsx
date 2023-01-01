import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import Search from '@/libs/search'

interface IProps {
  children?: ReactNode
}

const HeaderSearch: FC<IProps> = () => {
  return (
    <div className="w-full mr-1">
      <Search />
    </div>
  )
}

export default memo(HeaderSearch)
