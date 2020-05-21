import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { listReducer } from "./listReducer"

const reducers = combineReducers({
  fullList: listReducer
})

let store = createStore(reducers, applyMiddleware(thunk))

window.store = store
export default store