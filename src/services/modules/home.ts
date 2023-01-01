import ysRequest from '..'

//定义返回数据的类型
interface CategoryData {
  list: Array<any>
}
export function getCategory() {
  return ysRequest.get<CategoryData>({
    url: '/category'
  })
}
