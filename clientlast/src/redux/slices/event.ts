import { createSlice } from '@reduxjs/toolkit';
import { EventState } from 'src/@types/event';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------


const initialState:EventState = {
  isLoading: false,
  error: null,
  open: false,
  events: [],
  event: null
};
  


  const slice = createSlice({
    name: 'event',
    initialState,
    reducers: {
      // START LOADING
      startLoading(state) {
        state.isLoading = true;
      },
  
      // HAS ERROR
      hasError(state, action) {
        state.isLoading = false;
        state.error = action.payload;
      },
  
      // GET CONTACT SSUCCESS
      getEventsSuccess(state, action) {
        state.isLoading = false;
        state.events = action.payload
      },

      getEventSuccess(state, action) {
        state.isLoading = false;
        state.event = action.payload
      },
      createEventSuccess(state, action) {
        state.isLoading = false;
      },
      createCommentSuccess(state, action) {
        state.isLoading = false;
        state.event?.comments.push(action.payload)
        
      },
      resetError (state) {
        state.error = null
      },
      setOpenEvents(state, action) {
        state.open = action.payload;
      },
      
    },
  });
  
  // Reducer
  export default slice.reducer;
  
  // Actions
  export const { 
    resetError,
    setOpenEvents
  } = slice.actions;


  // ----------------------------------------------------------------------

export function getEvents() {
    return async () => {
      dispatch(slice.actions.startLoading());
      try {
        const response = await axios.get('/api/v1/event');
        dispatch(slice.actions.getEventsSuccess(response.data.event));
      } catch (error) {
        dispatch(slice.actions.hasError(error));
      }
    };
  }

  export function getEventDetail(id:any) {
    return async () => {
      dispatch(slice.actions.startLoading());
      try {
        const response = await axios.get('/api/v1/event/' + id);
        response.status === 200 ? dispatch(slice.actions.getEventSuccess(response.data.event)) : dispatch(slice.actions.hasError(response.data));
      } catch (error) {
        dispatch(slice.actions.hasError(error));
      }
    };
  }

  export function createEvent(data:any) {
    return async () => {
      dispatch(slice.actions.startLoading());
      try {
        const response = await axios.post('/api/v1/event/new',data);
        if(response.status === 201) 
        dispatch(slice.actions.createEventSuccess(response.data.event));
        else
        dispatch(slice.actions.hasError(response.data));
      } catch (error) {
        dispatch(slice.actions.hasError(error));
      }
    };
  }

  export function createComment(data:any) {
    return async () => {
      dispatch(slice.actions.startLoading());
      try {
        const response = await axios.post('/api/v1/comment',data);
        if(response.status === 200) 
        dispatch(slice.actions.createCommentSuccess(response.data.newComment));
        else
        dispatch(slice.actions.hasError(response.data));
      } catch (error) {
        dispatch(slice.actions.hasError(error));
      }
    };
  }


