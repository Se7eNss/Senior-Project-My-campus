import { Dialog, DialogContent, Typography, DialogActions, Button } from '@mui/material'
import { useSnackbar } from 'notistack';
import React from 'react'
import { deleteComment, deleteEvent } from 'src/redux/slices/user';
import { dispatch, useSelector } from 'src/redux/store';

const DeleteDialog = ({ open, setOpen,post,type }:any) => {
    const {enqueueSnackbar} = useSnackbar();
    const {error} = useSelector(state => state.event);
    const deleteAction = async () => {

        if(type === 'comment'){
        await dispatch(deleteComment(post._id));
        if(error === null){
            enqueueSnackbar('Comment deleted', {variant: 'success'});
            handleClose();
        }
        else{
            enqueueSnackbar('Comment not deleted', {variant: 'error'});
        }
        }
        else if(type === 'event'){
            await dispatch(deleteEvent(post._id));
            if(error === null){
                enqueueSnackbar('Event deleted', {variant: 'success'});
                handleClose();
            }
            else{
                enqueueSnackbar('Event not deleted', {variant: 'error'});
            }
        }

    
    }
    const handleClose=()=>{
        setOpen(false)
    }
    
  return (
    <Dialog
            open={open}
            sx={{ '& .MuiDialog-paper': { width: '50%', maxHeight: 600 } }}
            maxWidth="xs"
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent sx={{ paddingBottom: '0px',display:"flex" ,justifyContent:"center"  }}>
                <Typography variant='h6' >Are you sure about delete your {type==="event" ? "event" : "comment"}? </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={deleteAction} variant="contained" size="small" sx={{ width: '50%', bgcolor: '#00AB55', '&:hover': { background: "#00AB55", }, }} autoFocus>
                    Delete
                </Button>
                <Button onClick={handleClose} variant="contained" color='error' size="small" sx={{ width: '50%' }} autoFocus>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
  )
}

export default DeleteDialog