const req = require.context('../../assets/icons', true, /\.svg$/)
//路径、是否渗入子目录 匹配规则
const requireAll = (requireContext) => requireContext.keys().map(requireContext)
requireAll(req)
