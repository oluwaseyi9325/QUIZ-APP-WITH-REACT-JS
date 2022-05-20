import {createStore} from 'redux'

let arr={
    username:'Username',
    category:'Category',
    mode:'Mode',
    question:'Question',
    time:'Time',
}
const myStore=(state=arr,action)=>{
    if (action.type=='QUIZ') {
       return{
        ...state,
        arr:action.payload
       }
    }else{
        return state
    }
}

const store = createStore(myStore,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export default store;