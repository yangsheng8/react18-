import React, { memo } from 'react'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import type { FC, ReactNode } from 'react'
import './style.less'

interface IProps {
  children?: ReactNode
  isShowMask: boolean
  handleUpdateMask: () => void
}

const Popup: FC<IProps> = ({ children, isShowMask, handleUpdateMask }) => {
  function handleChildUpdateMask() {
    handleUpdateMask()
  }

  return (
    <div>
      {createPortal(
        <>
          {/*蒙版*/}
          <CSSTransition
            in={isShowMask} //为true进入显示组件（主要通过in属性来控制组件状态）
            classNames="mask" //设置类名的前缀
            timeout={1000} //设置过渡动画事件
            unmountOnExit={true} //消失动画结束后 + display:none
          >
            <div
              onClick={handleChildUpdateMask}
              className="w-screen h-screen bg-zinc-900/80 z-40 fixed top-0 left-0"
            ></div>
          </CSSTransition>
          {/*内容*/}
          <CSSTransition
            in={isShowMask} //为true进入显示组件（主要通过in属性来控制组件状态）
            classNames="content" //设置类名的前缀
            timeout={1000} //设置过渡动画事件
            unmountOnExit={true} //消失动画结束后 + display:none
          >
            <div className="w-screen bg-white dark:bg-zinc-800 z-50 fixed bottom-0">
              {children}
            </div>
          </CSSTransition>
        </>,
        document.body
      )}
    </div>
  )
}

export default memo(Popup)
