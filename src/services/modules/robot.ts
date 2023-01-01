import ysRequest from '..'

//定义返回数据的类型
interface RobotData {
  usename: string
  profile: string
}
export function getRobot(data) {
  return ysRequest.get<RobotData>({
    url: '/robot',
    params: data
  })
}
