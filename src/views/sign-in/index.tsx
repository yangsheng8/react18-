import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

interface IProps {
  children?: ReactNode
}

const SignIn: FC<IProps> = () => {
  return <div>SignIn</div>
}

export default memo(SignIn)
