import { createSlice } from '@reduxjs/toolkit';
import { ProfileState } from 'src/@types/auth';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------


const initialState: ProfileState = {
    isLoading: false,
    error: null,
    profile: null,
    other: null,
    comments: [],
};

const profileSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        // start loading
        startLoading(state) {
            state.isLoading = true;
        },
        // has error
        hasError(state, action) {
            state.error = action.payload;
        },
        // get profile success
        getProfSuccess(state, action) {
            state.profile = action.payload;
            state.isLoading = false;
        },

        getCommentsSuccess(state, action) {
            state.comments = action.payload;
            state.isLoading = false;
        },
        
        getOtherProfileSuccess(state, action) {
            state.other = action.payload;
            state.isLoading = false;
        },
        deleteCommentSuccess(state, action) {
            state.isLoading = false;
            const index = state.comments.map((comment:any) => comment._id).indexOf(action.payload);
            state.comments.splice(index, 1);
          },

        resetComments(state) {
            state.comments = [];
        }
    },
});

// Reducer
export default profileSlice.reducer;

// Actions
export const { resetComments} = profileSlice.actions;


// ----------------------------------------------------------------------
export const getProfile = () => async (dispatch:any) => {
    dispatch(profileSlice.actions.startLoading());
    try {
        const { data } = await axios.get('/api/v1/profile');
        dispatch(profileSlice.actions.getProfSuccess(data.newUser));
    } catch (error) {
        dispatch(profileSlice.actions.hasError(error));
    }
}

// ----------------------------------------------------------------------
export const getOthersProfile = (id:any) => async (dispatch:any) => {
    dispatch(profileSlice.actions.startLoading());
    try {
        const { data,status } = await axios.get('/api/v1/profile/'+id);
        status === 200 ? dispatch(profileSlice.actions.getOtherProfileSuccess(data.newUser)) : dispatch(profileSlice.actions.hasError(data));
    } catch (error) {
        dispatch(profileSlice.actions.hasError(error));
    }
}
// ----------------------------------------------------------------------
export const getCommentsForUser = (id:any) => async (dispatch:any) => {
    dispatch(profileSlice.actions.startLoading());
    console.log(id)
    try {
        const { data } = await axios.get('/api/v1/'+id+'/comment');
        dispatch(profileSlice.actions.getCommentsSuccess(data.comments));
    } catch (error) {
        dispatch(profileSlice.actions.hasError(error));
    }
}


export function deleteComment(id:any) {
    return async () => {
      dispatch(profileSlice.actions.startLoading());
      try {
        const response = await axios.delete('/api/v1/comment/' + id);
        if(response.status === 200) 
        dispatch(profileSlice.actions.deleteCommentSuccess(id));
        else
        dispatch(profileSlice.actions.hasError(response.data));
      } catch (error) {
        dispatch(profileSlice.actions.hasError(error));
      }
    };
  }
