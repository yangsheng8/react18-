import type { RouteObject } from 'react-router-dom'
import mobileRoutes from './mobile-routes'
import pcRoutes from './pc-routes'
import { isMobileTerminal } from '@/utils/flexible'

const routes: RouteObject[] = isMobileTerminal ? mobileRoutes : pcRoutes
export default routes
