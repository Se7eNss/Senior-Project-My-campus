import { Button, Dialog, DialogActions, DialogContent, Typography } from '@mui/material'
import React from 'react'


type Props = {
    open: boolean,
    setOpen: Function,
    setViewport: Function
}

const AlertDialog = ({ open, setOpen, setViewport }: Props) => {
    const handleCloseDialog = () => {
        setOpen(false)
    }

    const goToCampus = () => {
        setViewport({
            latitude: 41.215,
            longitude: 32.653,
            zoom: 16.41,
            maxZoom: 18,
            minZoom: 16,
            pitch: 55,
            bearing: 170,
        })
        setOpen(false)
    }
    return (
        <Dialog
            open={open}
            sx={{ '& .MuiDialog-paper': { width: '50%', maxHeight: 600 } }}
            maxWidth="sm"
            //onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogContent sx={{ paddingBottom: '0px' }}>
                <Typography>You Left Campus !!</Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={goToCampus} variant="contained" size="small" sx={{ width: '50%', bgcolor: '#00AB55', '&:hover': { background: "#00AB55", }, }} autoFocus>
                    Go to Campus
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default AlertDialog