import React, { memo, useRef, useState } from 'react'
import type { FC, ReactNode } from 'react'
import { useSelector, shallowEqual } from '@/store/hooks'
import SvgIcon from '@/libs/svg-icon'
import Popup from '@/libs/popup'
import Menu from '@/views/home/cpns/menu'
interface IProps {
  children?: ReactNode
}

const MobileNav: FC<IProps> = () => {
  const list = useSelector((state) => {
    return state.home.list
  }, shallowEqual)
  //滑块dom
  const sliderTargetRef = useRef<HTMLLIElement>(null)
  //滑块样式初始值
  const [slideStyle, setSlideStyle] = useState({
    transform: 'translateX(0px)',
    width: '55px'
  })
  // 选中 item 下标
  const [currentCategoryIndex, setCurrentCategoryIndex] = useState(0)
  //获取所有item 下标
  const liRefList = useRef<Array<HTMLLIElement>>([])
  function getItemRef(dom) {
    if (dom) liRefList.current.push(dom)
  }
  // ul 横向滚动偏离位置
  const ulTargetRef = useRef<HTMLUListElement>(null)
  const [ulScrollLeft, setUlScrollLeft] = useState(0)
  function handleScroll() {
    setUlScrollLeft(ulTargetRef.current.scrollLeft)
  }

  function handleItemClick(index) {
    const { left, width } = liRefList.current[index].getBoundingClientRect()
    setCurrentCategoryIndex(index)
    setSlideStyle({
      //滑块位置 = ul 横向滚动的位置  + 当前元素的left - ul 的panding
      transform: `translateX(${ulScrollLeft + left - 10}px)`,
      width: width + 'px'
    })
  }
  /* menu组件点击菜单，ul自动滑动到指定*/
  function handleUlSlice(index) {
    const { left } = liRefList.current[index].getBoundingClientRect()
    ulTargetRef.current.scrollTo({
      left: ulScrollLeft + left - 10,
      behavior: 'smooth'
    })
  }

  //点击汉堡，显示/隐藏 模板
  const [isShowMask, setIsShowMask] = useState(false)
  function handleMask() {
    setIsShowMask(!isShowMask)
  }
  return (
    <div className="bg-white dark:bg-zinc-900 sticky top-0 left-0 z-10">
      <ul
        ref={ulTargetRef}
        className="relative flex overflow-x-auto p-1 text-xs text-zinc-600 overflow-hidden "
        onScroll={handleScroll}
      >
        {/*滑块*/}
        <li
          ref={sliderTargetRef}
          style={slideStyle}
          className="absolute h-[22px] bg-zinc-900 dark:bg-zinc-800 rounded-lg duration-200"
        ></li>
        {/*汉堡按钮*/}
        <li
          onClick={handleMask}
          className="fixed top-0 right-[-1px] h-4 px-1 flex items-center bg-white dark:bg-zinc-900 z-20 shadow-l-white dark:shadow-l-zinc"
        >
          <SvgIcon fillClass="w-1.5 h-1.5" name="hamburger"></SvgIcon>
        </li>
        {/*items*/}
        {list.map((item, index) => {
          return (
            <li
              key={index}
              ref={getItemRef}
              className={`shrink-0 px-1.5 py-0.5 z-10 duration-200 last:mr-4
              ${currentCategoryIndex === index ? 'text-zinc-100' : ''}`}
              onClick={(e) => {
                handleItemClick(index)
              }}
            >
              {item.name}
            </li>
          )
        })}
      </ul>
      <Popup handleUpdateMask={handleMask} isShowMask={isShowMask}>
        <Menu
          list={list}
          menuhandleItemClick={(index) => {
            handleItemClick(index)
            handleMask()
            handleUlSlice(index)
          }}
        />
      </Popup>
    </div>
  )
}

export default memo(MobileNav)
