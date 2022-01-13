import { AUTH } from "../constants/authConstants";
import { NOTIFY } from "../constants/authConstants";
import { getDataAPI, postDataAPI } from "../../components/utils/fetchData";
import { Cookies} from 'react-cookie';

const cookie = new Cookies() ;

export const login = (data) => async (dispatch) => {
    try {
        dispatch({ type: NOTIFY, payload: { loading: true } })
        const res = await postDataAPI('login', data)
        dispatch({
            type: AUTH,
            payload: {
                token: res.data.token,
                user: res.data.user
            }
        })
        localStorage.setItem("firstlogin", true)
       
        const options ={
            expires: new Date (
                Date.now() + 7 *24 *60 *60 *1000
            )
        }
        cookie.set('token',res.data.token,options)
        dispatch({
            type: NOTIFY,
            payload: {
                success: res.data.success
            }
        })
    } catch (err) {
        dispatch({
            type: NOTIFY,
            payload: {
                error: err.response.data.errMessage
            }
        })
        dispatch({
            type:NOTIFY,
            payload:{}
        })
    }
}

export const register = (data) => async (dispatch) => {
    try {
        dispatch({ type: NOTIFY, payload: { loading: true } })
        const res = await postDataAPI('register', data)
        dispatch({
            type: AUTH,
            payload: {
                token: res.data.token,
                user: res.data.user
            }
        })
        const options ={
            expires: new Date (
                Date.now() + 7 *24 *60 *60 *1000
            )
        }
        cookie.set('token',res.data.token,options)
        dispatch({
            type: NOTIFY,
            payload: {
                success: res.data.success
            }
        })
    } catch (err) {
        dispatch({
            type: NOTIFY,
            payload: {
                error: err.response.data.errMessage
            }
        })
        dispatch({
            type:NOTIFY,
            payload:{}
        })
    }
}


export const getUser = () => async (dispatch) => {
    try {
        dispatch({ type: NOTIFY, payload: { loading: true } })
        const res = await getDataAPI('me',cookie.get('token'));
        dispatch({
            type:AUTH,
            payload:res.data    
        })
        dispatch({ type: NOTIFY, payload: {} })
    } catch (err) {
        dispatch({
            type: NOTIFY,
            payload: {
                error: err.response.data.errMessage
            }
        })
        dispatch({
            type:NOTIFY,
            payload:''
        })
    }
}


//logout user
export const logout = () => async (dispatch)=>{
    try {
        
        const {data} = await getDataAPI('logout')
        cookie.remove('token');
        dispatch({
            type:AUTH,
            payload:data
        })
        dispatch({
            type:AUTH,
            payload:{}
        })
    } catch (error) {
        dispatch({
            type:NOTIFY,
            payload:error.response.data.messsage
        })
        dispatch({
            type:NOTIFY,
            payload:{}
        })
    }
}
