import { AUTH,NOTIFY } from "../constants/authConstants";

const initialState={}

const authReducer = (state=initialState,action)=>{
    switch (action.type) {
        case AUTH:
            return action.payload;
        
        default:
            return state;
    }
}

export default authReducer