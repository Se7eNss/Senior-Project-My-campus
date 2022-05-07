import { Dialog, DialogContent, Typography, DialogActions, Button } from '@mui/material'
import axios from 'src/utils/axios';
import { useSnackbar } from 'notistack';
import React from 'react'

const AdminDeleteDialog = ({ open, setOpen, post, types }: any) => {
    const { enqueueSnackbar } = useSnackbar();
    console.log(types)
    const deleteAction = async () => {
        if (types === 'comment') {
            const response = await axios.delete(`/api/v1/admin/comment/${post._id}`)
            if (response.status === 200) {
                enqueueSnackbar('Success', { variant: 'success' });
                setOpen(false);
            }
            else {
                enqueueSnackbar('Error', { variant: 'error' });
            }
        }
        else if (types === 'event') {
            const response = await axios.delete(`/api/v1/admin/event/${post._id}`)
            if (response.status === 200) {
                enqueueSnackbar('Success', { variant: 'success' });
                setOpen(false);
            }
            else {
                enqueueSnackbar('Error', { variant: 'error' });
            }
        }


    }
    const handleClose = () => {
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
            <DialogContent sx={{ paddingBottom: '0px', display: "flex", justifyContent: "center" }}>
                <Typography variant='h6' >Are you sure about delete your {types === "event" ? "event" : "comment"}? </Typography>
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

export default AdminDeleteDialog