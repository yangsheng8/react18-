import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import classNames from 'classnames'
import SvgIcon from '../svg-icon'
interface IProps {
  children?: ReactNode
  //icon 图标
  icon?: string
  //icon 图标类名（tailwind）
  iconColor?: string
  //按钮风格
  type?: string
  //大小风格
  size?: string
  //按钮点击时，是否需要动画
  isActiveAnim?: boolean
  //j加载状态
  loading?: boolean
  //是否是icon按钮
  isIcon?: boolean
  textContent?: string
  addBtnTailWindCSS?: string
  handleOnClickBtn: () => void
}

type TypeEnum = {
  primary: string
  main: string
  info: string
}
type TypeSizeEnum = {
  button: string
  icon?: string
}
interface sizeOptions {
  [prop: string]: TypeSizeEnum
}

//type 可选项：表示按钮风格
const typeEnum: TypeEnum = {
  primary:
    'text-white bg-zinc-800 dark:bg-zinc-900 hover:bg-zinc-900 dark:hover:bg-zinc-700 active:bg-zinc-800 dark:acitve:bg-zinc-700',
  main: 'text-white bg-main dark:bg-zinc-900 hover:bg-hover-main active:bg-main dark:hover:bg-zinc-700 dark:acitve:bg-zinc-700',
  info: 'text-zinc-800 dark:text-zinc-300 bg-zinc-200 dark:bg-zinc-700 hover:bg-zinc-300 dark:hover-zinc-600 active:bg-zinc-200 dark:acitve:bg-zinc-700'
}
//size 可选项： 表示按钮的大小，区分文字按钮和icon按钮
const sizeEnum: sizeOptions = {
  //文字按钮
  default: {
    button: 'w-8 h-4 text-base',
    icon: ''
  },
  //icon 按钮
  'icon-default': {
    button: 'w-4 h-4',
    icon: 'w-1.5 h-1.5'
  },
  //文字小按钮
  small: {
    button: 'w-7 h-3 text-base',
    icon: ''
  },
  'icon-small': {
    button: 'w-3 h-3',
    icon: 'w-1.5 h-1.5'
  }
}
const Button: FC<IProps> = ({
  type = 'main',
  size,
  addBtnTailWindCSS,
  isActiveAnim = false,
  loading = false,
  isIcon = false,
  icon = '',
  iconColor = '',
  textContent = '',
  handleOnClickBtn
}) => {
  return (
    <>
      <button
        className={classNames(
          'text-sm text-center rounded duration-150 flex justify-center items-center',
          typeEnum[type],
          sizeEnum[size].button,
          { 'active:scale-105': isActiveAnim },
          addBtnTailWindCSS
        )}
        onClick={() => handleOnClickBtn()}
      >
        {/*loading*/}
        {loading && (
          <SvgIcon
            name={'loading'}
            fillClass={'w-2 h-2 animate-spin mr-1'}
          ></SvgIcon>
        )}
        {/* icon 按钮 或 文字按钮*/}
        {isIcon ? (
          <SvgIcon
            name={icon}
            fillClass={classNames('w-2 h-2', sizeEnum[size].icon)}
            color={iconColor}
            useClass={'iconClass'}
          ></SvgIcon>
        ) : (
          textContent
        )}
      </button>
    </>
  )
}

export default memo(Button)
