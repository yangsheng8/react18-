import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import Popover from '@/libs/popover'
import SvgIcon from '@/libs/svg-icon'
import { THEME_LIGHT, THEME_DARK, THEME_SYSTEM } from '@/constants'
import { useSelector, shallowEqual, useDispatch } from '@/store/hooks'
import { changeThemeAction } from '@/store/modules/theme'
interface IProps {
  children?: ReactNode
}

const HeaderTheme: FC<IProps> = () => {
  const dispatch = useDispatch()
  const themeType = useSelector((state) => {
    return state.theme.themeType
  }, shallowEqual)
  const themeArr = [
    {
      id: '0',
      type: THEME_LIGHT,
      icon: 'theme-light',
      name: '极简白'
    },
    {
      id: '1',
      type: THEME_DARK,
      icon: 'theme-dark',
      name: '极简黑'
    },
    {
      id: '2',
      type: THEME_SYSTEM,
      icon: 'theme-system',
      name: '跟随系统'
    }
  ]
  const findTheme = themeArr.find((item) => {
    return item.type === themeType
  })
  function handleChangeTheme(type) {
    dispatch(changeThemeAction(type))
  }
  //改变主题色
  useEffect(() => {
    let matchMedia
    const watchSystemThemeChange = () => {
      //仅需一次初始化
      if (matchMedia) return
      matchMedia = window.matchMedia('(prefers-color-scheme:dark)')
      // 监听主题变化
      matchMedia.onchange = () => {
        dispatch(changeThemeAction(THEME_SYSTEM))
      }
    }
    const changeTheme = (theme) => {
      switch (theme) {
        case THEME_LIGHT:
          return 'light'
          break
        case THEME_DARK:
          return 'dark'
          break
        case THEME_SYSTEM:
          // 调用方法，监听系统主题变化
          watchSystemThemeChange()
          return matchMedia.matches ? 'dark' : 'light'
          break
      }
    }
    document.querySelector('html').className = changeTheme(themeType)
  }, [themeType])
  //抽离jsx
  const getThemels = (): ReactNode => {
    const ls = themeArr.map((item) => {
      return (
        <div
          key={item.id}
          className="flex items-center p-1 cursor-pointer rounded hover:bg-zinc-100/60 dark:hover:bg-zinc-800"
          onClick={() => {
            handleChangeTheme(item.type)
          }}
        >
          <SvgIcon
            name={item.icon}
            fillClass="w-1.5 h-1.5 mr-1"
            useClass="fill-zinc-900 dark:fill-zinc-300"
          />
          <span className="text-zinc-900 text-sm dark:text-zinc-300">
            {item.name}
          </span>
        </div>
      )
    })
    return ls
  }
  return (
    <div className="mr-1">
      <Popover placement="PROP_BOTTOM_LEFT">
        <SvgIcon
          name={findTheme.icon}
          fillClass="w-4 h-4 p-1 cursor-pointer rounded-sm duration-200 outline-none hover:bg-zinc-100/60 dark:hover:bg-zinc-900"
          useClass="fill-zinc-900 dark:fill-zinc-300"
        />
        <div className="w-[140px] overflow-hidden">{getThemels()}</div>
      </Popover>
    </div>
  )
}
export default memo(HeaderTheme)
