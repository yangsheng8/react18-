import React, { memo, useState, useRef, useEffect } from 'react'
import { CSSTransition } from 'react-transition-group'
import type { FC, ReactNode } from 'react'
import './style.less'

type PlaceMentKeys =
  | 'PROP_TOP_LEFT'
  | 'PROP_TOP_RIGHT'
  | 'PROP_BOTTOM_LEFT'
  | 'PROP_BOTTOM_RIGHT'
type TypePlaceMentObj = {
  [p in PlaceMentKeys]: string
}

interface IProps {
  children?: ReactNode
  placement?: PlaceMentKeys
}

const PlaceMentArr: TypePlaceMentObj = {
  //左上
  PROP_TOP_LEFT: 'top-left',
  //右上
  PROP_TOP_RIGHT: 'top-right',
  //左下
  PROP_BOTTOM_LEFT: 'bottom-left',
  //右下
  PROP_BOTTOM_RIGHT: 'bottom-right'
}
//延迟关闭时长
const DELAY_TIME = 100

const Popover: FC<IProps> = ({ children, placement }) => {
  const [isVisable, setIsVisable] = useState(false)

  /*计算元素的尺寸*/
  //获得元素的 DOM，创建读取元素尺寸
  const referenceTarget = useRef<HTMLDivElement>(null)
  const contentTarget = useRef<HTMLDivElement>(null)
  const getElementSize = (target) => {
    if (!target) return {}
    const { width, height } = target.current.getBoundingClientRect()
    return {
      width,
      height
    }
  }
  /*气泡样式*/
  const [contentStyle, setContentStyle] = useState({ top: 0, left: 0 })
  useEffect(() => {
    if (isVisable) {
      switch (placement) {
        //左上
        case 'PROP_TOP_LEFT':
          setContentStyle({
            top: 0,
            left: -getElementSize(contentTarget).width
          })
          break
        //右上
        case 'PROP_TOP_RIGHT':
          setContentStyle({
            top: 0,
            left: getElementSize(referenceTarget).width
          })
          break
        //左下
        case 'PROP_BOTTOM_LEFT':
          setContentStyle({
            top: getElementSize(referenceTarget).height,
            left: -getElementSize(contentTarget).width
          })
          break
        //右下
        case 'PROP_BOTTOM_RIGHT':
          setContentStyle({
            top: getElementSize(referenceTarget).height,
            left: getElementSize(referenceTarget).width
          })
          break
      }
    }
  }, [isVisable])

  //鼠标移入触发函数
  let timeout = null
  function handleMouseEnter() {
    setIsVisable(true)
    if (timeout) {
      clearTimeout(timeout)
    }
  }
  //鼠标移出触发函数
  function handleMouseLeave() {
    timeout = setTimeout(() => {
      setIsVisable(false)
      timeout = null
    }, DELAY_TIME)
  }
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative"
    >
      {/*触发弹层的视图*/}
      <div ref={referenceTarget}>{children[0]}</div>
      {/*弹出层视图中展示的内容*/}
      <CSSTransition
        in={isVisable} //为true进入显示组件（主要通过in属性来控制组件状态）
        classNames="slide" //设置类名的前缀
        timeout={300} //设置过渡动画事件
        unmountOnExit={true} //消失动画结束后 + display:none
      >
        <div
          ref={contentTarget}
          className="absolute p-1 z-20 bg-white dark:bg-zinc-900 border dark:border-zinc-700 rounded-md"
          style={contentStyle}
        >
          {children[1]}
        </div>
      </CSSTransition>
    </div>
  )
}

export default memo(Popover)
