import React, { memo, useState, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'
import useOnClickOutside from '@jdthornton/useonclickoutside'
import type { FC, ReactNode } from 'react'
import SvgIcon from '@/libs/svg-icon'
import './style.less'
import Button from '@/libs/button'

interface IProps {
  children?: ReactNode
}

const Search: FC<IProps> = ({ children }) => {
  const [isFocus, setIsFocus] = useState(false)
  //输入框内容
  const [inputValue, setInputValue] = useState('')
  const ref = useRef()

  function handleSearchBtn() {
    console.log('搜索按钮触发')
  }
  const onkeydown = (e) => {
    if (e.keyCode === 13) {
      handleSearchBtn()
    }
  }
  //清空input
  function handleClearInput() {
    setInputValue('')
  }
  //隐藏下拉框
  useOnClickOutside(ref, () => {
    setIsFocus(false)
  })

  return (
    <div
      className="group relative p-0.5 rounded-xl border-white dark:border-zinc-200 duration-500 hover:bg-red-100/40"
      ref={ref}
    >
      <div className="w-1.5 h-1.5 absolute translate-y-[-50%] top-[50%] left-2">
        <SvgIcon
          fillClass="w-1.5 h-1.5"
          color="#707070"
          name="search"
        ></SvgIcon>
      </div>
      <input
        className="block w-full h-[44px] pl-4 text-sm outline-0 bg-zinc-100 dark:bg-zinc-800 caret-zinc-400 rounded-xl text-zinc-900 dark:text-zinc-200 tracking-wide font-semibold border border-zinc-100 dark:border-zinc-700 duration-500 group-hover:bg-white dark:group-hover:bg-zinc-900 group-hover:border-zinc-200 dark:group-hover:border-zinc-700 focus:border-red-300"
        type="text"
        placeholder="搜索"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value)
        }}
        onKeyDown={(e) => onkeydown(e)}
        onFocus={() => setIsFocus(true)}
      />
      {inputValue && (
        <div
          onClick={handleClearInput}
          className="h-1.5 w-1.5 absolute translate-y-[-50%] top-[50%] right-9 duration-500 cursor-pointer"
        >
          <SvgIcon
            fillClass="h-1.5 w-1.5 duration-500 cursor-pointer"
            useClass="fill-zinc-600"
            name="input-delete"
          ></SvgIcon>
        </div>
      )}
      <div className="opacity-0  group-hover:opacity-100  duration-500 absolute translate-y-[-50%] top-[50%] right-1 ">
        <Button
          size="icon-default"
          isIcon={true}
          icon="search"
          addBtnTailWindCSS="rounded-full"
          iconColor="#ffffff"
          handleOnClickBtn={handleSearchBtn}
        />
      </div>
      {/*下拉框*/}
      <div className="opacity-0 h-1.5 w-[1px] absolute translate-y-[-50%] top-[50%] right-[62px] duration-500 bg-zinc-200 group-hover:opacity-100"></div>
      <CSSTransition
        in={isFocus} //为true进入显示组件（主要通过in属性来控制组件状态）
        classNames="slide" //设置类名的前缀
        timeout={1000} //设置过渡动画事件
        unmountOnExit={true} //消失动画结束后 + display:none
      >
        <div className="max-h-[368px] w-full text-base overflow-auto bg-white  dark:bg-zinc-800 absolute z-20 left-0 top-[56px] p-2 rounded border border-zinc-200 dark:border-zinc-600 duration-200 hover:shadow-2xl">
          {children}
        </div>
      </CSSTransition>
    </div>
  )
}

export default memo(Search)
