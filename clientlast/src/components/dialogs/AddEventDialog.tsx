import { Dialog, DialogTitle, DialogContent, Grid, DialogActions, Button } from '@mui/material'
import React from 'react'
import { createEvent } from 'src/redux/slices/event';
import { dispatch, useSelector } from 'src/redux/store';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { FormProvider, RHFTextField, RHFUploadSingleFile } from '../hook-form'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

type Props={
    e:any,
    open:boolean,
    setOpenDialog:Function
}


const AddEventDialog = ({e,setOpenDialog,open}:Props) => {
    const { enqueueSnackbar } = useSnackbar();
    const {error} = useSelector(state=>state.event)
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };
    const DialogSchema = Yup.object().shape({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
        image:Yup.string(),
        eventDate: Yup.date().required('Date is required')
    });

    const defaultValues = {
        title: "" ,
        description: "",
        eventImage:"",
        eventDate: ""
    };

    const methods = useForm({
        resolver: yupResolver(DialogSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        setValue,
        reset,
        formState: { isSubmitting },
    } = methods;

    const onSubmit = async (data:any) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            const newData = {
                ...data,
                location:{
                    lat:e.lngLat[1],
                    long:e.lngLat[0]
                }
            }
            await dispatch(createEvent(newData)).then(()=>{
                if(error){
                    enqueueSnackbar('Something went wrong!',{variant:'error'});
                }
                else{
                    enqueueSnackbar('Your Request Sended, Admin will review it!',{variant:'success'});
                    reset();
                    setOpenDialog(false);
                }
            })
            
            
            
        } catch (error) {
            console.error(error);
        }
    };
  return (
    <Dialog
            sx={{ '& .MuiDialog-paper': { width: '50%', maxHeight: 600 } }}
            maxWidth="md"
            open={open}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle>Yeni Etkinlik Ekle</DialogTitle>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <DialogContent sx={{ paddingBottom: '0px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                            <RHFTextField name="title" label="Title" sx={{ mb: 2 }} />
                            <RHFTextField name="description" label="Description" sx={{ mb: 2 }} />
                            <RHFUploadSingleFile name="eventImage"  sx={{ mb: 2 }} />
                            <RHFTextField type="date" name="eventDate" sx={{ mb: 2 }} />
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button sx={{ width: '50%' }} size="small" variant="contained" color='error' onClick={handleCloseDialog}>İPTAL</Button>
                    <Button variant="contained" size="small" sx={{ width: '50%', bgcolor: '#00AB55', '&:hover': { background: "#00AB55", }, }} type='submit' autoFocus>
                        KAYDET
                    </Button>
                </DialogActions>
            </FormProvider>
        </Dialog>
  )
}

export default AddEventDialog