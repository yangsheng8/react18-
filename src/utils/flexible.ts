import { PC_DEVICE_WIDTH } from '@/constants'
export const isMobileTerminal =
  document.documentElement.clientWidth < PC_DEVICE_WIDTH

/**动态指定 rem 基准值， 最大为40px
 * 根据用户的屏幕宽度，计算出来的值赋值给 html 根标签作为 fontsize 大小
 */
export const useREM = () => {
  //定义最大的fontsize
  const MAX_FONT_SIZE = 40
  //监听 html 文档被解析完成的事件
  document.addEventListener('DOMContentLoaded', () => {
    //拿到 html 标签
    const html = document.querySelector('html')
    //计算 fontSize, 根据屏幕宽度 / 10
    let fontSize = window.innerWidth / 10
    fontSize = fontSize > MAX_FONT_SIZE ? MAX_FONT_SIZE : fontSize
    //赋值给 html
    html.style.fontSize = fontSize + 'px'
  })
}
