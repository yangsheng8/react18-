import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import Button from '@/libs/button'
interface IProps {
  children?: ReactNode
  avatar: string
  photo: string
  title: string
  author: string
}

const Item: FC<IProps> = ({ photo, avatar, title, author }) => {
  function handleShare() {
    console.log('分享')
  }
  function handlePraise() {
    console.log('点赞')
  }
  function handleDown() {
    console.log('下载')
  }
  function handleFull() {
    console.log('全屏')
  }
  return (
    <div className="bg-white dark:bg-zinc-900 xl:dark:bg-zinc-800 rounded pb-1">
      <div className="relative w-full rounded cursor-zoom-in group">
        <img className="w-full rounded bg-transparent" src={photo} alt="" />
        {/*遮罩层*/}
        <div className="hidden opacity-0 w-full h-full bg-zinc-900/50 absolute top-0 left-0 rounded duration-300 group-hover:opacity-100 xl:block">
          {/*分享*/}
          <Button
            size="default"
            textContent="分享"
            addBtnTailWindCSS="absolute top-1.5 left-1.5"
            iconColor="#ffffff"
            handleOnClickBtn={handleShare}
          />
          {/*点赞*/}
          <Button
            size="icon-default"
            type="info"
            icon="heart"
            isIcon={true}
            addBtnTailWindCSS="absolute top-1.5 right-1.5"
            handleOnClickBtn={handlePraise}
          />
          {/*下载*/}
          <Button
            type="info"
            size="icon-small"
            icon="download"
            isIcon={true}
            addBtnTailWindCSS="absolute bottom-1.5 left-1.5 bg-zinc-100/70"
            handleOnClickBtn={handleDown}
          />
          {/*全屏*/}
          <Button
            type="info"
            size="icon-small"
            icon="full"
            isIcon={true}
            addBtnTailWindCSS="absolute bottom-1.5 right-1.5"
            handleOnClickBtn={handleFull}
          />
        </div>
      </div>
      <p className="text-sm mt-1 font-bold text-zinc-900 dark:text-zinc-300 line-clamp-2 px-1">
        {title}
      </p>
      <div className="flex items-center mt-1 px-1">
        <img className="h-2 w-2 rounded-full" src={avatar} />
        <span className="text-sm text-zinc-500 ml-1">{author}</span>
      </div>
    </div>
  )
}

export default memo(Item)
