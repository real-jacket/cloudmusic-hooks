import React, { createContext, useReducer } from 'react'
import { fromJS } from 'immutable'

// context
export const CategoryDataContext = createContext({})

// 相当于constants
export const CHANGE_CATEGORY = 'singers/CHANGE_CATEGORY'
export const CHANGE_ALPHA = 'singers/CHANGE_ALPHA'

// reducer函数
const reducer = (state, action) => {
  switch (action.type) {
    case CHANGE_CATEGORY:
      return state.set('category', action.data)
    case CHANGE_ALPHA:
      return state.set('alpha', action.data)
    default:
      break
  }
}

// Provider组件
export const Data = (props) => {
  const [data, dispatch] = useReducer(
    reducer,
    fromJS({
      category: '',
      alpha: '',
    }),
  )

  return <CategoryDataContext.Provider value={{ data, dispatch }}>{props.children}</CategoryDataContext.Provider>
}
