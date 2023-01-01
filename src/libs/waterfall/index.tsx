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
  rowSpacing = 20
}) => {
  //当前的瀑布流父容器
  const containerTarget = useRef<HTMLDivElement>(null)
  //父容器高度 =  最高的这一列的高度
  const [containerHeight, setContainerHeight] = useState(0)
  // 记录每列高度的容器 key: 所在列， val: 列高
  let columnHeightObj = {}
  /*
  构建每列高度的容器
  */
  const useColumnHeightObj = () => {
    columnHeightObj = {}
    for (let i = 0; i < column; i++) {
      columnHeightObj[i] = 0
    }
  }
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
  const colHeightArr = []
  const useItemHeight = () => {
    if (data.length <= 0) return
    //计算item 高度
    itemElements.current.forEach((el, index) => {
      if (index < data.length) {
        el && colHeightArr.push(el.offsetHeight)
      }
    })
  }
  /*渲染位置*/
  const useItemLocation = () => {
    //遍历数据源
    data.forEach((item, index) => {
      // 避免重复计算
      // if (item._style) {
      //   return
      // }
      //生成 style 属性
      item._style = {}
      // left
      item._style.left = getItemLeft()
      //top
      item._style.top = getItemTop()
      //指定的列高度的自增
      increasingHeight(index)
    })
    //指定容器的高度
    setContainerHeight(getMaxHeight(colHeightArr))
  }
  useLayoutEffect(() => {
    useColumnHeightObj()
    setContainerWidth(containerTarget.current.offsetWidth)
    useColumnWidth()
    useItemHeight()
    //触发item 定位
    useItemLocation()
  }, [colHeightArr])
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
            <Item
              author={item.author}
              title={item.title}
              photo={item.photo}
              avatar={item.avatar}
            />
          </div>
        )
      })
    } else {
      ls = <div>加载中...</div>
    }
    return ls
  }

  /*返回下一个 item 的left*/
  const getItemLeft = () => {
    // 最短的那一列的列数 * 每列的宽度 + 边距数 * 列数
    // 1.拿到最小宽度的列
    const column = getMinHeightColumn(columnHeightObj)
    return parseFloat(column) * (columnWidth + columnSpacing)
  }
  /*返回下一个 item 的height*/
  const getItemTop = () => {
    // 拿到最小宽度的列的高度
    return getMinHeight(columnHeightObj)
  }
  /*指定列高度自增*/
  const increasingHeight = (index) => {
    // 最小高度所在的列
    const minHeightColumn = getMinHeightColumn(columnHeightObj)
    //使该列自增
    columnHeightObj[minHeightColumn] += colHeightArr[index] + rowSpacing
  }
  /*返回列高对象中最小高度所在的列*/
  const getMinHeightColumn = (columnHeightObj) => {
    // 拿到最小的高度
    const minHeight = getMinHeight(columnHeightObj)
    return Object.keys(columnHeightObj).find((key) => {
      return columnHeightObj[key] === minHeight
    })
  }
  // 返回列高对象中最小的高度
  const getMinHeight = (columnHeightObj) => {
    const columnHeightArr: number[] = Object.values(columnHeightObj)
    return Math.min(...columnHeightArr)
  }
  // 返回列高对象中最大的高度
  const getMaxHeight = (columnHeightObj) => {
    const columnHeightArr: number[] = Object.values(columnHeightObj)
    return Math.max(...columnHeightArr)
  }
  return (
    <div
      ref={containerTarget}
      className="relative"
      style={{ height: containerHeight + 'px' }}
    >
      {getItems()}
    </div>
  )
}

export default memo(Waterfall)
