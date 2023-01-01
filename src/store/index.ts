import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import homeReducer from './modules/home'
import themeReducer from './modules/theme'

//数据持久化配置及白名单
const persistConfig = {
  key: 'root',
  storage,
  // 白名单 缓存的
  whitelist: ['home', 'theme']
}

//reducer集合
const RootReducer = combineReducers({
  home: homeReducer,
  theme: themeReducer
})

//reducer汇集之后打包
const persistedReducer = persistReducer(persistConfig, RootReducer)

//打包后丢给store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
})
//再给store包一层
const persistore = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type DispatchType = typeof store.dispatch
export default { store, persistore }
