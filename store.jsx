import {  legacy_createStore as createStore, combineReducers, applyMiddleware } from 'redux'
import {thunk} from 'redux-thunk'
import { productListReducer,productDetailsReducer } from './src/reducers/productReducers'
import { cartReducer } from './src/reducers/cartReducers';
import { userLoginReducer,userRegisterReducer ,userDetailsReducer, userProfileUpdateReducer} from './src/reducers/userReducers';
import { orderCreateReducer } from './src//reducers/orderReducers'

const reducer = combineReducers({
 productList: productListReducer,
 productDetails:productDetailsReducer,
 cart:cartReducer,
 userLogin:userLoginReducer,
 userRegister:userRegisterReducer,
 userDetails:userDetailsReducer,
 userProfileUpdate: userProfileUpdateReducer,
 orderCreate:orderCreateReducer,
})


const cartItemsFromStorage = localStorage.getItem('cartItems') ? 
   JSON.parse(localStorage.getItem('cartItems')): []

const userInfoFromStorage = localStorage.getItem('userInfo') ? 
  JSON.parse(localStorage.getItem('userInfo')): null

const ShippingAddressFromStorage = localStorage.getItem('shippingAddress') ? 
  JSON.parse(localStorage.getItem('shippingAddress')): null

  console.log("ShippingAddressFromStorage ",ShippingAddressFromStorage )
const initialState = {
 cart:{cartItems:cartItemsFromStorage,
        shippingAddress:ShippingAddressFromStorage 
     },
 userLogin: {userInfo: userInfoFromStorage}
}

const middleware = [thunk]

const store =  createStore(reducer,initialState,
//   composeWithDevTools(applyMiddleware(...middleware)))
applyMiddleware(...middleware))
export default store;

