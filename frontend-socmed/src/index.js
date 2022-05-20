import React from "react"
import ReactDOM from "react-dom"
import ReduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension' 
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from 'react-router-dom'

import Main from "./main"

import userReducer from './redux/reducers/user-reducer'
import warnReducer from "./redux/reducers/warning-reducer"
import profileReducer from "./redux/reducers/profile-reducer"

const Reducers = combineReducers({
    user : userReducer,
    profile : profileReducer,
    warning : warnReducer
})
const store = createStore(Reducers, composeWithDevTools(applyMiddleware(ReduxThunk)))

ReactDOM.render(
    <Provider store={store}>
        <ChakraProvider>
            <BrowserRouter>
                <Main/>
            </BrowserRouter>
        </ChakraProvider>
    </Provider>
,document.getElementById("root")
)