import { LoadingButton } from '@mui/lab'
import { Dialog, DialogTitle, DialogContent, Grid, DialogActions, Button } from '@mui/material'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, RHFTextField, RHFUploadSingleFile } from '../hook-form'
import Label from '../Label'
import { dispatch, useSelector } from 'src/redux/store';
import { getEventDetail, resetError, updateEvent } from 'src/redux/slices/event';
import { useParams } from 'react-router';

type Props = {
    e:{
        title: string,
        description: string,
        eventImage: string,
        eventDate: string,
        eventEndDate: string,
        note: string,
    },
    editEvent: boolean,
    setEditEvent: Function
}


const EditEventDialog = ({ e, editEvent, setEditEvent }: any) => {
    const [image, setImage] = useState<string | ArrayBuffer | null>()
    const { enqueueSnackbar } = useSnackbar();
    const { error,event } = useSelector(state => state.event)
    const { id = "" } = useParams()
    console.log(event)
    const handleCloseDialog = () => {
        setEditEvent(false);
    };
    useEffect(() => {
        dispatch(getEventDetail(id))
    }, [])
    
    const DialogSchema = Yup.object().shape({
        title: Yup.string(),
        description: Yup.string(),
        eventImage: Yup.string(),
        eventDate: Yup.string(),
        eventEndDate: Yup.string(),
        note: Yup.string()
    });

   
    const defaultValues = useMemo(
        () => ({
            title: event?.title ||"" ,
            description: event?.description || "",
            eventImage: event?.eventImage.url || "",
            eventDate:  event?.eventDate || "",
            eventEndDate: event?.eventEndDate || "",
            note:"",
        }),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [event]
    );

    const methods = useForm({
        resolver: yupResolver(DialogSchema),
        defaultValues,
    });
    const eventDate= methods.watch("eventDate");
    
    const minDate = new Date().toISOString().split("T")[0];

    const minEndDate = eventDate ? new Date(eventDate) : new Date(minDate);
    minEndDate.setDate(minEndDate.getDate() + 1)
    const minEndDates = minEndDate.toISOString().split("T")[0]

    const {
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { isSubmitting },
    } = methods;

    const handleDrop = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];
            const reader = new FileReader();
            reader.onload = (event: any) => {
                if (file) {
                    setValue(
                        "eventImage",
                        Object.assign(file, {
                            preview: URL.createObjectURL(file),
                        })
                    );
                    setImage(reader.result)
                }
            };
            reader.readAsDataURL(file);
        },
        [setValue]
    );

    const onSubmit = async (data: any) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            data.eventImage = image
            data.id=id
            console.log(data)
            dispatch(resetError()) 
            // await dispatch(updateEvent(data))
            //     if (error) {
            //         enqueueSnackbar('Something went wrong!', { variant: 'error' });
            //         dispatch(resetError()) 
            //     }
            //     else {
            //         enqueueSnackbar('Your Request Sended, Admin will review it!', { variant: 'success' });
            //         reset();
            //         handleCloseDialog();
            //     }

        } catch (error) {
            console.error(error);
        }
    };
  return (
    <Dialog
            sx={{ '& .MuiDialog-paper': { width: '50%', maxHeight: 600 } }}
            maxWidth="md"
            open={editEvent}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle>Update Event</DialogTitle>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                <DialogContent sx={{ paddingBottom: '0px' }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                            <RHFTextField name="title" label="Title" sx={{ mb: 2 }} />
                            <RHFTextField name="description" multiline rows={3} label="Description" sx={{ mb: 2 }} />
                            <RHFUploadSingleFile
                                sx={{ mb: 2 }}
                                name="eventImage"
                                accept="image/*"
                                maxSize={3145728}
                                onDrop={handleDrop}
                            />
                            <Label>Start Date</Label>
                            <RHFTextField InputProps={{inputProps: { min:minDate} }} type="date" name="eventDate" sx={{ mb: 2 }} />
                            <Label>Finish Date</Label>
                            <RHFTextField InputProps={{inputProps: { min:minEndDates} }} type="date" name="eventEndDate" sx={{ mb: 2 }} />
                            <RHFTextField name="note" label="Add Some Note for Admin" sx={{ mb: 2 }} />
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions>
                    <Button sx={{ width: '50%' }} size="small" variant="contained" color='error' onClick={handleCloseDialog}>Cancel</Button>
                    <LoadingButton variant="contained" size="small" sx={{ width: '50%', bgcolor: '#00AB55', '&:hover': { background: "#00AB55", }, }} type='submit' loading={isSubmitting} autoFocus>
                        Update
                    </LoadingButton>
                </DialogActions>
            </FormProvider>
        </Dialog>
  )
}

export default EditEventDialog