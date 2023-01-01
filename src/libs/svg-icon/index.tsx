import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
  name: string
  color?: string
  fillClass?: string
  useClass?: string
  style?: object
}

const SvgIcon: FC<IProps> = ({ name, color, fillClass, style, useClass }) => {
  return (
    <div>
      <svg aria-hidden="true" className={fillClass}>
        <use
          xlinkHref={'#' + name}
          fill={color}
          className={useClass}
          style={style}
        />
      </svg>
    </div>
  )
}

export default memo(SvgIcon)
