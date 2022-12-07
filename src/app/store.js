import { configureStore } from '@reduxjs/toolkit'
import grafoSlice from '../servicos/grafoSlice'

export default configureStore({
  reducer: {
    grafo: grafoSlice,
  },
})