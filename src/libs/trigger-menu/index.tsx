import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}

const TriggerMenu: FC<IProps> = ({ children }) => {
  return (
    <div className="min-w[180px] bg-white dark:bg-zinc-800 rounded-full shadow flex items-center justify-between px-2 py-1">
      {children}
    </div>
  )
}

export default memo(TriggerMenu)
