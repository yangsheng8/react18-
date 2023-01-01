import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
  useDispatch as useReduxDispatch,
  shallowEqual as useShallowEqual
} from 'react-redux'

import { RootState, DispatchType } from './index'
//最主要的封装 useSelector类型提示，后面两个是次要。
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector
export const useDispatch: () => DispatchType = useReduxDispatch
export const shallowEqual = useShallowEqual
