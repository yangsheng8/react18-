import React, { memo, useRef, useState, useLayoutEffect } from 'react'
import type { FC, ReactNode } from 'react'
import Item from '@/views/layout/cpns/main/cnps/item'

interface IProps {
  children?: ReactNode
  data?: Array<any> //数据源
  column?: number //列数
  columnSpacing?: number //列间距
  rowSpacing?: number //行间距
  picturePreReading?: boolean //是否需要进行图片预读取
}

const Waterfall: FC<IProps> = ({
  data,
  column,
  columnSpacing = 20,
  picturePreReading
}) => {
  //当前的瀑布流父容器
  const containerTarget = useRef<HTMLDivElement>(null)
  //父容器的宽度 （不包含 padding、 margin 、 border）
  const [containerWidth, setContainerWidth] = useState(0)
  //获取子容器的宽度
  //列的宽度 = (容器的宽度 - 所有的列间距宽度) /  列数
  const [columnWidth, setColumnWidth] = useState(0)

  // 计算子容器列宽
  const useColumnWidth = () => {
    // 1.列间距的合计 = （列数-1）* 列间距
    const columnSpacingTotal = (column - 1) * columnSpacing
    setColumnWidth((containerWidth - columnSpacingTotal) / column)
  }
  //获得遍历下的item
  const itemElements = useRef([])
  function getRef(dom) {
    itemElements.current.push(dom)
  }
  const [columnHeightObj, setColumnHeightObj] = useState([])
  const useItemHeight = () => {
    if (data.length <= 0) return
    const colHeightArr = []
    //记录每列高度的数组
    itemElements.current.forEach((el, index) => {
      if (index < data.length) {
        el && colHeightArr.push(el.offsetHeight)
      }
    })
    setColumnHeightObj(spArr(colHeightArr, column))
  }
  function spArr(arr, num) {
    const newArr = []
    let i = 0
    while (i < arr.length) {
      newArr.push(arr.slice(i, (i += num)))
    }
    return newArr
  }

  useLayoutEffect(() => {
    setContainerWidth(containerTarget.current.offsetWidth)
    useColumnWidth()
    useItemHeight()
  }, [containerWidth, columnWidth])
  /*渲染位置*/
  const useItemLocation = () => {
    //遍历数据源
    data.forEach((item, index) => {
      // 避免重复计算
      if (item._style) {
        return
      }
      //生成 style 属性
      item._style = {}
      // left
      item._style.left = getItemLeft()
      //top
      item._style.top = getItemTop()
      //指定的列高度的自增
      //increasingHeight(index)
    })
  }
  const getItems = (): ReactNode => {
    let ls
    if (columnWidth && data.length) {
      ls = data.map((item, index) => {
        return (
          <div
            ref={getRef}
            key={index}
            className="m-waterfall-item absolute duration-300"
            style={{
              width: columnWidth + 'px',
              left: item._style?.left + 'px',
              top: item._style?.top + 'px'
            }}
          >
            <Item id={item} />
          </div>
        )
      })
    } else {
      ls = `<div>加载中...</div>`
    }
    return ls
  }

  /*返回下一个 item 的left*/
  const getItemLeft = () => {
    // 最短的那一列的列数 * 每列的宽度 + 边距数 * 列数
    // 1.拿到最小宽度的列
  }
  /*返回下一个 item 的height*/
  const getItemTop = () => {
    // 拿到最小宽度的列的高度
  }
  /*返回列高对象中最小高度所在的列*/
  const getMinHeightColumn = (columnHeightObj) => {
    // 拿到最小的高度
  }
  return (
    <div ref={containerTarget} className="relative">
      {getItems()}
    </div>
  )
}

export default memo(Waterfall)
