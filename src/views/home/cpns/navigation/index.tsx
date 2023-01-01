import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { useDispatch } from '@/store/hooks'
import { fetchCategoryDataAction } from '@/store/modules/home'
import { isMobileTerminal } from '@/utils/flexible'
import PcNav from './pc/index'
import MobileNav from './mobile/index'

interface IProps {
  children?: ReactNode
}

const Navigation: FC<IProps> = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCategoryDataAction())
  })
  return <div>{isMobileTerminal ? <MobileNav /> : <PcNav />}</div>
}

export default memo(Navigation)
