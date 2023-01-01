import React, { memo } from 'react'
import SvgIcon from '@/libs/svg-icon'
import type { FC, ReactNode } from 'react'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'

interface IProps {
  children?: ReactNode
  icon: string
  iconClass?: string
  textClass?: string
  to?: string
}

const TriggerMenuItem: FC<IProps> = ({
  icon,
  iconClass,
  textClass = 'text-zinc-900 dark:text-zinc-200',
  to,
  children
}) => {
  const navigate = useNavigate()
  function handleItemClick() {
    if (!to) return
    navigate(to)
  }

  return (
    <div
      className="w-5 flex flex-col items-center justify-center mx-0.5"
      onClick={handleItemClick}
    >
      <SvgIcon name={icon} fillClass="w-2 h-2" useClass={iconClass} />
      <p className={classNames('text-sm mt-0.5', textClass)}>{children}</p>
    </div>
  )
}

export default memo(TriggerMenuItem)
